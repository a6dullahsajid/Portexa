# 🌐 Portexa - Portfolio Builder App

**Portexa** is a modern web application that allows users to create, customize, and publish beautiful personal portfolios with ease. Built using **Next.js**, **Next Auth**,**Redux Toolkit**, **Firebase**, and **Cloudinary**, it offers a smooth user experience and flexible customization for developers and creatives alike.

> 🔗 Live Demo - [LView](https://portexa.vercel.app/) 
> 🛠️ Built & maintained by [@a6dullahsajid](https://github.com/a6dullahsajid)

---

## ✨ Features

- 🔐 **Authentication**
  - Login with **Google** or **GitHub** using NextAuth
- 🧾 **Multi-Step Portfolio Form**
  - Add personal info, skills, experience, projects, and contact details
- 🖼️ **Image Upload**
  - Upload profile image directly to **Cloudinary**
- 💾 **Data Persistence**
  - Form data saved securely in **Firebase Firestore**
- 🌐 **Public Preview**
  - Dynamic portfolio pages with unique URLs
- 🧠 **State Management**
  - Centralized state with **Redux Toolkit**
- 🎯 **Responsive Design**
  - Built with **Tailwind CSS** for modern, mobile-friendly layouts

---

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: Firebase Firestore
- **State Management**: Redux Toolkit
- **Image Upload**: Cloudinary
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/a6dullahsajid/Portexa.git
cd Portexa
```

2. **Install dependencies**
```bash
npm install
```

3.**env.local**
```env.local
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Firebase URI
FIREBASE_URI=your_firebase_uri

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=portexa
```
4.**Run the app**
```bash
npm run dev
```

