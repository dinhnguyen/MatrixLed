# Deployment Guide

This document explains how to set up automatic deployment to Cloudflare Pages when you commit to the `main` branch.

## 🚀 Method 1: Cloudflare Pages + GitHub Integration (Recommended)

This is the easiest method - no coding required!

### Setup Steps:

1. **Go to Cloudflare Dashboard**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages**

2. **Create a new Pages project**
   - Click **Create application** > **Pages** > **Connect to Git**
   - Authorize GitHub access if prompted
   - Select this repository from the list

3. **Configure build settings**
   ```
   Production branch:        main
   Build command:            (leave empty)
   Build output directory:   /
   ```

4. **Deploy**
   - Click **Save and Deploy**
   - Wait for the first deployment to complete

### ✅ Done!
From now on, every push to `main` will automatically trigger a new deployment.

### Custom Domain (Optional)
- Go to your Pages project > **Custom domains**
- Add your domain (e.g., `matrix-led.yourdomain.com`)
- Follow the DNS setup instructions

---

## 🚀 Method 2: GitHub Actions (More Control)

This method uses GitHub Actions for deployment. Already configured in `.github/workflows/deploy.yml`.

### Setup Steps:

#### 1. Get Cloudflare Credentials

**Get Account ID:**
- Go to [dash.cloudflare.com](https://dash.cloudflare.com)
- Click on **Workers & Pages** in the sidebar
- Copy your **Account ID** from the right sidebar

**Create API Token:**
- Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
- Click **Create Token**
- Use the **Edit Cloudflare Workers** template, or create a custom token with:
  - **Permissions:**
    - `Account` > `Cloudflare Pages` > `Edit`
  - **Account Resources:**
    - Include > Your Account
- Click **Continue to summary** > **Create Token**
- **Copy the token** (you won't see it again!)

#### 2. Add GitHub Secrets

- Go to your GitHub repository
- Navigate to **Settings** > **Secrets and variables** > **Actions**
- Click **New repository secret** and add:

  **Secret 1:**
  - Name: `CLOUDFLARE_API_TOKEN`
  - Value: (paste the API token from step 1)

  **Secret 2:**
  - Name: `CLOUDFLARE_ACCOUNT_ID`
  - Value: (paste your account ID)

#### 3. Create Cloudflare Pages Project

You need to create the project first (can be empty):
- Go to Cloudflare Dashboard > **Workers & Pages**
- Click **Create application** > **Pages** > **Connect to Git** (or use Wrangler CLI)
- Name it: `matrix-led` (or update `projectName` in `deploy.yml`)

#### 4. Push to Main

```bash
git add .
git commit -m "Setup Cloudflare Pages deployment"
git push origin main
```

The GitHub Action will automatically deploy your site!

---

## 🔍 Verify Deployment

After deployment completes:
1. Go to your Cloudflare Pages project
2. Click on the latest deployment
3. Click **Visit site** to see your live website

---

## 📝 Notes

- **Build time:** Since this is a static site with no build step, deployment is very fast (usually < 30 seconds)
- **Branch deployments:** Cloudflare Pages automatically creates preview deployments for other branches
- **Rollback:** You can rollback to any previous deployment from the Cloudflare dashboard

---

## 🐛 Troubleshooting

**Deployment fails with "Project not found":**
- Make sure the `projectName` in `deploy.yml` matches your Cloudflare Pages project name

**API Token errors:**
- Verify your API token has the correct permissions
- Check that the token hasn't expired
- Make sure secrets are correctly named in GitHub

**Need help?**
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
