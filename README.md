# Creator Platform (MERN Stack Assignment)

A full-stack Creator Platform with two core modules:

1. **AI-Powered Content Assistant** (via OpenAI API)
2. **Instagram Analytics Dashboard** (Simulated with charts)

---

## 🚀 Tech Stack

* **Frontend**: React.js + TailwindCSS + Recharts
* **Backend**: Node.js + Express
* **Database**: MongoDB (via Mongoose)
* **Authentication**: JWT (Login/Protected Routes)
* **AI Integration**: OpenAI GPT-3.5 (mocked)

---

## ✨ Features

### Module 1: Content Assistant

* Form to input topic + niche
* Calls OpenAI (mocked for demo)
* Displays: Reel Idea, Caption, Hook, Hashtags
* Saves to MongoDB ("Content Bank")
* View/Delete saved ideas

### Module 2: Instagram Analytics

* Line chart of 7-day follower growth
* Bar chart of likes + comments (5 posts)
* Shows best time to post
* Upload new JSON file to replace analytics
* Export analytics to CSV and PDF

### Authentication

* Register/Login using email & password
* JWT token saved in `localStorage`
* Protected routes (Content + Analytics)
* Logout from Navbar

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/creator-platform.git
cd creator-platform
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` in `/server`:

```env
OPENAI_API_KEY=your_key
MONGODB_URI=mongodb://localhost:27017/creator-platform
JWT_SECRET=your_jwt_secret
```

Start server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm start
```

### 4. Access the App

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)

---
