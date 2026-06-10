const fs = require('fs');
const https = require('https');

const url = 'https://enegroup.com.my/wp-content/uploads/2019/12/4983070568250762_ene2.png';
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://enegroup.com.my/'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Status Code: ${res.statusCode}`);
    res.resume();
    return;
  }
  
  const file = fs.createWriteStream('/home/juds/enegroup/enegroup-web-corporate/public/assets/misc/customer-map.png');
  res.pipe(file);
  file.on('finish', () => file.close());
}).on('error', (err) => {
  console.error(err.message);
});
