---

## ✅ Planned `README.md` Structure

1. **Project Title + Logo**
2. **One-liner Summary**
3. **Table of Contents**
4. **Project Overview (Non-technical intro)**
5. **Key Features (Buyer, Seller, Admin)**
6. **Screenshots (UI Previews)**
7. **Tech Stack Used**
8. **Project Architecture / Folder Structure**
9. **Setup Instructions (Run Locally)**
10. **Firebase Setup**
11. **Deployment**
12. **Contributing**
13. **License**
14. **Credits**
15. **Contact**

---

## ✅ Here's the complete and detailed `README.md` content:

```markdown
# ♻️ Preloved – Sustainable Second-Hand Marketplace

![Preloved Logo](https://via.placeholder.com/600x150/4CAF50/FFFFFF?text=Preloved)

![CI](https://github.com/Preloved-Team/PRELOVED-/actions/workflows/tests.yml/badge.svg)
![CodeQL](https://github.com/Preloved-Team/PRELOVED-/actions/workflows/codeql.yml/badge.svg)

## CI & QA
- CI runs tests with coverage and builds the app on every push/PR.
- Artifacts available in Actions: `coverage-report/` and `production-build/`.
- Security: CodeQL (code scanning) and Dependency Review (on PRs).

**Preloved** is a full-featured web marketplace for buying and selling second-hand goods. Designed with sustainability and community in mind, Preloved connects buyers, sellers, and administrators through a clean, intuitive, and secure platform.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Contact](#contact)

---

## 📖 About the Project

Preloved is a second-hand product marketplace that allows **buyers** to browse, save, message, and purchase items, **sellers** to list and manage their products and orders, and **admins** to oversee platform activity, earnings, and user accounts.

This project was built for educational and portfolio purposes to simulate a real-world, professional e-commerce application.

---

## 🌟 Key Features


### 👤 Buyer

- Easy signup/login with role detection
- Browse and search listings by category, price, and location
- Add items to wishlist
- Real-time chat with sellers (with product context)
- Submit reviews and ratings
- Secure checkout (Stripe/PayPal simulation)

### 🛍️ Seller

- Custom dashboard with sales analytics
- Create, edit, and delete listings
- View buyer orders and status
- Chat with buyers with contextual info
- Track order history

### 🛡️ Admin

- View total sales, refunds, and transactions
- Manage all users and disable accounts if needed
- View, remove, or moderate product listings
- Approve or reject refund requests
- Full chat access with buyer/seller for issue resolution

---

## 🖼️ Screenshots

---

## 🛠️ Tech Stack

- **Frontend:** React, Bootstrap, Tailwind CSS
- **Backend:** Firebase Firestore, Firebase Auth, Firebase Functions
- **Deployment:** Firebase Hosting
- **Additional:** Chart.js, Framer Motion, Toastify, React Router

---

## 📁 Folder Structure

```

preloved/
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # Auth and global contexts
│   ├── pages/               # All route-level pages
│   ├── firebaseConfig.js    # Firebase initialization
│   └── App.js / index.js    # App entry points
├── .firebaserc              # Firebase settings
├── firebase.json            # Firebase hosting config
├── package.json             # Project metadata
└── README.md

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Firebase CLI

### Installation

```bash
git clone https://github.com/your-username/preloved.git
cd preloved
npm install
````

### Start Development Server

```bash
npm start
```

Visit `http://localhost:3000`

---

## 🔥 Firebase Setup

1. Create a Firebase project on [Firebase Console](https://console.firebase.google.com/)
2. Enable:

   * Authentication (Email/Password)
   * Firestore Database
   * Firebase Storage
3. Replace `firebaseConfig.js` values with your credentials:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};
```

4. Set Firestore rules (in Firestore tab):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // More rules in project repo
  }
}
```

---

## 🌐 Deployment (Firebase Hosting)

```bash
npm run build
firebase login
firebase init
firebase deploy
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

### To contribute:

* Fork the repo
* Create a feature branch: `git checkout -b feature/your-feature`
* Commit changes: `git commit -m "Add your message"`
* Push to branch: `git push origin feature/your-feature`
* Open a pull request

---

## 🙌 Credits

Built with ❤️ by students at Otago Polytechnic

* Arsh Vhora (Buyer Section Lead, GitHub Project, Database)
* Shubham (Admin & Database)
* Sehbaj (Seller & UI)

---

## 📬 Contact

Have questions or feedback?

📧 Email: vhoraarsh91@gmail.com
🔗 GitHub: 
🌐 Host: 

---

```
"<!-- chore: trigger CodeQL on main -->" 
