# Eekee

A full-stack application with a Next.js frontend and a FastAPI backend.

---

## Deployment URLs

- **Frontend:** [ekkee.vercel.app](https://ekkee.vercel.app)
- **Backend:** [ekkee.onrender.com](https://ekkee.onrender.com)

---

## Project Structure

```
ekkee/
  backend/    # FastAPI backend
  frontend/   # Next.js frontend
```

---

## Backend Setup (FastAPI)

### Prerequisites

- Python 3.8+

### Installation

1. **Clone the repository** and navigate to the backend directory:
   ```bash
   cd ekke/backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # On Windows: myenv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Firebase Credentials:**
   - Place your Firebase service account JSON file at `backend/credentials.json` **and** set the environment variable `FIREBASE_CRED` to the path of your credentials file.
   - You may also use a `.env` file to set `FIREBASE_CRED`. You need this if you are deploying. When you upload the credentials.json file to render. The path will be  `/etc/secrets/credentials.json`


5. **Run the server:**
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at [http://localhost:8000](http://localhost:8000).

---

## Frontend Setup (Next.js)

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd ekkee/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

### Backend

- `FIREBASE_CRED`: /etc/secrets/credentials.json

### Frontend

`NEXT_PUBLIC_API_URL`="https://ekkee.onrender.com"

---

## Scripts

### Backend

- `uvicorn main:app --reload` — Start FastAPI server in development mode.

### Frontend

- `dev` — Start Next.js development server
- `build` — Build for production
- `start` — Start production server
- `lint` — Run ESLint

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** FastAPI, Firebase Admin SDK

---
