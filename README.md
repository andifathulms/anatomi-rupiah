# Anatomi Rupiah

How a banknote is built, drawn as mechanisms rather than photographed as notes — and honest that one of the three checks can't be done on a screen.

A personal, educational, open-source project. Static site, no backend, no runtime network.

## Legal position

This project relies on the educational exemption in **UU 7/2011 Pasal 24 ayat (1)**, which permits imitating Rupiah for educational and/or promotional purposes **with the word *spesimen* applied**.

Accordingly:

- Every note-like rendering carries **SPESIMEN baked into the artwork**, not overlaid — it survives screenshot and cannot be removed by hiding an element or disabling a stylesheet.
- Schematics are **deliberately non-photorealistic** and **never rendered at actual banknote dimensions**.
- **No repository contains photographs of banknotes.** All note artwork is original authored SVG.
- **No downloadable full-note images.** Export paths emit mechanism diagrams only.
- **The app renders no authenticity verdict.** Authority to determine whether Rupiah is genuine rests with **Bank Indonesia**.

See [`docs/bi-reproduction-guidance.md`](docs/bi-reproduction-guidance.md) and the site's `/hukum` page.

## Development

```bash
pnpm install
pnpm dev

pnpm test:run            # unit + compliance tests
pnpm compliance:check    # marking, asset policy, size constraint, export limits
pnpm content:validate    # citation completeness on every claim
pnpm typecheck
pnpm build               # compliance + content checks, then static export to ./out
pnpm preview             # serve ./out under the production basePath
```

`pnpm compliance:check` gates the build and CI. It is never bypassed, never given a skip flag, and its assertions are never weakened.

## Not affiliated with Bank Indonesia

No government branding is used. Nothing here should be read as official issuance or endorsement. Bank Indonesia's own public education material is linked from the site.
