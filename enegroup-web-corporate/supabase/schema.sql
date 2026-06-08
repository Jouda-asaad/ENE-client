-- Create tables
create table if not exists products (
  id text primary key,
  brand text not null,
  category text not null,
  name text not null,
  image_url text,
  original_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create storage bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Set up RLS for products table
alter table products enable row level security;

create policy "Enable read access for all users"
on products for select
to public
using (true);

create policy "Enable all access for authenticated users"
on products for all
to authenticated
using (true);

-- Set up RLS for storage bucket
create policy "Give public access to product-images"
on storage.objects for select
to public
using (bucket_id = 'product-images');

create policy "Enable upload access for authenticated users"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

create policy "Enable update access for authenticated users"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images');

create policy "Enable delete access for authenticated users"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images');
