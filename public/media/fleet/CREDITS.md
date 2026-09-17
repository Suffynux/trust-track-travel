# Fleet photography — sources

Every image in this folder except `bus.jpg` comes from the operator's own
vehicle image set, kept in `public/TTL Car images/`, and carries no
attribution obligation.

`bus.jpg` is the one third-party photograph, and its licence **requires the
credit below to stay with the site**:

> "Mercedes-Benz Tourismo demonstrator" by
> [Arriva436](https://commons.wikimedia.org/wiki/User:Arriva436), via
> [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mercedes-Benz_Tourismo_demonstrator.JPG),
> licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Background removed and composited onto the site's field colour; this
> derivative is offered under the same licence.

If a page ever lists image credits publicly, that line belongs there too.

## How these were made

Each source is a cutout of the vehicle on a white or transparent background.
For each one: the white was knocked out to transparency, the image was
trimmed to the vehicle's own bounding box, then centred on the site's Indigo
field colour (`#1e2233`) in a 16:9 frame.

The frames are **not** all 1920 × 1080. The sources range from 313 px to
1200 px wide, and upscaling a small one to fill a fixed large canvas only
blurs it. Instead each frame is the largest 16:9 size its source can fill
honestly. The aspect ratio is identical across all six, so the cards still
crop the same way.

`lib/media.ts` carries each slot's real width and height. **If you replace an
image here, update those numbers to match** — `next/image` uses them to
reserve space before the image loads, and a mismatch shifts the layout.

| File | Tier | Source file | Frame |
| --- | --- | --- | --- |
| `sedan.jpg` | Sedan | `Attitude Black Mica camry.png` | 1920 × 1080 |
| `van.jpg` | Hyundai Staria | `staria new.png` | 1423 × 800 |
| `hiace.jpg` | Toyota Hiace | `toyota-hiace.png` | 1492 × 839 |
| `suv.jpg` | GMC | `gmc new.png` | 1670 × 939 |
| `coach.jpg` | Coaster | `coaster-removebg-preview.png` | 516 × 290 |
| `bus.jpg` | 47-seat bus | `mercedes-tourismo-coach-removebg.png` (Commons, see above) | 1920 × 1080 |

## Two things worth fixing when you can

**The Coaster is low resolution.** Both Coaster sources are tiny — the
vehicle itself is only about 190 px across in each. The result is sharp at
its own size but goes soft as soon as a card scales it up. A larger Coaster
image is the single biggest improvement left on these cards.

**The Bus is a stand-in for the operator's own coach.** `bus.jpg` is a
licensed Commons photograph of a Mercedes-Benz Tourismo demonstrator, not one
of the operator's vehicles, and it is silver where the rest of the fleet is
black or white. Swapping in a photograph of the actual 47-seat coach, shot
front three-quarter, would let the credit above be dropped.

## Replacing an image

Drop a new source in `public/TTL Car images/`, then rebuild the frame onto
the same `#1e2233` field at 16:9, save it here under the same filename, and
update that slot's `width`/`height`/`size` in `lib/media.ts`. Aim for a
front three-quarter angle to match the others, and the largest source you
have — bigger is always better here, since nothing is ever upscaled.
