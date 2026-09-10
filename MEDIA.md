# Media drop-in guide

Every image and video slot on the site. **Nothing here is required.** A slot
with no file renders a labelled plate naming the exact path to drop the file
at, so the layout is already correct — the plates are what you see now.

To fill one: save the file at the path below, inside `public/`, then rebuild
(`npm run build`) or just reload in `npm run dev`. Nothing else to change.

Slots are defined in [`lib/media.ts`](lib/media.ts) — add, rename or remove
them there.

## Format

- **Photos**: JPG or WebP. Match the pixel size given; larger is fine, Next.js
  resizes and serves modern formats automatically.
- **Video**: MP4 (H.264) under 4 MB. Add a WebM at the same name for smaller
  files — it is served first when present. Always ship `hero-poster.jpg` too:
  it shows on slow connections and before the loop starts.
- The hero video is muted, looped and has no controls. It is a backdrop, so
  keep it calm and avoid hard cuts.

## Licensing

Use footage you own, or stock under a licence that permits commercial use —
Pexels, Coverr and Unsplash all offer free commercial licences. Re-uploading
clips found on Pinterest or Instagram is a copyright risk on a business site.

## Subject

Your brand guide asks for the service rather than the sacred site: the
expressway, terminal exteriors, hotel forecourts, skylines at distance, real
vehicles and real drivers. Avoid close-ups of worship or the Kaaba as a
marketing backdrop.

---

## Hero and page-wide

| Drop the file at | Size | What it should show |
| --- | --- | --- |
| `public/media/hero-poster.jpg` | 1920 × 1080 | First frame of the hero video, or a still in its place. Golden hour on the expressway, vehicle in motion, Makkah skyline distant. |
| `public/media/hero.mp4` | 1920 × 1080 | 8–15 second silent loop, no cuts. Expressway at golden hour, terminal forecourt, or the car pulling up. Keep the left two thirds calm — the headline sits there. Export at 1920×1080, under 4 MB, H.264. A WebM at media/hero.webm is used first if present. |
| `public/media/hero.webm` | 1920 × 1080 | Optional WebM of the same loop. Served ahead of the MP4. |
| `public/media/expressway.jpg` | 1920 × 1080 | Wide landscape for the closing band. Road, horizon, early light. No people. |
| `public/media/interior.jpg` | 1920 × 1080 | Rear cabin, clean and empty. Water bottles, legroom. Shot from the door. |

## Fleet — vehicle photography

**These six slots are filled.** Real, licensed photographs of each vehicle are
already in place — see [`public/media/fleet/CREDITS.md`](public/media/fleet/CREDITS.md)
for the source and licence of each one.

Photographs of your own fleet would be better still: they show the actual cars
a guest will ride in, and they carry no attribution obligation. To swap one in,
drop it at the same filename below and delete that row from CREDITS.md.

| Drop the file at | Size | What it should show |
| --- | --- | --- |
| `public/media/fleet/sedan.jpg` | 1920 × 1080 | Sedan tier. Three-quarter front, vehicle clean, plain background. |
| `public/media/fleet/van.jpg` | 1920 × 1080 | Hyundai Staria tier. Three-quarter front, matching angle and light. |
| `public/media/fleet/hiace.jpg` | 1920 × 1080 | Toyota Hiace tier. Three-quarter front, side door closed. |
| `public/media/fleet/suv.jpg` | 1920 × 1080 | GMC tier. Three-quarter front, full vehicle in frame. |
| `public/media/fleet/coach.jpg` | 1920 × 1080 | Coaster tier. Three-quarter front, full vehicle in frame. |
| `public/media/fleet/bus.jpg` | 1920 × 1080 | 47-seat bus tier. Three-quarter front, full-size coach in frame. |

The fleet cards crop with `object-fit: cover`, so leave a little space around
the vehicle rather than filling the frame edge to edge.

## Route pages

| Drop the file at | Size | What it should show |
| --- | --- | --- |
| `public/media/routes/jeddah-airport-to-makkah.jpg` | 1920 × 1080 | Terminal forecourt or the Makkah approach road. |
| `public/media/routes/makkah-to-madinah.jpg` | 1920 × 1080 | Open road, long horizon. |
| `public/media/routes/madinah-airport-transfer.jpg` | 1920 × 1080 | Terminal exterior or the short hotel approach. |

## Ziyarat — route headers

| Drop the file at | Size | What it should show |
| --- | --- | --- |
| `public/media/ziyarat/makkah.jpg` | 1200 × 1600 | Makkah skyline or hillside at distance. Not the Haram interior. |
| `public/media/ziyarat/madinah.jpg` | 1200 × 1600 | Madinah at distance, Mount Uhud, or a road approach. |

## Ziyarat — individual stops

| Drop the file at | Size | What it should show |
| --- | --- | --- |
| `public/media/ziyarat/stops/jabal-al-noor.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/jabal-thawr.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/mina.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/muzdalifah.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/jabal-al-rahmah.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/jannat-al-mualla.jpg` | 1200 × 1200 | Exterior, respectful distance. |
| `public/media/ziyarat/stops/masjid-quba.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/mount-uhud.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/masjid-al-qiblatain.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/seven-mosques.jpg` | 1200 × 1200 | Exterior, daylight. |
| `public/media/ziyarat/stops/jannat-al-baqi.jpg` | 1200 × 1200 | Exterior, respectful distance. |

---

**27 slots in total.** The six fleet slots are filled; the rest are optional,
so fill the ones you have. The hero carries the most weight of what remains —
a calm 8–15 second loop there changes the site more than anything else left.
