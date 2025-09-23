
# Printly — React frontend + Supabase Edge Functions (Refactored)

This project contains a React frontend (Vite + Tailwind) and Supabase Edge Functions for admin actions.
Frontend handles booking creation and file uploads via the Supabase anon key.
Admin actions (list/update/delete bookings) are handled by Supabase Edge Functions using the service_role key.

## Structure
- frontend/         -> React app (Vite)
- supabase/functions/ -> Edge Functions (admin-login, bookings-list, bookings-update, bookings-delete)
- supabase/sql/     -> DB schema

## How to use
1. Create a Supabase project.
2. Create a `designs` storage bucket.
3. Run the SQL in `supabase/sql/schema.sql` in the Supabase SQL editor to create the bookings table.
4. Deploy Edge Functions using `supabase` CLI and add these env vars to the Functions settings:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY (service role key) -- KEEP SECRET
   - ADMIN_PASSWORD
   - COOKIE_SECRET (optional)
5. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_FUNCTIONS_ORIGIN` as environment variables for the frontend (Netlify/Vercel).
6. Deploy frontend to Netlify/Vercel (single project).

## Notes
- The frontend uses the anon key to insert bookings and upload files to the `designs` bucket.
- Admin login sets an HttpOnly cookie on the Supabase functions domain. The frontend must call functions with `credentials: 'include'`.
# ss-graphic
# ss-graphic
