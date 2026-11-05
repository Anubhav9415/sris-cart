# Vercel Multi-Service Deployment Guide

This project has been configured to deploy seamlessly to Vercel as a single project using **Vercel Services** (one deployment, unified domain, routing both frontend and backend).

---

## 1. Summary of Changes Made

| File | Changes Made |
| :--- | :--- |
| [`vercel.json`](file:///c:/Users/hp/Downloads/sris-cart-main%20(1)/sris-cart-main/vercel.json) | Created root configuration declaring `services`: `client` (Vite) and `server` (Express), with rewrites sending `/api/(.*)` & `/stripe` to `server` and `/(.*)` to `client`. |
| [`server/server.js`](file:///c:/Users/hp/Downloads/sris-cart-main%20(1)/sris-cart-main/server/server.js) | Exported `app` as default (`export default app;`) and wrapped `app.listen()` inside `if (!process.env.VERCEL)` so Vercel can run it as a serverless function handler. |
| [`client/src/services/api.ts`](file:///c:/Users/hp/Downloads/sris-cart-main%20(1)/sris-cart-main/client/src/services/api.ts) | Fallback `baseURL` to `""` (relative paths) so all API requests automatically use the same domain in production without CORS issues. |
| [`client/.env.example`](file:///c:/Users/hp/Downloads/sris-cart-main%20(1)/sris-cart-main/client/.env.example) | Added comments explaining local standalone vs unified deployment. |
| [`.gitignore`](file:///c:/Users/hp/Downloads/sris-cart-main%20(1)/sris-cart-main/.gitignore) | Added `.vercel` to ignore temporary deployment artifacts. |
| Removed obsolete configs | Deleted separate `client/vercel.json` and `server/vercel.json` to prevent conflicts. |

---

## 2. Commit and Push Changes

Run the following in your terminal to stage and push your changes to GitHub/GitLab:

```bash
git add .
git commit -m "Configure multi-service deployment for Vercel"
git push origin main
```

---

## 3. Deploy on Vercel

### Option A: Via Vercel Web Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository (`sris-cart-main` / `Portfolio`).
3. **Root Directory**: Keep as `./` (the root directory where `vercel.json` is located).
4. Vercel will automatically detect the `vercel.json` file and set up the multi-service project.
5. In **Environment Variables**, add the required environment variables (see list below).
6. Click **Deploy**.

### Option B: Via Vercel CLI
If you prefer deploying from your terminal using `vercel`:
```bash
# In the root project directory:
vercel
# For production deployment:
vercel --prod
```

---

## 4. Environment Variables to Set on Vercel

Go to **Project Settings > Environment Variables** on Vercel and add:

### Server Environment Variables:
- `MONGODB_URI`: Your MongoDB connection string (e.g., MongoDB Atlas).
- `JWT_SECRET`: Secret key for JWT generation.
- `ADMIN_EMAIL`: Admin email address.
- `ADMIN_PASSWORD`: Admin password.
- `CLOUDINARY_NAME`: Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.
- `STRIPE_SECRET_KEY`: Stripe secret key (`sk_...`).
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret (`whsec_...`).
- `GEMINI_API_KEY`: (Optional) If AI assistant/search is enabled.

### Client Environment Variables:
- `VITE_CURRENCY`: Currency symbol (e.g., `$` or `₹`).
- `VITE_BACKEND_URL`: Leave empty or do not set (defaults to `""` for unified same-domain routing).

---

## 5. Stripe Webhook Configuration (If using Stripe)
In your Stripe Dashboard -> Webhooks:
- Add endpoint URL: `https://<your-vercel-domain>/stripe`
- Select events: `payment_intent.succeeded` (or required checkout events).
- Copy the signing secret to `STRIPE_WEBHOOK_SECRET` in your Vercel Environment Variables.
