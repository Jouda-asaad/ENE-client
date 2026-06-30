# Gallery CMS Implementation Plan

## Overview
This plan implements the migration of gallery images to Supabase and adds management features to the Admin CMS.

## Step 1: Database Setup
1. **Create Table**: Execute a SQL query to create the `gallery_images` table with columns `id`, `src`, `title`, and `created_at`.
2. **Enable RLS**: Add Row-Level Security policies allowing public read access and authenticated write access.
3. **Migrate Data**: Insert the current 22 hardcoded images from `GalleryPage.jsx` into the `gallery_images` table.
- **Verification**: Query the table to ensure all 22 rows are successfully inserted.

## Step 2: Admin CMS Updates (`src/pages/AdminCMS.jsx`)
1. **State & Functions**:
   - Add state: `galleryImages` (array), `isFetchingGallery` (boolean), `newGallerySrc` (string), `newGalleryTitle` (string).
   - Add `fetchGalleryImages()` function using the Supabase client.
   - Add `handleAddGalleryImage(e)` function to insert new images.
   - Add `handleDeleteGalleryImage(id)` function to remove images.
2. **Tab Navigation**: 
   - Add a `<button>` for the "Gallery" tab in the admin navigation.
3. **Gallery Panel UI**:
   - Create the `activePanel === 'gallery'` block.
   - Add the input form for `src` (URL/path) and `title`.
   - Add the data table to list existing images with a preview and a "Delete" button.
- **Verification**: Open the Admin CMS locally, click the "Gallery" tab, and verify the UI loads and displays the migrated images without errors.

## Step 3: Frontend Updates (`src/pages/GalleryPage.jsx`)
1. **Remove Static Data**: Delete the `galleryImages` hardcoded array.
2. **Add State**: Add `images` (array) and `loading` (boolean) states.
3. **Fetch Data**: Add a `useEffect` hook to fetch data from `gallery_images` order by `created_at` ascending.
4. **Update Render**:
   - Add a loading spinner while fetching.
   - Update mapping functions to use the `images` state variable instead of the hardcoded array.
   - Handle edge cases (empty gallery).
- **Verification**: Navigate to the Gallery page and verify the images load correctly from the database, and the lightbox still functions properly.

## Step 4: Final Testing & Commit
1. Verify no regressions on existing Admin CMS tabs (Products, Services).
2. Test adding and deleting an image in the CMS and verify it reflects on the Gallery page.
3. Commit changes with a descriptive message.
