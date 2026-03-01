![Excelsior Dashboard Collage](./docs/media/github_collage.png)

# 🌿 Excelsior Genetics | Brand Platform

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=ejs&logoColor=white)](#)
[![Testing](https://img.shields.io/badge/UAT-Passing-success?style=for-the-badge)](#)

> **Deep Roots. Higher Standards.** A high-performance, server-side rendered web application establishing brand legitimacy and rallying community support for the 1000 Islands' premier legacy cannabis operator.

**🌐 Live Site:** [https://www.exgenetics.com](https://www.exgenetics.com)

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#%EF%B8%8F-tech-stack--architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Testing & QA](#-testing--qa)
- [Project Documentation](#-project-documentation)
- [Contact](#-contact)

---

## 🎯 About the Project

**The Problem:** Excelsior Genetics is experiencing extended administrative delays in securing their New York State cannabis license. They need a robust digital footprint to legitimize their brand, showcase their 20-year cultivation expertise, and rally local community support to pressure state officials.

**The Solution:** An informational Node.js/Express web application utilizing server-side rendered EJS templates. It features a deep-dive into their cultivation science, a secure partnership contact portal, and a custom backend web scraper that fetches live petition signatures to drive political leverage.

---

## ✨ Key Features

* 📊 **Dynamic Petition Scraper:** Custom Node.js middleware that scrapes Change.org in real-time, injecting live signature counts directly into the UI.
* 🤝 **Partnership Portal:** A secure, AJAX-driven contact form utilizing Google reCAPTCHA v3 to prevent spam, and Nodemailer (via Zoho SMTP) for automated lead-routing.
* ⚡ **Stateless Architecture:** Highly optimized, file-based content routing using EJS templates for lightning-fast page loads without the overhead of a database.
* 🔞 **Session-Based Age Gate:** A seamless 21+ verification wall that locks scrolling and stores consent in `sessionStorage` to prevent intrusive popups on subsequent page loads.

---

## 🛠️ Tech Stack & Architecture

**Frontend:**
* HTML5 & CSS3 (Custom fluid typography scaling system)
* Vanilla JavaScript (ES6)
* EJS (Embedded JavaScript Templating)

**Backend:**
* Node.js & Express.js
* Nodemailer (Zoho SMTP integration)
* Node-Fetch (HTML Scraping & DOM Parsing)

**Security & Deployment:**
* Google reCAPTCHA v3
* AWS Lightsail / Vercel Serverless

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm or yarn

### Installation

1. **Clone the repo**
   ```sh
   git clone [https://github.com/HughMorris01/excelsior_genetics.git](https://github.com/HughMorris01/excelsior_genetics.git)
   ```
2. **Install NPM packages**
   ```sh
   cd excelsior_genetics
   npm install
   ```
3. **Set up Environment Variables** (See below)
4. **Run the development server**
   ```sh
   npm start
   ```
   The application will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

To fully run this project locally (specifically the contact form), you will need to add the following environment variables to a `.env` file in the root directory.

```env
PORT=3000
HI_EMAIL=your_zoho_email@exgenetics.com
HI_EMAIL_PASSWORD=your_zoho_app_password
GREGS_EMAIL=admin1@example.com
JASONS_EMAIL=admin2@example.com
RECAPTCHA_SECRET_KEY=your_google_recaptcha_secret
```

---

## 🧪 Testing & QA

Quality assurance is integrated into the development lifecycle. A rigorous manual User Acceptance Testing (UAT) protocol ensures all core features (Age Gate, API integrations, Web Scraper, Form validations) function flawlessly across multiple viewports.

*View the full [UAT Protocol & Evidence](./docs/03-uat-plan.md).*

---

## 📂 Project Documentation

This project follows a strict Software Development Life Cycle (SDLC) using a Documentation-First approach. Comprehensive documentation, including the Product Requirements Document (PRD) and Technical Design Document (TDD), can be found in the `/docs` directory.

👉 **[View the complete Documentation Guide](./docs/README.md)**

---

## 📞 Contact

**Greg Farrell** - Full-Stack MERN Developer & QA Engineer  
[LinkedIn Profile](https://www.linkedin.com/in/gregory-farrell) | [Portfolio Website](https://your-portfolio.com)

Project Link: [https://github.com/HughMorris01/excelsior_genetics](https://github.com/HughMorris01/excelsior_genetics)