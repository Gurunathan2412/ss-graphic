-- Enable RLS
alter table public.bookings enable row level security;

-- Allow public to create bookings
create policy "Allow public to create bookings"
on public.bookings
for insert
to public
with check (true);

-- Allow admin to read all bookings
create policy "Allow admin to read all bookings"
on public.bookings
for select
using (
  -- Check for admin cookie in edge function requests
  current_setting('request.cookie.printly_admin', true) = '1'
);

-- Allow admin to update bookings
create policy "Allow admin to update bookings"
on public.bookings
for update
using (
  current_setting('request.cookie.printly_admin', true) = '1'
);

-- Allow admin to delete bookings
create policy "Allow admin to delete bookings"
on public.bookings
for delete
using (
  current_setting('request.cookie.printly_admin', true) = '1'
);
