**Technical Design Document (TDD)**

**Project Name: Excelsior Genetics Brand Platform**

**Developer: Greg Farrell**

**Date: 2026-03-01**

**1. Architecture & Tech Stack**

**Frontend:** HTML5, CSS3 (Custom responsive scaling system), Vanilla JS (ES6)
**Templating:** EJS (Embedded JavaScript templates)
**Backend:** Node.js, Express.js
**Database:** None (Stateless, file-based content routing)
**Version Control:** Git / GitHub

**2. Database Schema**

*N/A - This project utilizes a stateless architecture. Product data (strains) and content are hardcoded into the EJS templates for maximum speed and SEO optimization. No external database is required.*

**3. API & Express Routes**

| **Method** | **Endpoint** | **Description** | **Auth Required** |
| --- | --- | --- | --- |
| **GET** | `/` | Renders index.ejs (Home) | No |
| **GET** | `/about` | Renders about.ejs (History/Story) | No |
| **GET** | `/cultivation`| Renders cultivation.ejs (Process) | No |
| **GET** | `/strains` | Renders strains.ejs (Genetic Library) | No |
| **GET** | `/retail` | Renders retail.ejs (Northern Legacy teaser) | No |
| **GET** | `/contact` | Renders contact.ejs (Form UI) | No |
| **POST** | `/contact` | Processes form, validates reCAPTCHA, triggers Nodemailer | No |
| **GET** | `*` | 404 Catch-all route | No |

**4. Backend Logic & Middleware**

**Middleware: Petition Scraper (`server.js`)**
- Intercepts incoming `GET` requests (excluding static assets).
- Uses `fetch` to request the Change.org petition URL.
- Uses Regex (`/"signatureCount":\s*(\d+)/`) to parse the live HTML and extract the count.
- Implements a 15-minute memory cache (`CACHE_DURATION = 15 * 60 * 1000`) to prevent rate-limiting.
- Injects `sigCount` into `res.locals` so it is globally available to all EJS views.

**Controller: Form Handler (`POST /contact`)**
- **Validation 1:** Checks for `req.body.honeypot`. If filled, silently drops request (Bot trap).
- **Validation 2:** Sends `recaptcha_token` to Google API. Rejects if score < 0.5.
- **Action:** Uses `nodemailer` to dispatch an HTML-formatted notification to the admin team (Greg & Jason) via Zoho SMTP.
- **Action:** Dispatches a branded auto-responder to the user's email based on `partnerType`.
- **Response:** Returns raw text strings (`'success'`, `'captcha_error'`, `'error'`) to be handled by frontend AJAX.

**5. Frontend Architecture**

**5.1. EJS Template Structure**
- `/views/partials/head.ejs`: Meta tags, CSS links, external scripts.
- `/views/partials/header.ejs`: Main navigation logic.
- `/views/partials/footer.ejs`: Legal disclaimers, global footer.
- `/views/*.ejs`: Individual page templates utilizing `<%- include() %>` for partials.

**5.2. Client-Side Scripts**
- `script.js`: Master initialization. Handles the SessionStorage Age Gate (`exg_age_verified`), mobile navigation toggles, and scroll-to-top collision detection.
- `header.js`: Listens to `window.scrollY` to trigger CSS class changes (transparent to black background) when passing the 50px threshold.
- `contact.js`: Intercepts contact form submission, requests reCAPTCHA token via `grecaptcha.execute()`, packages payload, and executes the asynchronous `fetch('/contact')` request. Handles UI state via dynamic modal popups.

**5.3. Styling Guidelines (CSS)**
- **Architecture:** Custom responsive scaling system adjusting the root `html` font-size using media queries (1rem = 12px on 4K, 1rem = 8px on Mobile).
- **Primary Colors:** `--bg-black`, `--signature-orange` (`#f8c25d`), `--fc-main` (`#f0f0f0`).
- **Typography:** 'Jost' (Body/Main), 'Times New Roman' (Headers), 'Montserrat' (Nav).

**6. Third-Party APIs & Integrations**

- **Change.org (Scraping)**
  - **Purpose:** Display live petition signatures.
  - **Implementation:** Node-fetch on backend.
- **Google reCAPTCHA (v3)**
  - **Purpose:** Invisible form spam protection.
  - **Implementation:** Frontend script generates token; backend validates via `https://www.google.com/recaptcha/api/siteverify`.
  - **Environment Variables:** `RECAPTCHA_SITE_KEY` (Client), `RECAPTCHA_SECRET_KEY` (Server).
- **Zoho Mail SMTP**
  - **Purpose:** Transactional email delivery.
  - **Implementation:** `nodemailer` transport configuration.
  - **Environment Variables:** `DIGITAL_LIASON_EMAIL`, `DIGITAL_LIASON_EMAIL_PASSWORD`, `GREGS_EMAIL`, `JASONS_EMAIL`.