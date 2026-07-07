# Build a Premium Portfolio Website

This implementation plan outlines the creation of a stunning, modern, and highly responsive personal portfolio website for Abdallah Saad Marzouk, a .NET Backend Developer. The site will utilize HTML, Vanilla CSS, and JavaScript, focusing on rich aesthetics, a sleek dark mode theme, glassmorphism, and dynamic scroll animations to leave a lasting premium impression.

## User Review Required

> [!IMPORTANT]
> Please review the design choices below. Specifically, confirm if you prefer a dark mode aesthetic (often preferred for backend developers) with vibrant neon accents (like electric blue or purple), or if you'd prefer a different color palette.
> 
> Also, confirm if you are okay with me using AI generation to create a placeholder headshot and project images for your demonstration.

## Proposed Changes

We will build the application as a highly optimized static site.

### Web Application Core

#### [NEW] index.html
The main structure of the single-page application.
- **Hero Section**: Impactful introduction with smooth fade-in animations, call-to-action buttons, and the generated professional headshot.
- **About Me**: A clean layout presenting your background and goals.
- **Skills**: A highly visual, animated grid displaying your technical stack (C#, .NET Core, SQL Server, etc.).
- **Projects**: A glassmorphic card layout showcasing the three projects (E-Commerce, Blog, Inventory) with hover effects and generated thumbnail images.
- **Experience & Services**: A professional timeline for experience and a neat grid for services.
- **Contact**: A functional-looking (visual) form and stylish social media links.
- **SEO Best Practices**: Proper semantic HTML5 tags (`<header>`, `<main>`, `<section>`, `<article>`), meta tags, and structured headings.

#### [NEW] css/style.css
The stylesheet responsible for the premium "wow" factor.
- **Variables & Theming**: Custom CSS variables for a deep, rich dark theme with vibrant accents.
- **Typography**: Modern Google Fonts (`Outfit` for headings, `Inter` for body text).
- **Glassmorphism**: Backdrop blur and semi-transparent backgrounds for cards and the sticky navigation.
- **Animations**: Keyframes for loading animations, hover transforms, and glowing shadow effects.

#### [NEW] js/main.js
The interactive logic for the site.
- **Scroll Animations**: Intersection Observer to trigger reveal animations as the user scrolls down.
- **Navbar Handling**: Sticky navigation that changes appearance upon scrolling.
- **Smooth Scrolling**: For navigation links moving to different sections.

#### [NEW] assets/
Various generated assets to use instead of blank placeholders:
- `assets/headshot.webp`
- `assets/project1.webp`
- `assets/project2.webp`
- `assets/project3.webp`

## Open Questions

1. Are there any specific GitHub, LinkedIn, or social media links you want me to hardcode now, or should I leave them as customizable `#` links?
2. Do you have a preferred accent color for the portfolio? (e.g., #00f2fe Cyan, #667eea Purple)

## Verification Plan

### Manual Verification
- Render the HTML file in the browser (or run a local Python HTTP server if needed).
- Test responsiveness across mobile, tablet, and desktop views.
- Ensure all animations run smoothly without dropping frames.
- Verify semantic HTML and accessibility (contrast ratios, aria labels).
