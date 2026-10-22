# Disc drive homepage

Interactive portfolio homepage: pick a disc off the desk, drag it onto the open drive tray, and the tray pulls shut and loads that section's page (`/work`, `/about`, `/resume`, `/contact`, `/instagram`, the same URLs as the old site).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
```

## Where things live

| File | What it does |
| --- | --- |
| `lib/discs.ts` | The discs: slug, page title, marker label, finish, doodle. Add or reorder here; the pile and the static routes follow. |
| `components/disc-drive/DiscDrive.tsx` | Scene + motion: pointer capture, drag physics, tray magnet, insert sequence, redirect. |
| `components/disc-drive/geometry.ts` | Layout. Everything is sized off one disc diameter so it scales from phones to wide screens. Pile spots are hand-placed here. |
| `components/disc-drive/Disc.tsx` | One disc, drawn in CSS + SVG (hub, mirror band, printed finish, marker label). |
| `components/disc-drive/DriveTray.tsx` | The drive case and tray (SVG). |
| `components/disc-drive/sound.ts` | Synthesized foley via Web Audio. Off until the visitor turns it on. |
| `app/[slug]/page.tsx` + `sections.tsx` | One page per disc (Work, Projects, About, Resume, Contact, Content Creation). |
| `lib/portfolio.ts` | All portfolio text, links and image paths. Edit content here. `portfolio.md` is a plain-text copy for reference. |

## How the interaction works

- **Pick up**: `pointerdown` captures the pointer. The grab point is stored in the disc's own frame, so a disc held off-centre swings until its centre trails the pointer. Lift raises scale and the drop shadow; velocity tilts it in 3D.
- **Over the drive**: the disc is "armed" when its centre is over the drive/tray. The bubble changes, the LED lights, and the disc is pulled slightly toward the recess.
- **Drop on the tray**: the disc snaps into the recess, the tray slides shut under the drive bezel, the LED blinks, the screen fades, then `router.push("/<slug>")`.
- **Drop anywhere else**: the disc glides with its throw velocity, lands, and stays where you left it. Discs can't rest on top of the drive.
- **Keyboard**: Tab to a disc, press Enter or Space; it flies into the tray.
- Reduced-motion users get the same flow with no tilt or swing and short timings.

## Deploying to GitHub Pages

`next.config.ts` uses `output: "export"` and `trailingSlash: false`, so each disc page is written as `<slug>.html` and GitHub Pages serves it at `/<slug>`. Refreshing or linking straight to it works (no SPA 404). `public/.nojekyll` keeps GitHub Pages from hiding the `_next` folder.

If the site is served from a sub-path such as `/work`, set `basePath: "/work"` in `next.config.ts`.

## Fonts

Geist (via the `geist` package) and Permanent Marker (via `@fontsource/permanent-marker`) are self-hosted at build time, so there are no external font requests.
