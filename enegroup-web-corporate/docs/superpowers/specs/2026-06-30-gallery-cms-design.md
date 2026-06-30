# Gallery CMS Integration Design

## Objective
Migrate the hardcoded gallery images to the database (Supabase) and create an interface in the Admin CMS to manage (add, edit, delete) these images. 

## Context
Currently, the `GalleryPage.jsx` component relies on a static array of images defined at the top of the file. To make this dynamic and manageable by an admin, we need to move these records to a database table and update the frontend to fetch from this table.

## Database Schema Proposal
**Table Name**: `gallery_images`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, Default: `uuid_generate_v4()` | Unique identifier for the image record |
| `src` | `text` | Not Null | The URL or relative path to the image |
| `title` | `text` | Not Null | The title/caption of the image |
| `created_at` | `timestamptz` | Default: `now()` | Timestamp of creation |

**Note on RLS**: We will enable Row Level Security (RLS) on this table. 
- Read access will be public (so the gallery page can display them).
- Write/Update/Delete access will be restricted to authenticated users (admin).

## Admin CMS UI Changes
- **New Tab**: Add a "Gallery" tab in the `AdminCMS.jsx` interface.
- **List View**: Display a grid or table of current gallery images showing the image thumbnail and title.
- **Add Form**: A simple form to input a new Image URL (or path) and Title.
- **Delete Action**: A delete button for each gallery image to remove it from the database.

## Frontend Updates
- **GalleryPage.jsx**: 
  - Remove the hardcoded `galleryImages` array.
  - Implement a `useEffect` hook to fetch data from the `gallery_images` table on mount.
  - Add a loading state while images are being fetched.
  - Update the render logic to use the fetched data.

## Migration Steps
1. Create the `gallery_images` table in Supabase.
2. Insert the existing hardcoded images from `GalleryPage.jsx` into the new table.
3. Update `AdminCMS.jsx` with the new Gallery management section.
4. Update `GalleryPage.jsx` to fetch and display the dynamic images.

## Trade-offs and Considerations
- **Sorting**: Currently, images are ordered implicitly by their insertion order (or `created_at`). If specific ordering is required in the future, a `display_order` column could be added. For now, to keep it simple, we will sort by `created_at` ascending.
- **Image Uploads**: This spec assumes images are already hosted (e.g., in Supabase Storage or an external URL) and we are just storing the paths/URLs. If full file uploading is needed from the CMS, that involves integrating with Supabase Storage. (Since existing images use local paths like `/assets/...`, we will continue supporting paths/URLs via text input for now).
