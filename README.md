# Portfolio Template — React + Tailwind + shadcn-style

Template portofolio untuk backend developer. Terinspirasi [Abdul Samad](https://samadd.vercel.app/), [Toukoum](https://www.toukoum.fr/), dan [Redoyanul Haque](https://www.redoyanulhaque.me/).

## Fitur

- **React + Vite** — cepat, modern
- **Tailwind CSS** — utility-first styling
- **shadcn-style** — komponen Button & Card (clsx, tailwind-merge, cva)
- **Framer Motion** — animasi scroll, hero, nav, chat
- **Tanya AI (simulasi)** — widget chat kanan bawah; jawaban random (bisa diganti integrasi API/OpenAI nanti)
- **Scroll progress** — bar tipis di atas saat scroll

## Jalankan

```bash
npm install
npm run dev
```

Build: `npm run build`  
Preview build: `npm run preview`

## Yang bisa kamu ubah

1. **Nama & bio** — `src/components/Hero.jsx` (Your Name, tagline, lokasi)
2. **About** — `src/components/About.jsx`
3. **Skills** — `src/components/Skills.jsx` (object `skills`)
4. **Projects** — `src/components/Projects.jsx` (array `projects`, link & GitHub)
5. **Education** — `src/components/Education.jsx` (array `timeline`)
6. **Footer & social** — `src/components/Footer.jsx` (link GitHub, LinkedIn, email)
7. **Jawaban AI (fake)** — `src/components/AIChat.jsx` (array `fakeReplies`)

Kalau mau dark mode, tambah class `dark` di `<html>` dan pastikan variabel di `src/index.css` sudah dipakai (sudah ada block `.dark`).
