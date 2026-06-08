import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Need to import productsData.js
// Since it uses 'export const', we can import it if we are in module mode, 
// or we can just read the file and eval/parse it if we want to avoid transpilation issues 
// but let's try assuming this script runs as type: module or we use a workaround.
// For simplicity in this script, I'll copy the data structure manually or read strict JSON if I could, 
// but it's JS. I'll use a regex to extract the array or just dynamic import if possible.

// EASIER: I'll read the file content and eval strictly the array part, or just paste the array here if it was small.
// But it's large. Let's try dynamic import.
// Note: productsData.js might use JSX or other things? No, it looks like pure JS objects.

// Manually define credentials for the script (Admin context)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://omtbicosquhaifvsrvkk.supabase.co';
// USE SERVICE_ROLE_KEY for admin rights (migration)
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'sb_secret_3xbox8ml-2CloaxhcrnujQ_M6e9uwxg';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Helper to download image
const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath);
            reject(err);
        });
    });
};

// Main migration function
async function migrate() {
    console.log('Starting migration...');

    // 1. Get Product Data
    // We are running in Node, we can just import the file if package.json has "type": "module"
    // OR we can read the file and extract JSON.
    // Let's assume we can import it.
    let productsData = [];
    try {
        const module = await import('../src/data/productsData.js');
        productsData = module.productsData;
    } catch (e) {
        console.error('Error importing productsData:', e);
        // Fallback or exit
        // Attempt to match array text if import fails (e.g. if file has JSX elsewhere or isn't module)
        const fileContent = fs.readFileSync(path.join(projectRoot, 'src/data/productsData.js'), 'utf-8');
        // Simple regex to find the array content. Be careful.
        // This is risky. Let's hope import works.
        process.exit(1);
    }

    console.log(`Found ${productsData.length} products.`);

    for (const product of productsData) {
        console.log(`Processing ${product.id}: ${product.name}`);

        // 2. Handle Image
        let imageUrl = product.image;
        let storagePath = '';

        if (imageUrl) {
            const filename = `${product.id}-${path.basename(imageUrl)}`;
            const tempPath = path.join(__dirname, 'temp', filename);

            // Ensure temp dir
            if (!fs.existsSync(path.join(__dirname, 'temp'))) {
                fs.mkdirSync(path.join(__dirname, 'temp'));
            }

            try {
                // Download
                console.log(`  Downloading image: ${imageUrl}`);
                await downloadImage(imageUrl, tempPath);

                // Upload to Supabase Storage
                const fileContent = fs.readFileSync(tempPath);
                const { data, error } = await supabase
                    .storage
                    .from('product-images')
                    .upload(`public/${filename}`, fileContent, {
                        contentType: 'image/png', // naive, usage defaults
                        upsert: true
                    });

                if (error) throw error;

                // Get Public URL
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('product-images')
                    .getPublicUrl(`public/${filename}`);

                storagePath = publicUrl;
                console.log(`  Uploaded to: ${storagePath}`);

                // Clean up temp
                fs.unlinkSync(tempPath);

            } catch (err) {
                console.error(`  Failed to process image for ${product.id}:`, err.message);
                // Keep original URL if upload fails? Or null?
                storagePath = imageUrl;
            }
        }

        // 3. Upsert into DB
        const { error: dbError } = await supabase
            .from('products')
            .upsert({
                id: product.id,
                brand: product.brand,
                category: product.category,
                name: product.name,
                image_url: storagePath,
                original_link: product.link,
                // created_at: new Date() // let default handle it
            });

        if (dbError) {
            console.error(`  DB Insert failed: ${dbError.message}`);
        } else {
            console.log(`  Saved to Database.`);
        }
    }

    console.log('Migration complete.');
}

migrate();
