# PETROCON TECHNICAL WORKS LLC — Corporate Website

Frontend-only Next.js (App Router) corporate website for **PETROCON Technical Works LLC**, built with React, TypeScript, Tailwind CSS, GSAP & ScrollTrigger, Framer Motion, Lenis, Lucide React, and Vanta.NET (Three.js).

## Quick Start & Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build & Vercel Deployment

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

### Deploying to Vercel
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://petrocon-technical.com`) so canonical URLs, `sitemap.xml`, `robots.txt`, and JSON-LD schemas resolve to the live domain.
4. Deploy with the default Next.js build preset (`npm run build`).

## Centralized Content & Verification Configuration

All company details, services, industries, careers, and FAQs are centralized in `/src/config/`:

- **`/src/config/company.ts`**:
  - **Contact Details**: `address`, `telephone`, `whatsapp`, `email`, `businessHours`, and `googleMaps` each include a `verified: boolean` flag. Unverified fields remain hidden on the live site.
  - **WhatsApp Integration**: Set `contact.whatsapp.verified = true` and populate `numberE164` (digits only, e.g. `971500000000`) to activate the floating WhatsApp button and WhatsApp enquiry dispatch buttons.
  - **Clients & Partners**: Set `clientsSection.enabled = true` and add approved client objects to `clientsSection.clients` once authorized logos are ready.
  - **Social Links**: Add verified URLs with `verified: true` to `socialLinks`.
- **`/src/config/services.ts`**:
  - Toggle `confirmed: true | false` on any proposed service category.
- **`/src/config/industries.ts`**:
  - Toggle `confirmed: true | false` on any proposed industry sector.
- **`/src/config/careers.ts`**:
  - Manage `careerCategories` (trade talent pool) and `activeVacancies` (confirmed open roles; `JobPosting` JSON-LD is emitted only when `activeVacancies` contains confirmed items).
- **`/src/config/faq.ts`**:
  - Manage company-approved FAQ items.

## Legal Draft Pages

- `/privacy-policy` and `/terms-and-conditions` are clearly marked as **Draft Documents for Company Approval** and should be reviewed by PETROCON legal counsel prior to production launch.

---
Designed & Developed by [Harsh Apex Digital Solutions](https://harshapex.com.lk)
