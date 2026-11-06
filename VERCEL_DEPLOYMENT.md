# 🚀 Vercel Full-Stack Deployment Guide (Step-by-Step)

This project is configured as a **single unified full-stack Vercel deployment** with:
- **Frontend**: React + Vite + Tailwind SPA (served from `/client/dist`)
- **Backend**: Express + MongoDB Atlas + Cloudinary + Stripe (running as Vercel Serverless Function `/api`)
- **Single Domain**: Both frontend and backend share the same URL, meaning **zero CORS issues** and seamless authentication cookies!

---

## 📋 Step 1: Open Vercel Dashboard

1. Go to **[https://vercel.com/new](https://vercel.com/new)** and log in with your GitHub account.
2. In the list of GitHub repositories, find **`sris-cart`** (under `Anubhav9415/sris-cart`) and click **"Import"**.

---

## ⚙️ Step 2: Configure Project Settings

When the import screen opens:

1. **Project Name**: `sris-cart` *(or any name you like)*
2. **Framework Preset**: Leave as **`Other`** *(Vercel will automatically read `vercel.json`)*
3. **Root Directory**: Leave as **`./`** *(do NOT change it)*
4. **Build and Output Settings**: Leave at default *(automatically handled by `vercel.json`)*

---

## 🔑 Step 3: Add Environment Variables

Expand the **"Environment Variables"** section and add the following keys:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `MONGODB_URI` | *(From your server/.env)* | MongoDB Atlas database |
| `JWT_SECRET` | *(From your server/.env)* | Token encryption |
| `ADMIN_EMAIL` | `supportsriscart@gmail.com` | Admin login |
| `ADMIN_PASSWORD` | `admin123` | Admin password |
| `SELLER_EMAIL` | `supportsriscart@gmail.com` | Default seller |
| `SELLER_PASSWORD` | *(From your server/.env)* | Default seller password |
| `CLOUDINARY_NAME` | `sod1jmlo` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | *(From your server/.env)* | Cloudinary API key |
| `CLOUDINARY_SECRET_KEY` | *(From your server/.env)* | Cloudinary secret |
| `STRIPE_SECRET_KEY` | *(From your server/.env)* | Stripe payments |
| `VITE_CURRENCY` | `$` | Currency symbol |
| `VITE_BACKEND_URL` | *(leave empty)* | Same-domain routing |

---

## 🚀 Step 4: Click Deploy

1. Click the blue **"Deploy"** button.
2. Vercel will install dependencies, build the Vite frontend, bundle the serverless `/api` backend, and deploy your project in ~1-2 minutes!
3. You will get a live production URL like: **`https://sris-cart-xxxx.vercel.app`**.

---

## ⚡ Step 5: (Optional) Stripe Webhook Setup

If you want automatic order status updates when customers pay via Stripe:
1. Go to your **[Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/test/webhooks)**.
2. Click **"Add destination / endpoint"**.
3. Endpoint URL: `https://<YOUR-VERCEL-DOMAIN>.vercel.app/stripe`
4. Select event: `payment_intent.succeeded`
5. Reveal your **Signing Secret** (`whsec_...`) and add it to Vercel Environment Variables as `STRIPE_WEBHOOK_SECRET`.
