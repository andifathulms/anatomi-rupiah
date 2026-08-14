/**
 * Figure and motif photographs, pinned by content hash — CLAUDE.md invariant
 * 13, the one deliberate exception to invariant 3's raster ban. None of these
 * depict a note; each is a portrait of a person or a photograph of a place or
 * a flower, sourced from Wikimedia Commons with its license recorded in
 * data/figures or data/motifs (photo.license, verbatim from the source page).
 *
 * Same mechanism as BRAND_RASTER_ALLOWLIST and the same reason: pinning by
 * hash means a raster can't be introduced at an allowed path by simply
 * dropping a different file there. To change one of these: replace it, run
 * `shasum -a 256`, update the hash here, and say in the commit what the new
 * image is and where it came from.
 *
 * Every source image was resized to a 1200px longest edge before hashing —
 * Commons originals run several megabytes and several thousand pixels on a
 * side, far past anything a motif card or a portrait on this site displays.
 */

export const PHOTO_RASTER_ALLOWLIST: Readonly<Record<string, string>> = {
  'public/tokoh/soekarno-hatta.jpg': 'ec3f2167c2022685277bb7588d2ed4187c963b50347f9ed54cb7c8cfedab1170',
  'public/tokoh/djuanda-kartawidjaja.jpg':
    '6eb73af1ce5aca0ee70e08147be5efe06d218aecb1213596d086b25d68548b4c',
  'public/tokoh/gssj-ratulangi.jpg': 'ac0b927501177fbbed8e4449feec94f6e8af3ef85668d2fcca56f4a963a751cf',
  'public/tokoh/frans-kaisiepo.jpg': '506d2fdd0b3ab6714a96b61c1612ff0ef44726dff629436eb7db6dc3ae1376cc',
  'public/tokoh/idham-chalid.jpg': '046d7c2511f28580f08f9b1369fdc4a0a5ab4daa69d994c0a7ec6bd013627c72',
  'public/tokoh/mohammad-hoesni-thamrin.jpg':
    '20baa473182e7f2bdc0882acfccc905359848b69729c638b8ea22337ee168a0a',

  'public/motif/tari-topeng-betawi.jpg':
    'c3998be643c7236a44ebcc713d379177d223d3d5b6e457a2e7a47dd7848e1fad',
  'public/motif/tari-legong.jpg': '6c26952b3ae368b48352b18c410ecdeedaafe5b11bc92c220e552772515637cb',
  'public/motif/tari-gong.jpg': '7f9388d135661d4591edd835803b14418ed7f377fe417ae5f0f3988e52f050a3',
  'public/motif/tari-pakarena.jpg': 'd04a0a8d8e58cfb6bb5772ac65360b31db139e16df4e9ea49be93f64e0dd4eba',
  'public/motif/tari-gambyong.jpg': 'edb133a26f26dca0e860ea53c54c4443cdd4466f4d93283a10f8935160fe6393',
  'public/motif/tari-piring.jpg': 'b7631530086f826702ef357ee84d909a110685153c9e161f9980b7ac1d744b90',
  'public/motif/tari-tifa.jpg': '056cf6c431358e6b010e39e6791869c0797b767499f07898a394aa88c6c592f6',

  'public/motif/raja-ampat.jpg': '1c741dc02308122bf81550f7d911d9fe08d9fc844e50a4a45766356dcc764a82',
  'public/motif/taman-nasional-komodo.jpg':
    '2d851b09bfc0e655d0bfe8d0b0a9183d48ce5f13c2d7eca6e5e9a0ad481fed58',
  'public/motif/derawan.jpg': '6fe1cf7990e89fc0a808f295c87392de9ce8d5f8e1cb949b8487fa88b099d69d',
  'public/motif/taman-nasional-wakatobi.jpg':
    'c52801db937371006ff73874ccef70e0e10cd7d0173098d4e9c3e5db1c9594be',
  'public/motif/gunung-bromo.jpg': 'da53e0f1b334a3cc69bbde9c54c1926bdc31fb8867ffe42b532b6581ae302f77',
  'public/motif/ngarai-sianok.jpg': '34e6dab34a04425a9f95e951665dada83744478ff81faea4fb4721a9f8bbc976',
  'public/motif/banda-neira.jpg': 'ec985f2f98fdce3a14a97170de3e9c309309e63b0b74f657f76edd4dc905cc2a',

  'public/motif/anggrek-bulan.jpg': '814aac6b4823016dcb6d2153bb0746cd9f833b1bcb029bc2fd3f8cd52bb54721',
  'public/motif/jepun-bali.jpg': '6b2cc4423ff6ac28880dc2f93eb4803f741788f5eb107ce3964c0f62322700ce',
  'public/motif/anggrek-hitam.jpg': '4d0704df0a55dd7356df07880619c141dbcbb551d6c87b521efed7836516c7ec',
  'public/motif/sedap-malam.jpg': '9f912258b93a3fec56695f60df08b7a05b2959f205ebdfb449db35b49d9876f0',
  'public/motif/jeumpa.jpg': '49af52615f31110a4fb51171e8f16d5dbd4163968cb5f61f2b52803fb24c22c6',
  'public/motif/anggrek-larat.jpg': '31dd0a900c54cdaa7de0d97007534c2a6db5f838350c2173001f495bbc03c565',
}
