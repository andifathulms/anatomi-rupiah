# Bank Indonesia reproduction guidance — M0 verification

**Status:** checked 2026-08-13. Blocker cleared with a conservative posture (see *Decision*).
**Re-check:** before each public release, and on any new PBI touching Pengelolaan Uang Rupiah.

PRD §2 and §13 make this an M0 blocker: the statute grants the exemption, but a central
bank may additionally specify reproduction conditions — size ratios, single-sided depiction,
placement of the marking — as the ECB and the Bank of England both do. This is the record of
what was checked and what was found.

## 1. The statutory basis — confirmed

**UU 7/2011 tentang Mata Uang, Pasal 24 ayat (1):** every person is prohibited from imitating
Rupiah, *except for educational and/or promotional purposes by applying the word* **spesimen**.

**Pasal 24 ayat (2):** every person is prohibited from distributing or circulating *Rupiah Tiruan*.

**Pasal 35 ayat (1):** violation of either carries imprisonment up to 1 year and a fine up to
Rp200,000,000.

Source: [Konsolidasi UU No. 7 Tahun 2011 tentang Mata Uang (bi.go.id)](https://www.bi.go.id/id/tentang-bi/profil/uu-bi/UndangUndang%20BI/Konsolidasi-UU-No.7-Tahun-2011-Mata%20Uang.pdf)

Two consequences the codebase already encodes:

- Ayat (1) is the exemption this project relies on — hence SPESIMEN on every note-like rendering.
- Ayat (2) is *separate* and has no educational carve-out for distribution. On-screen display is
  the carve-out; emitting a downloadable full-note file is closer to circulating a *Rupiah Tiruan*.
  This is why no export path emits a full note (PRD §2, invariant 5).

## 2. Additional BI-specified conditions — searched, none found published

Checked for a published BI specification of reproduction conditions:

- [PBI No. 3 Tahun 2026 tentang Uang Rupiah Kertas dan Logam](https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI_032026.aspx) — governs characteristics, design, and material of currency. No reproduction/specimen provision found.
- [PBI No. 21/10/PBI/2019 tentang Pengelolaan Uang Rupiah](https://www.bi.go.id/id/publikasi/peraturan/Documents/PBI_211019.pdf) — no article on *meniru*, *Rupiah Tiruan*, or *spesimen* reproduction conditions found.
- [Kodifikasi Peraturan BI — Pengelolaan Uang Rupiah](https://www.bi.go.id/id/archive/kodifikasi-peraturan/Documents/Pengelolaan%20Uang%20Rupiah%20.pdf) — same.
- [BI "Gambar Uang" gallery](https://www.bi.go.id/id/rupiah/gambar-uang/default.aspx) — BI publishes note images itself and attaches no stated terms of reuse, no size ratio, no marking instruction.

**Finding:** Bank Indonesia does not appear to publish an ECB-style reproduction rule. The
operative published condition is the statutory one — the word *spesimen* applied.

**This is a negative finding from public sources, not a clearance.** It means there is no known
additional rule to comply with; it does not mean an unpublished internal guideline cannot exist.

## 3. Decision — adopt the stricter foreign-central-bank posture anyway

Because the absence of a published rule is weaker evidence than a published permission, the
project adopts the conditions that comparable central banks specify. Every one of these is
*more* restrictive than anything found above, so complying with them cannot put the project
offside of a BI rule discovered later.

| Adopted condition | Where enforced |
|---|---|
| The word **SPESIMEN** appears on every note-like rendering, in the artwork's own path structure — not an overlay, not removable | `lib/spesimen`, asserted by `tests/compliance` |
| Rendered linear size stays **outside 75%–150%** of actual banknote dimensions; the project takes the low side, capping full-note schematics at **≤70%** | `lib/schematic`, asserted at build by `compliance:check` |
| **Single-sided** — no rendering shows obverse and reverse of the same note as a matched pair at note-like fidelity | schematic data model carries one face per view |
| **Non-photorealistic** — outline geometry and flat channel colour only; no gradient mesh, no texture, no engraving simulation on the schematic itself | authored SVG review + asset policy check |
| **No raster note imagery** anywhere in the repository | asset policy check |
| **No full-note export** at any resolution; export emits mechanism diagrams only | export path assertions |

The 75%–150% band is the ECB's rule for reproductions of euro banknotes and the Bank of England's
for sterling. It is used here as a defensible engineering threshold in the absence of a BI figure —
**it is not represented as Bank Indonesia's rule**, and the site does not claim it is.

## 4. What is still open

- No written confirmation has been sought from Bank Indonesia directly. Worth doing before the
  project is promoted publicly rather than merely published (PRD §13, the ASN risk row).
- PBI No. 3 Tahun 2026's full text was read only via its summary page. Re-read the full PDF when
  it is available as extractable text.

Until either changes, the posture in §3 stands and the build enforces it.
