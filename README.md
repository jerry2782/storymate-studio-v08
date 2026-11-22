# STORYMATE STUDIO V0.8.5.0 — Release Candidate

Mobile-first PWA for story development and AI film-production prompt preparation.

## V0.8.5.0 maintenance notes

- Align visible app version labels, runtime `APP_VERSION`, and the service-worker cache namespace on V0.8.5.0.
- Scope Story Blueprint output element IDs to each story record to prevent ambiguous DOM lookups as the renderer evolves.
- Preserve existing local storage keys and backup schema; this release does not reset or migrate user data.


## Keputusan desain V0.8.5.0

- Antarmuka, navigasi, label, petunjuk, contoh, dan notifikasi menggunakan Bahasa Indonesia.
- Bahasa keluaran prompt gambar/video tetap English.
- Pola pengisian hybrid: dropdown untuk pilihan tunggal, multi-select untuk opsi yang dapat digabung, dan input manual untuk arahan khusus.
- Setiap kolom perlu petunjuk singkat serta contoh yang relevan.
- Character Bible mendukung foto referensi dari galeri/kamera. Foto disimpan sebagai Character Reference Asset yang tertaut ke karakter, masuk dalam backup JSON yang sudah mencakup Asset Library, dan tidak mengubah Permanent Character DNA.
- Foto awal dibatasi 1,2 MB per gambar sesuai batas Asset Library yang sudah ada.
- Perubahan harus mempertahankan ID karakter, relasi aset, skema backup, dan penyimpanan lokal.

## Current release status

This is an active release candidate, **not yet declared production-ready**. It has passed source syntax checks and targeted browser interaction tests, but still requires testing on the actual Android Chrome/PWA installation and a real HTTPS deployment before public release.

## Included files

- `index.html` — application
- `manifest.webmanifest` — PWA manifest
- `sw.js` — offline app-shell service worker
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — PWA icons

## Core behavior

- Browser-local data storage with IndexedDB and legacy localStorage migration
- Full JSON backup and restore with validation and rollback attempt; individual Project Backup and Project Restore preserving unrelated projects
- Character Bible with canonical Permanent Character DNA and separate reusable variations
- Asset Library with character/project references
- Scene Builder with project, location, cast, dialogue and story-beat IDs
- Image/video prompt builders that consume Character Bible, variations, Location DNA, assets and scene details

## Important limitations

- Data is local to the browser origin/device. There is no cloud sync or multi-device account system.
- Image/video generation is not performed by this static PWA. It prepares prompts and records jobs; provider API integration requires a secure backend.
- End-to-end Android HTTPS/PWA verification still requires a real deployment and device test. Project-level backup/restore is included and has passed automated browser tests for linked-data export, target replacement, unrelated-project preservation, and rollback on simulated write failure.

## Deploy for final testing

Upload the contents of this folder to the root of a GitHub repository and enable GitHub Pages on the `main` branch/root. Test the deployed HTTPS URL in Android Chrome before relying on it for real production work. Keep regular JSON backups.

## Audit arsitektur dan rencana penyempurnaan V0.8.5.0

### Temuan dari pemeriksaan source saat ini
- Aplikasi masih berupa PWA statis satu halaman (`index.html`) dengan navigasi berbasis renderer halaman dan penyimpanan lokal melalui IndexedDB serta fallback/migrasi localStorage.
- Data inti telah dipisah menjadi proyek, karakter, variasi karakter, lokasi, scene, aset, cerita, dan prompt/job; hubungan karakter-aset menggunakan `characterId` dan `assetIds`.
- Character Bible sudah memisahkan Permanent DNA dari variasi. Kategori outfit/kostum kini menjadi variasi yang dapat digunakan ulang; AI Image Studio memiliki prompt khusus lembar referensi outfit yang mengunci identitas karakter.
- AI Image Studio dan AI Video Studio saat ini menyusun prompt dan menyimpan draft/job. Keduanya belum menjalankan generasi gambar/video secara langsung; koneksi provider memerlukan backend aman.
- Aset gambar disimpan sebagai data URL dalam Asset Library dan batas upload yang terlihat di alur aset adalah 1,2 MB per gambar. Backup JSON mencakup data aset; ukuran backup dapat membesar jika banyak gambar dimasukkan.
- Service worker menggunakan cache app-shell. Perubahan aplikasi harus diikuti pengujian pembaruan cache di browser/PWA.

### Risiko dan hal yang perlu diperbaiki
1. Lokalisasi belum menyeluruh: sejumlah modul, tombol, label, status, dan istilah masih berbahasa Inggris.
2. Pola panduan field belum konsisten; beberapa kolom hanya memiliki placeholder atau belum memiliki contoh.
3. Kontrol hybrid belum diterapkan seragam. Kamera, pencahayaan, komposisi, gerakan, audio, dan opsi produksi perlu pilihan terstruktur dengan ruang instruksi manual.
4. Character DNA Visual Sheet dan Outfit Reference Sheet saat ini menghasilkan prompt. Perlu membedakan secara eksplisit satu contact sheet dengan beberapa gambar terpisah; hasil gambar masih dibuat di layanan eksternal.
5. Foto referensi dan aset perlu diuji untuk ukuran, kompresi, relasi karakter, penghapusan aman, backup/restore, dan pemulihan jika transaksi penyimpanan gagal.
6. Perlu uji regresi terhadap project/scene/variation/asset IDs, ekspor-impor backup, project backup/restore, dan relasi antar modul.
7. Perlu uji nyata di Android Chrome/PWA HTTPS, termasuk refresh service worker dan perilaku penyimpanan perangkat.

### Urutan refactor yang disarankan
- Tahap A — stabilisasi: audit struktur data, validasi input, relasi dan transaksi penyimpanan, serta backup/restore.
- Tahap B — pengalaman Indonesia: lokalisasi seluruh UI dan tambahkan petunjuk/contoh pada setiap field.
- Tahap C — sistem visual karakter: Permanent DNA, outfit/variasi, foto referensi, multi-view, dan aturan identity lock.
- Tahap D — sistem produksi hybrid: dropdown/multi-select/input manual untuk kamera, lighting, audio, gerak, dan parameter produksi.
- Tahap E — kesinambungan produksi: pastikan Scene Builder mengirim referensi karakter, outfit, lokasi, aset, dan arahan yang konsisten ke prompt gambar/video.
- Tahap F — quality assurance: syntax check, uji browser, Android/PWA, cache, backup/restore, dan regresi sebelum rilis.

Audit ini merupakan pemeriksaan source statis; belum menggantikan pengujian runtime di perangkat Android dan deployment HTTPS.

## Catatan pekerjaan lanjutan

- Outfit/Kostum ditetapkan sebagai variasi karakter yang dapat digunakan ulang dan tidak mengubah Permanent Character DNA.
- Kategori variasi karakter ditambah dengan Outfit/Kostum, Ekspresi, Usia Cerita, Kondisi Fisik, Gaya Rambut Sementara, dan Aksesori.
- AI Image Studio menambahkan tugas Character Outfit Reference Sheet dengan instruksi tampilan depan/samping/belakang dan detail bahan/aksesori, serta identity lock agar perubahan hanya berlaku pada pakaian dan aksesori.
- Label dan kontrol utama AI Image Studio yang tersisa dipoles ke Bahasa Indonesia; hasil prompt tetap English.
- Pemeriksaan sintaks statis ulang terhadap dua blok JavaScript inline berhasil (`new Function`), tanpa error sintaks. Ini bukan pengganti pengujian interaksi browser atau Android.

## Integrasi Visual Reference Character Bible dan Asset Library

- Kategori Asset Library diperluas untuk Character Reference, Outfit Reference, Full Body Reference, Facial Reference, Character DNA Sheet, Costume, Location Reference, dan aset produksi lainnya.
- Profil Character Bible menampilkan preview gambar untuk setiap aset yang tertaut, beserta kategori, nama, dan catatan aset.
- Tombol Tambah Referensi dari profil karakter membuka Asset Library dengan karakter terkait terpilih otomatis pada form aset baru.
- Relasi aset pada Character ID tetap disinkronkan melalui `characterId` dan `assetIds`; penambahan aset menormalkan `assetIds` untuk karakter lama yang belum memiliki array tersebut.
- Validasi source statis terbaru: kedua blok JavaScript inline lolos pemeriksaan sintaks; pemeriksaan keberadaan kategori, preview, prefill relasi, dan outfit lock juga lolos. Uji interaksi dan backup/restore end-to-end masih harus dilakukan.

## Pemilihan referensi visual di AI Image Studio

- AI Image Studio menampilkan daftar aset visual milik karakter terpilih dengan thumbnail, nama, dan kategori.
- Pengguna dapat memilih secara eksplisit aset referensi yang akan dicantumkan dalam prompt; pilihan kosong berarti tidak menyertakan aset referensi karakter.
- Draft gambar menyimpan `characterId`, `variationId`, dan `referenceAssetIds` agar pilihan DNA/outfit/referensi dapat dilacak dan digunakan kembali.
- Prompt tetap berisi instruksi serta metadata referensi. Foto tidak otomatis dikirim ke penyedia AI eksternal; pengguna tetap perlu melampirkannya secara manual pada layanan gambar tujuan sampai tersedia integrasi provider/backend yang aman.
- Pemeriksaan sintaks statis: dua blok JavaScript inline lolos. Belum dilakukan uji interaksi browser, backup/restore, atau uji Android/PWA.

## Pengaitan aset ke outfit dan versi aset

- Form Asset Library kini dapat menghubungkan aset ke variasi karakter tertentu melalui `variationId`, selain relasi `characterId`.
- Daftar variasi pada form mengikuti karakter yang dipilih; perubahan karakter memperbarui pilihan variasi dan mempertahankan pilihan hanya jika masih valid.
- Setiap penyimpanan aset mencatat nomor versi bertambah (`version`) sebagai penanda revisi metadata/gambar. Ini belum merupakan arsip historis multi-file; penggantian gambar tetap mengganti data pada aset yang sama.
- AI Image Studio tidak lagi mencentang semua foto referensi secara otomatis. Pengguna memilih secara eksplisit foto yang akan dipakai dalam prompt; draft menyimpan ID yang dipilih.
- Validasi sintaks statis ulang: kedua blok JavaScript inline berhasil dikompilasi dengan `new Function`. Pengujian UI, ekspor/restore, dan Android masih perlu dilakukan.

## Referensi utama dan riwayat visual aset

- Form aset menyediakan pilihan `Jadikan referensi utama karakter`. Hanya satu aset per karakter yang ditandai sebagai referensi utama; penetapan baru menonaktifkan penanda utama pada aset lain milik karakter yang sama.
- Asset Library menampilkan status referensi utama, versi aktif, dan jumlah versi lama.
- Saat file gambar pada aset yang sama diganti, gambar sebelumnya disimpan ke `history` dengan nomor versi dan timestamp. Riwayat dibatasi maksimal 10 versi per aset untuk mengendalikan ukuran IndexedDB/backup.
- Pengguna dapat membuka riwayat, melihat thumbnail versi lama, dan memulihkan versi yang dipilih. Gambar aktif saat pemulihan disimpan kembali sebagai versi riwayat.
- Penggantian metadata tanpa mengganti file tidak membuat salinan gambar baru. Fitur ini adalah riwayat gambar per aset, bukan branching/duplikasi aset otomatis.
- Validasi sintaks statis setelah implementasi: kedua blok JavaScript inline berhasil dikompilasi. Uji browser, kapasitas penyimpanan, dan backup/restore dengan kumpulan gambar nyata tetap diperlukan.

## Visual Continuity Manager pada Scene Builder

- Form scene memiliki bagian Visual Continuity untuk memilih scene acuan sebelumnya, aturan outfit, aturan lokasi, dan catatan kesinambungan visual.
- Pengaturan disimpan pada `scene.continuityConfig` (`previousSceneId`, `outfitMode`, `locationMode`, `notes`) dan dimuat kembali saat scene diedit.
- AI Video Studio membaca scene acuan yang disimpan pada konfigurasi scene (jika ada), lalu menyertakan ringkasan cast, outfit, lokasi, dan instruksi kontinuitas ke prompt.
- Prompt menegaskan bahwa pilihan outfit yang secara eksplisit ditentukan pada scene saat ini tetap menjadi prioritas, sehingga kontinuitas tidak memaksa kostum lama jika cerita memang mengganti pakaian.
- Validasi source statis: kedua blok JavaScript inline lolos pemeriksaan sintaks; pemeriksaan keberadaan panel, field, penyimpanan konfigurasi, dan prompt continuity berhasil. Belum dilakukan uji interaksi browser, Android/PWA, atau pengujian skenario lintas scene end-to-end.

## Scene-to-Scene Continuity Checker

- AI Video Studio memiliki panel hasil pemeriksaan kontinuitas dan tombol `Periksa Kontinuitas`.
- Pemeriksaan membandingkan daftar cast, variasi/outfit tersimpan, lokasi, catatan kontinuitas scene tujuan, dan keberadaan frame terakhir dari scene acuan.
- Hasil diklasifikasikan sebagai sesuai, perubahan terdeteksi, atau perlu perhatian. Perubahan cast/outfit/lokasi bukan otomatis kesalahan; pengguna harus menilai kesesuaiannya dengan cerita.
- Pemeriksaan otomatis dijalankan saat pengguna membangun Video Master Prompt, dan dapat dijalankan manual melalui tombol.
- Pemeriksaan bersifat rule-based berdasarkan data lokal yang tersimpan; belum menggunakan computer vision untuk membaca detail visual pada gambar.
- Validasi statis: dua blok JavaScript inline lolos pemeriksaan sintaks. Pemeriksaan keberadaan panel, tombol, fungsi pemeriksa, serta kategori cast/outfit/lokasi/frame berhasil. Uji interaksi browser dan skenario lintas scene runtime belum dilakukan.

## Shot List & Storyboard Manager

- Setiap scene dapat memiliki daftar shot tersendiri pada `scene.shots`, dengan urutan, judul, durasi, framing, gerakan kamera, aksi/deskripsi, dialog berbahasa Indonesia, dan gambar storyboard opsional.
- Form Scene Builder memuat Shot List & Storyboard; shot dapat ditambah, dihapus, dan diedit sebelum scene disimpan.
- Gambar storyboard dibaca sebagai gambar, diperkecil maksimal sisi 1400 px, lalu disimpan sebagai JPEG data URL pada data scene. Pertimbangkan ukuran IndexedDB dan backup ketika mengunggah banyak gambar.
- AI Video Studio memasukkan shot list ke Video Master Prompt sesuai urutan. Gambar storyboard tersimpan lokal; belum otomatis dikirim ke provider AI eksternal dan perlu dilampirkan manual bila provider mendukung image reference.
- Shot list adalah bagian dari scene yang sudah ada; struktur hierarki episode terpisah belum dibuat pada tahap ini.
- Validasi sintaks statis: kedua blok JavaScript inline berhasil dikompilasi setelah perbaikan separator prompt. Uji interaksi browser, penyimpanan gambar, dan backup/restore end-to-end masih diperlukan.

## Storyboard Visual Board, duration summary, dan export

- Menu Scene & Story Builder menampilkan Storyboard Visual Board yang mengumpulkan shot dari seluruh scene, diurutkan berdasarkan nomor scene dan urutan shot.
- Setiap kartu menampilkan gambar storyboard bila tersedia, judul scene/shot, durasi, framing, kamera, aksi, dan dialog.
- Ringkasan menghitung jumlah shot, jumlah scene yang memiliki shot, dan total durasi berdasarkan penjumlahan durasi shot yang valid secara numerik.
- Tombol Export / Print Storyboard membuka dokumen HTML siap cetak dengan grid dua kolom; pengguna dapat memilih Save as PDF pada dialog cetak browser.
- Ekspor menggunakan gambar yang tersimpan di data scene. Browser harus mengizinkan pop-up untuk membuka lembar cetak.
- Hierarki Episode terpisah belum dibuat; storyboard board saat ini mengelompokkan dan mengurutkan data berdasarkan scene yang ada.
- Validasi sintaks statis: dua blok JavaScript inline berhasil dikompilasi. Uji tampilan responsif, pop-up/print, serta cetak PDF pada Android dan desktop belum dilakukan.

## Episode Manager dan relasi Project → Episode → Scene → Shot

- Workspace data model menambahkan koleksi `episodes`; normalisasi menjaga koleksi ini tetap berupa array dan membersihkan `projectId` episode yang tidak lagi valid.
- Episode memiliki ID, `projectId`, nomor, judul, status, sinopsis, timestamp pembuatan, dan pembaruan. Nomor episode harus unik dalam project yang sama.
- Menu Proyek Saya menyediakan Episode Manager untuk membuat, mengedit, dan menghapus episode. Episode yang masih memiliki scene tidak dapat dihapus sebelum scene dipindahkan.
- Scene Builder menyediakan pilihan episode yang difilter berdasarkan project terpilih. Perubahan project memperbarui pilihan episode.
- Scene menyimpan `episodeId` hanya jika episode tersebut benar-benar milik project yang dipilih. Scene lama yang tidak memiliki episode tetap valid dan tidak otomatis dipindahkan atau diubah.
- Normalisasi mempertahankan relasi episode yang valid; relasi episode yang tidak cocok dengan project scene akan dikosongkan tanpa menghapus scene atau shot.
- Struktur episode masih berupa pengelompokan metadata di atas scene yang sudah ada; tidak ada duplikasi atau pemindahan isi scene/shot.
- Validasi sintaks statis: kedua blok JavaScript inline berhasil dikompilasi. Uji CRUD di browser, pergantian project, backup/restore dengan episode, dan migrasi data nyata masih diperlukan.

## Audit dan perbaikan Backup/Restore untuk Episode Manager

- Full Backup menambahkan koleksi `episodes` sebagai koleksi opsional agar backup lama tanpa episode tetap dapat dipulihkan.
- Full Restore memvalidasi ID episode, menormalkan projectId episode, dan mempertahankan `episodeId` scene hanya bila episode tersebut cocok dengan project scene.
- Project Backup hanya membawa episode milik project yang dipilih.
- Project Restore memvalidasi, mengganti episode project tujuan, membuat pemetaan ID bila terjadi benturan dengan episode milik project lain, dan memperbarui relasi episode pada scene yang diimpor.
- Scene lama tanpa episode tetap didukung. Restore dari backup lama tanpa koleksi episode menghasilkan koleksi episode kosong.
- Validasi sintaks statis: kedua blok JavaScript inline berhasil dikompilasi setelah perbaikan line-break. Belum dilakukan uji restore dengan file backup nyata, konflik ID lintas project, atau pengujian browser end-to-end.
