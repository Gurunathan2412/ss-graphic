
create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  phone text,
  service text not null,
  quantity int default 1,
  special_requests text,
  design_url text,
  status text default 'Pending'
);
