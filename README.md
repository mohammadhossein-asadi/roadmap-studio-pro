<div align="center">

# Roadmap Studio Pro

### 3D-Interactive Learning Roadmap Builder

A visually immersive roadmap visualization platform built with Next.js 16, React Three Fiber, Three.js, GSAP, and Lottie — featuring 3D scene rendering, smooth scroll animations, and interactive career/learning roadmaps.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Coming_Soon-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=3b82f6)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js_0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Overview

Roadmap Studio Pro pushes the boundaries of web-based learning tools by combining 3D graphics with interactive roadmap visualizations. Built with React Three Fiber for 3D rendering, GSAP for scroll-driven animations, Lottie for motion graphics, and Lenis for buttery smooth scrolling — it creates an immersive experience for exploring career and technology roadmaps.

---

## Features

| Feature | Description |
|:--------|:------------|
| **3D Scene Rendering** | React Three Fiber + Three.js for interactive 3D environments |
| **GSAP Animations** | Scroll-triggered and timeline-based animations |
| **Lottie Motion** | Vector animations for micro-interactions |
| **Smooth Scrolling** | Lenis-powered buttery smooth scroll experience |
| **Interactive Roadmaps** | Clickable career/learning path visualizations |
| **Dashboard** | Roadmap management and progress tracking |
| **Responsive Design** | Adaptive layouts across all viewport sizes |
| **Dark/Light Theme** | System-aware theme switching |

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **React** | React 19 |
| **3D** | Three.js 0.185, React Three Fiber 9, React Three Drei 10 |
| **Animation** | GSAP 3.15, Motion (Framer Motion) 12, Lottie Web 5.13 |
| **Scroll** | Lenis 1.3 |
| **Styling** | Tailwind CSS 3.4 |
| **Icons** | Lucide React |

---

## Project Structure

```
roadmap-studio-pro/
├── src/
│   ├── app/
│   │   ├── page.tsx             # Landing page
│   │   ├── dashboard/           # Dashboard
│   │   ├── roadmap/             # Roadmap viewer
│   │   ├── layout.tsx           # Root layout
│   │   ├── error.tsx            # Error boundary
│   │   └── not-found.tsx        # 404 page
│   ├── components/              # UI components
│   ├── data/                    # Roadmap data
│   ├── hooks/                   # Custom hooks
│   ├── lib/                     # Utilities
│   ├── shaders/                 # Custom GLSL shaders
│   └── types/                   # TypeScript types
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/roadmap-studio-pro.git
cd roadmap-studio-pro
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

---

## Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

---

## Key Architecture Decisions

### React Three Fiber for 3D
R3F provides a React-native declarative API for Three.js, enabling component-based 3D scene composition with automatic cleanup and React lifecycle integration.

### GSAP + Lenis for Scroll-Driven Animation
Lenis handles smooth scrolling at the browser level, while GSAP's ScrollTrigger maps scroll progress to animation timelines — creating buttery, performant scroll experiences.

### Custom GLSL Shaders
The `shaders/` directory contains custom fragment/vertex shaders for unique visual effects that go beyond standard Three.js materials.

### Data-Driven Roadmaps
Roadmap data lives in `src/data/` as typed TypeScript structures, making it easy to add new career paths or learning tracks without touching rendering logic.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Mohammadhossein Asadi** — Frontend & Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>