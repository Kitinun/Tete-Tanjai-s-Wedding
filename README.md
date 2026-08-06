# 💍 Tete & Tanjai - Wedding Invitation

A beautiful, performant, and interactive wedding invitation web application inspired by elegant Canva designs. Built with modern web technologies, this project features real-time RSVP tracking and a live guestbook powered by Google Sheets.

## ✨ Features

- **Elegant Design:** Smooth scroll, masonry layouts, and frosted glass effects.
- **Smooth Animations:** Powered by `framer-motion` for delightful user interactions (fade-ins, pop-layouts, scrolling text).
- **Real-time Guestbook (สมุดอวยพร):** Guests can leave well wishes. The UI displays up to 6 wishes at a time, randomly cycling through them every 5 seconds to keep the board fresh and engaging.
- **RSVP System:** Guests can confirm their attendance. A live counter displays the total number of confirmed guests instantly.
- **Optimistic UI:** Lightning-fast form submissions (fire-and-forget) without waiting for slow server responses.
- **Global Pre-fetching:** Data is fetched instantly upon site load via React Context (`WeddingDataContext`), providing a seamless zero-wait experience when scrolling to interactive sections.
- **Google Sheets Backend:** No traditional database required! All data is securely stored and fetched from a Google Sheet via Google Apps Script.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React, App Router, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database:** Google Apps Script + Google Sheets

## 🚀 Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
# or
yarn install
```

### 2. Google Sheets Setup (Database)

To make the RSVP and Guestbook work, you need to set up a Google Sheet:
1. Create a new Google Sheet.
2. Create two tabs (sheets) exactly named:
   - `Guestbook` (Columns: Timestamp, Name, Message)
   - `RSVP` (Columns: Timestamp, Name, Guests, Attendance)
3. Go to **Extensions > Apps Script**.
4. Paste your script that includes both `doPost(e)` (for saving data) and `doGet(e)` (for fetching wishes and RSVP total).
5. Click **Deploy > New Deployment**.
6. Set **Who has access** to **Anyone**.
7. Copy the generated **Web App URL**.

### 3. Environment Variables

Create a `.env.local` file in the root of your project and add your Google Apps Script URL:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your_script_id/exec
```

### 4. Running the Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

This application can be easily deployed on Vercel, Netlify, or any hosting service that supports Next.js.
Make sure to add the `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` environment variable in your hosting provider's dashboard before deploying.

```bash
npm run build
npm start
```

---
*Crafted with ❤️ for Tete & Tanjai's special day.*
