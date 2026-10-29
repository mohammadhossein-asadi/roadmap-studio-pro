<div align="center">

# Roadmap Studio Pro

### سازنده‌ی نقشه‌راه‌های یادگیری تعاملی سه‌بعدی

پلتفرم تصویرسازی غرق‌کننده‌ی نقشه‌راه با ترکیب گرافیک سه‌بعدی و نقشه‌راه‌های تعاملی، با Next.js 16، React Three Fiber، Three.js، GSAP و Lottie — با رندر صحنه سه‌بعدی، انیمیشن‌های اسکرال افSadí\footnote{Smooth scroll} و نقشه‌راه‌های شغلی/یادگیری تعاملی.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Coming_Soon-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=3b82f6)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js_0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## نمای کلی

Roadmap Studio Pro با ترکیب گرافیک سه‌بعدی و تصویرسازی‌های نقشه‌راه تعاملی، مرزهای ابزارهای یادگیری مبتنی بر وب را گسترش می‌دهد. با React Three Fiber برای رندر سه‌بعدی، GSAP برای انیمیشن‌های محرک اسکرول، Lottie برای گرافیک‌های حرکتی و Lenis برای اسکرول عاطق‌چکlike زنده — تجربه‌ای غرق‌کننده برای کاوش در نقشه‌راه‌های شغلی و تکنولوژی خلق می‌کند.

---

## ویژگی‌ها

| ویژگی | توضیح |
|:--------|:------------|
| **رندر صحنه سه‌بعدی** | React Three Fiber + Three.js برای محیط‌های سه‌بعدی تعاملی |
| **انیمیشن‌های GSAP** | انیمیشن‌های محرک اسکرول و زمان‌بندی‌شده |
| **حرکت Lottie** | انیمیشن‌های برداری برای تعاملات ریز |
| **اسکرول عاطر** | تجربه‌ی اسکرول نرم و ویژگی od Lenis |
| **نقشه‌راه‌های تعاملی** | تصویرسازی‌های مسیر شغلی/یادگیری قابل کلیک |
| **داشبورد** | مدیریت نقشه‌راه و پیگیری پیشرفت |
| **طراحی واکنش‌گرا** | لایه‌بندی‌های تطبیقی در همه ابعاد دوربین |
| **تم تاریک/روشن** | تغییر تم با آگاهی از سیستم |

---

## پشته فناوری

| لایه | فناوری‌ها |
|:------|:-------------|
| **فریم‌ورک** | Next.js 16 (App Router) |
| **زبان** | TypeScript 5 |
| **React** | React 19 |
| **سه‌بعدی** | Three.js 0.185، React Three Fiber 9، React Three Drei 10 |
| **انیمیشن** | GSAP 3.15، Motion (Framer Motion) 12، Lottie Web 5.13 |
| **اسکرول** | Lenis 1.3 |
| **استیلینگ** | Tailwind CSS 3.4 |
| **آیکون‌ها** | Lucide React |

---

## ساختار پروژه

```
roadmap-studio-pro/
├── src/
│   ├── app/
│   │   ├── page.tsx             # صفحه‌ی فرود
│   │   ├── dashboard/           # داشبورد
│   │   ├── roadmap/             # نمایگر نقشه‌راه
│   │   ├── layout.tsx           # لی‌اوت ریشه
│   │   ├── error.tsx            # مرز خطا
│   │   └── not-found.tsx        # صفحه‌ی ۴۰۴
│   ├── components/              # کامپوننت‌های رابط کاربری
│   ├── data/                    # داده‌های نقشه‌راه
│   ├── hooks/                   # هوک‌های سفارشی
│   ├── lib/                     # ابزارهای کاربردی
│   ├── shaders/                 # شیادرهای GLSL سفارشی
│   └── types/                   # انواع TypeScript
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## شروع سریع

### پیش‌نیازها

- **Node.js** >= 18.0.0

### نصب

```bash
git clone https://github.com/mohammadhossein-asadi/roadmap-studio-pro.git
cd roadmap-studio-pro
npm install
```

### توسعه

```bash
npm run dev
```

در آدرس `http://localhost:3000` باز می‌شود.

### بیلد نسخه‌ی تولید

```bash
npm run build
npm run start
```

---

## اسکریپت‌ها

| دستور | توضیح |
|:--------|:------------|
| `npm run dev` | راه‌اندازی سرور توسعه Next.js |
| `npm run build` | بیلد نسخه‌ی تولید |
| `npm run start` | اجرای سرور نسخه‌ی تولید |
| `npm run lint` | ESLint |

---

## تصمیمات کلیدی معماری

### React Three Fiber برای سه‌بعدی
R3F یک API esclare کماکان‌ساز React برای Three.js ارائه می‌دهد که امکان ترکیب صحنه‌های سه‌بعدی مبتنی بر کامپوننت با پاکسازی خودکار و یکپارچگی چرخه‌ی React را فراهم می‌کند.

### GSAP + Lenis برای انیمیشن محرک اسکرول
Lenis اسکرول نرم را در سطح مرورگر مدیریت می‌کند، در حالی که اسکرول캐스트 GSAP (ScrollTrigger) پیشرفت اسکرول را به زمان‌بندی‌های انیمیشن نگاشت می‌کند — خلق تجربه‌های اسکرول عطر و کارآمد.

### شیادرهای GLSL سفارشی
دایرکتوری `shaders/` شامل شیادرهای�� لکه‌زنی/رأس سفارشی برای اثرات بصری منحصر‌به‌فرد است که فراتر از مواد استاندارد Three.js هستند.

### نقشه‌راه‌های مبتنی‌به‌داده
داده‌های نقشه‌راه در `src/data/` به‌صورت ساختارهای typed TypeScript زندگی می‌کنند، بنابراین اضافه کردن مسیرهای شغلی یا مسیرهای یادگیری جدید بدون لمس منطق رندر آسان است.

---

## مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

---

<div align="center">

**Mohammadhossein Asadi** — مهندس فرانت‌اند و فرانت‌به‌کل

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>
