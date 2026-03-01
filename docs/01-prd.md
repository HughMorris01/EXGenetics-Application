**Project Name: Excelsior Genetics Brand Platform**

**Version:** 1.0

**Status:** Approved

**Stakeholders:** Jason Stowell, Greg Farrell

**1. Executive Summary**

- **The Problem:** Excelsior Genetics is experiencing extended administrative delays in securing their New York State cannabis license. They need a robust digital footprint to legitimize their brand, showcase their 20-year cultivation expertise, and rally local 1000 Islands community support to pressure state officials.
- **The Solution:** A high-performance, informational Node.js/Express web application utilizing server-side rendered EJS templates. It features a deep-dive into their cultivation science, a showcase of their private genetic vault, a secure partnership contact portal, and a live-updating petition tracker.
- **Value Proposition:** Establishes Excelsior Genetics as the premier legacy operator in the North Country, automates the collection of wholesale/community partnership leads, and actively leverages web traffic into political action via Change.org.

**2. Target Audience & User Personas**

- **Primary User:** 1000 Islands locals, cannabis connoisseurs, and potential retail customers seeking transparency about local cultivation and product quality.
- **Secondary User:** Licensed dispensaries and local vendors looking to establish wholesale relationships or supply chain partnerships.
- **User Goals:** Verify brand authenticity, browse the upcoming strain library, submit partnership inquiries, and sign the community petition.

**3. Functional Requirements**

- **Age Gate Verification:** Session-based splash screen restricting access to users 21 and older.
- **Dynamic Petition Tracker:** Automated backend web scraper that fetches live signature counts from Change.org and renders a dynamic progress bar across multiple pages.
- **Partnership Portal:** An AJAX-driven contact form categorized by inquiry type (Wholesale, Vendor, Community).
- **Spam Prevention:** Invisible Google reCAPTCHA v3 integration to block bot submissions.
- **Automated Email Routing:** Integration with Zoho SMTP via Nodemailer to instantly route user inquiries to the administrative team and send auto-replies to the user.

**4. Technical Requirements**

| Component | Technology |
| --- | --- |
| **Frontend** | HTML5, Vanilla JavaScript, CSS3 |
| **Templating Engine** | EJS (Embedded JavaScript) |
| **Backend** | Node.js, Express.js |
| **Database** | None (Stateless Architecture) |
| **Version Control** | Git / GitHub |
| **Deployment** | Vercel (Serverless Function adapter) or AWS Lightsail |

**5. User Flow & UX/UI Design**

- **Design Language:** "Deep Roots. Higher Standards." A dark-mode, premium aesthetic using deep blacks, glassmorphism, and neon signature orange (`#f8c25d`) accents.
- **Key Pages:** - `/` (Home / Mission)
  - `/about` (Founder Story & CCTM History)
  - `/cultivation` (9-Step Scientific Process)
  - `/strains` (Genetics Vault & Lineage)
  - `/retail` (Northern Legacy Storefront Teaser)
  - `/contact` (Partnership Portal)
- **Sitemap:** Landing (Age Gate) -> Navigation -> Content Pages -> Footer/Contact.

**6. Non-Functional Requirements**

- **Performance:** Fast initial page loads achieved via server-side rendering (EJS) without heavy client-side frameworks.
- **Security:** Honeypot fields and reCAPTCHA v3 on forms.
- **Responsiveness:** Mobile-first fluid typography scaling based on viewport width, ensuring legibility from 4K displays down to mobile devices.

**7. Success Metrics (KPIs)**

- **Technical:** 100% uptime for the Change.org scraping middleware with successful fallback rendering if the external site changes.
- **Business:** Generation of verified wholesale leads via the contact portal.
- **User:** Reaching the 500-signature goal on the integrated petition tracker.

**8. Timeline & Milestones**

- **Phase 1: Brand & Layout:** Design system, CSS variables, and EJS partials (Header/Footer).
- **Phase 2: Content Integration:** Build out Cultivation, Strains, and About pages.
- **Phase 3: Logic & Middleware:** Implement Age Gate, petition scraper, and Node.js routing.
- **Phase 4: Contact Portal:** Wire up reCAPTCHA, Nodemailer, and AJAX form submissions.
- **Phase 5: Launch:** Final testing and deployment.

**9. Risks & Assumptions**

- **Assumption:** Change.org's DOM structure remains relatively stable for the regex scraper to function.
- **Risk:** Contact form abused by spam bots.
- **Mitigation:** Implemented a dual-layer defense (Hidden honeypot field + Google reCAPTCHA v3 score evaluation).