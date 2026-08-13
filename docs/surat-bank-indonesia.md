# Enquiry to Bank Indonesia — draft for sending

PRD §13 and `docs/bi-reproduction-guidance.md` both leave the same item open: no
written confirmation has been sought from Bank Indonesia. The project searched
BI's published regulations and found no reproduction rule beyond the statutory
marking requirement, and adopted a stricter posture in the absence of one. That
is a defensible position, but it is not the same as having asked.

**This is a draft for a person to send.** It is not sent. Send it before
promoting the project publicly rather than merely publishing it, particularly
given the ASN consideration in PRD §13.

## Where to send it

- **Kontak BI** — 131, or `bicara@bi.go.id`
- **PPID Bank Indonesia** (public information request, which produces a written
  answer on the record): https://www.bi.go.id/id/informasi-publik
- The PPID route is preferable. A written answer is the thing worth having.

Attach: the site URL, and `docs/bi-reproduction-guidance.md`.

---

## Draft — Bahasa Indonesia

> **Perihal: Permohonan penjelasan mengenai ketentuan reproduksi gambar Rupiah untuk tujuan pendidikan**
>
> Kepada Yth. Bank Indonesia,
>
> Saya sedang mengembangkan sebuah proyek edukasi pribadi non-komersial bernama
> Anatomi Rupiah, yang menjelaskan cara kerja unsur pengaman pada uang Rupiah
> kertas serta cara memeriksanya dengan metode 3D. Proyek ini berupa situs
> statis, terbuka untuk umum, dan tidak memungut biaya.
>
> Proyek ini bersandar pada pengecualian dalam UU No. 7 Tahun 2011 Pasal 24
> ayat (1). Untuk memenuhi ketentuan tersebut, setiap gambar uang pada situs
> ini:
>
> 1. diberi kata SPESIMEN yang dibentuk sebagai bagian dari gambar itu sendiri,
>    bukan lapisan terpisah, sehingga tetap terbawa pada tangkapan layar dan
>    tidak dapat dihilangkan dengan menyembunyikan elemen atau mematikan lembar
>    gaya;
> 2. digambar sebagai skema garis, tidak fotorealistis, dan tidak memuat foto
>    uang dalam bentuk apa pun;
> 3. ditampilkan pada ukuran di bawah 70% ukuran uang sebenarnya, diperiksa
>    secara otomatis pada setiap proses build;
> 4. hanya ditampilkan di layar. Tidak tersedia unduhan berkas gambar uang utuh
>    pada resolusi berapa pun.
>
> Situs ini juga tidak menyatakan keaslian selembar uang tertentu, dan
> menegaskan bahwa kewenangan tersebut ada pada Bank Indonesia.
>
> Kami telah menelusuri PBI mengenai Pengelolaan Uang Rupiah, PBI mengenai
> pengeluaran dan pengedaran uang kertas Tahun Emisi 2022, serta Kodifikasi
> Peraturan Bank Indonesia, dan tidak menemukan ketentuan teknis lebih lanjut
> mengenai reproduksi gambar Rupiah. Karena itu kami menerapkan ketentuan yang
> lebih ketat sebagaimana lazim ditetapkan bank sentral lain.
>
> Sehubungan dengan hal tersebut, kami memohon penjelasan atas dua hal:
>
> 1. Apakah Bank Indonesia menetapkan ketentuan teknis mengenai reproduksi
>    gambar Rupiah untuk tujuan pendidikan — misalnya batas rasio ukuran,
>    keharusan penggambaran satu sisi, atau tata cara penempatan kata spesimen —
>    di luar ketentuan Pasal 24 ayat (1)?
> 2. Apabila ada, di mana ketentuan tersebut dapat kami rujuk, dan apakah
>    penerapan yang kami uraikan di atas telah memadai?
>
> Kami akan menyesuaikan proyek ini dengan penjelasan Bank Indonesia. Alamat
> situs dan catatan kepatuhan proyek kami lampirkan.
>
> Hormat kami,
> Andi Fathul Mukminin Salahuddin

---

## Draft — English (for reference; send the Indonesian version)

> **Subject: Request for clarification on reproducing images of Rupiah for educational purposes**
>
> I am developing a non-commercial personal educational project, Anatomi Rupiah,
> which explains how the security features of Rupiah banknotes work and how to
> check them using the 3D method. It is a static, publicly accessible website
> with no charge to users.
>
> The project relies on the exemption in Law No. 7 of 2011, Article 24(1). To
> comply, every depiction of a banknote on the site:
>
> 1. carries the word SPESIMEN authored into the artwork's own geometry rather
>    than as a separate layer, so it survives screenshots and cannot be removed
>    by hiding an element or disabling a stylesheet;
> 2. is drawn as a line schematic, is not photorealistic, and contains no
>    photograph of a banknote in any form;
> 3. renders below 70% of actual banknote dimensions, asserted automatically on
>    every build;
> 4. is displayed on screen only. No full-note image file is downloadable at any
>    resolution.
>
> The site renders no verdict on whether any particular note is genuine, and
> states that this authority rests with Bank Indonesia.
>
> We have reviewed the PBI on Rupiah Management, the PBIs on the issuance of
> 2022 emission banknotes, and the Bank Indonesia regulatory codification, and
> found no further technical provision on reproducing images of Rupiah. We have
> therefore adopted the stricter conditions that other central banks commonly
> specify.
>
> We would be grateful for clarification on two points:
>
> 1. Does Bank Indonesia specify technical conditions for reproducing images of
>    Rupiah for educational purposes — such as size-ratio limits, a single-sided
>    depiction requirement, or rules on how the word "spesimen" must be applied —
>    beyond Article 24(1)?
> 2. If so, where may we consult them, and is the implementation described above
>    sufficient?
>
> We will adjust the project in line with Bank Indonesia's guidance. The site
> address and our compliance notes are attached.

---

## After a reply arrives

- Record the answer and its reference number in `docs/bi-reproduction-guidance.md`,
  replacing the negative finding in §2 with what BI actually said.
- If BI specifies conditions stricter than the current posture, change
  `lib/schematic/constraint.ts` and the compliance gate to match, and re-render.
- If BI specifies conditions looser than the current posture, change nothing.
  The stricter posture costs this project nothing.
