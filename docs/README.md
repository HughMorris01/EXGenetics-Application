# 📑 Project Documentation & Strategy

This directory contains the core planning and quality assurance documents that guide the development of the **Excelsior Genetics** informational platform. Following a "Documentation-First" approach ensures that all stakeholder requirements are met with technical precision and verified through rigorous testing.

---

## 📋 The Triple-Doc Protocol

### 1. [Product Requirements Document (PRD)](./01-prd.md)
**The "What" and "Why"** This document outlines the business case, target audience, and high-level functional requirements. It serves as the single source of truth for the project's scope, aiming to build brand legitimacy and drive community action.

### 2. [Technical Design Document (TDD)](./02-tdd.md)
**The "How"** A deep dive into the stateless Node.js architecture. This includes:
* **Backend Architecture:** Express.js routing and middleware configurations.
* **Templating Strategy:** Server-side rendering utilizing EJS for performance and SEO optimization.
* **Integrations:** Automated Node-fetch web scraping (Change.org), Zoho SMTP email delivery via Nodemailer, and Google reCAPTCHA v3 implementation.

### 3. [Testing & Quality Assurance (UAT)](./03-uat-plan.md)
**The "Proof"** The final validation phase. This document tracks individual test cases across core features like the age gate, contact portal validations, petition scraper accuracy, and responsive design layouts, complete with screenshot evidence to ensure a flawless deployment.

---

> **Note to Stakeholders:** These documents are live files and should be updated throughout the application's lifecycle to reflect any new features or integration modifications.