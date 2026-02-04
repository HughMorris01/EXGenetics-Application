# 🌿 ExGenetics Web Application

The official production web application for **ExGenetics** (dba Northern Legacy), a licensed-pending cannabis startup located in Upstate New York. This application serves as the primary digital storefront, providing information, compliance enforcement, and customer engagement channels.

**🌐 Live Site:** [exgenetics.com](https://exgenetics.com) *(Update URL if different)*

## 🚀 Key Commercial Features
* **Compliance Age Gate:** Implements strict age verification logic (21+) compliant with NYS regulations. Utilizes **Session Storage** to persist verification tokens without intruding on user privacy via persistent cookies.
* **Dynamic Templating:** Migrated from static HTML to **EJS (Embedded JavaScript)** to allow for modular headers, footers, and dynamic content updates without code duplication.
* **Secure Contact System:** Custom backend handling for customer inquiries, protecting internal email endpoints while ensuring reliable delivery.
* **Responsive Design:** Fully responsive layout optimized for mobile and desktop viewing.

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Templating Engine:** EJS
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Session Management:** Client-side Session Storage & Express Sessions

## ⚙️ Local Development Setup

If you need to run this application locally for development purposes:

### 1. Prerequisites
* Node.js (v14 or higher)
* npm (Node Package Manager)

### 2. Installation
```bash
git clone [https://github.com/HughMorris01/EXGenetics-Application.git](https://github.com/HughMorris01/EXGenetics-Application.git)
cd EXGenetics-Application
npm install