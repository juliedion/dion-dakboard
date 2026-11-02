# Family Command Center — portrait dashboard

A live 1080 × 1920-inspired dashboard with today's calendar, a seven-day agenda, weather, a rotating daily quote and family photo slideshow. No custom domain required.

## Run in VS Code / Claude Code

1. Open this folder in VS Code.
2. Run `npm install` and `npm run dev`.
3. Open `http://localhost:3000`.
4. Copy `.env.example` to `.env.local` and set calendar URLs.
5. Put photos named `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg` in `public/photos/` (or edit `photoFiles` in `app/page.tsx`). Photos rotate every 12 seconds.

## Google Calendar

In Google Calendar on desktop: Settings → select a calendar → Integrate calendar → **Secret address in iCal format**. Paste the URL into `CALENDAR_ICS_URL` in `.env.local` or Vercel Environment Variables. Repeat for other calendars. **Never put secret ICS URLs in frontend code, screenshots, or public repositories.** The API route fetches them server-side. Calendar feed changes may take time to appear. Some organizational calendars don't allow secret ICS URLs; in that case a Google OAuth integration is needed.

## Deploy on Vercel

1. Push this folder to a **private** GitHub repository.
2. In Vercel, choose **Add New → Project**, import that repository, and deploy.
3. In **Project Settings → Environment Variables**, add `CALENDAR_ICS_URL` and optional additional calendars, then redeploy.
4. Use the free `*.vercel.app` URL on your Raspberry Pi browser (kiosk mode). Vercel plan eligibility depends on usage and project type.

## Display

Open the Vercel URL fullscreen on your Raspberry Pi. Set the display to portrait orientation in your Pi/DAKboard OS configuration. If DAKboard Plus has a compatible website/iframe block, it may also be embedded there, but direct browser kiosk mode is the most reliable for a full-screen custom webpage. A static PNG won't update.

## Customizing

- Colors, sizes, layout: `app/style.css`
- Daily quote list: `quotes` in `app/page.tsx`
- Photos: `public/photos`
- Weather coordinates: `.env.local`
- Calendar sources: `.env.local`

## Privacy note

A public Vercel URL makes the dashboard (including calendar titles and family photos) accessible to anyone with the link. Before using personal data, add access protection or an authenticated display mechanism. Vercel deployment protection options depend on plan. Do not treat an unguessable URL as private.
