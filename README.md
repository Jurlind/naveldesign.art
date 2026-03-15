# Navel Design - Artan Basha Portfolio

A multilingual website for master furniture craftsman Artan Basha, built with Astro and managed with Decap CMS.

## Features

- **Multilingual Support**: English, Albanian, German, and Italian
- **Easy Content Management**: Decap CMS for non-technical content updates
- **Responsive Design**: Mobile-friendly design
- **Static Site**: Hosted on GitHub Pages for free
- **Direct Contact Info**: Email, phone, and social media links
- **Automatic Deployment**: GitHub Actions for CI/CD

## Languages

- 🇬🇧 English
- 🇦🇱 Albanian (Shqip)
- 🇩🇪 German (Deutsch)
- 🇮🇹 Italian (Italiano)

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub account

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/naveldesign.art.git
   cd naveldesign.art
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update Configuration**

   - **GitHub (Decap CMS)**
     - Update `/public/admin/config.yml` with your repository:
       ```yaml
       repo: YOUR_USERNAME/naveldesign.art
       ```

   - **Domain Setup (optional)**
     - Update `.github/workflows/deploy.yml` with your domain:
       ```yaml
       cname: yourdomain.com
       ```

4. **Development**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

5. **Build**
   ```bash
   npm run build
   ```

### Deploying to GitHub Pages

1. **Create GitHub Repository**
   - Create a new public repository named `naveldesign.art` (or your domain)

2. **Push Code**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/naveldesign.art.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`

4. **Custom Domain (Optional)**
   - Go to Settings → Pages
   - Add your domain in "Custom domain"
   - Update DNS records with GitHub's provided IP addresses

### Content Management

#### Using Decap CMS (Recommended)

1. Visit `yourdomain.com/admin` (replace with your domain)
2. Authenticate with GitHub
3. Edit pages and portfolio items in any language
4. Changes auto-save and trigger automatic deployment

#### Manual Content Editing

Edit `.md` files in `src/content/[LOCALE]/`:
- `en/` - English
- `sq/` - Albanian
- `de/` - German
- `it/` - Italian

Files:
- `about.md` - About page
- `portfolio.md` - Portfolio overview
- `contact.md` - Contact page information

### File Structure

```
naveldesign.art/
├── src/
│   ├── pages/              # Route pages
│   ├── layouts/            # Page layouts
│   ├── components/         # Reusable components
│   ├── content/            # Markdown content by language
│   │   ├── en/
│   │   ├── sq/
│   │   ├── de/
│   │   └── it/
│   └── i18n/              # Translations
├── public/
│   ├── admin/             # Decap CMS admin
│   └── images/            # Uploaded images
├── .github/
│   └── workflows/         # GitHub Actions
└── astro.config.mjs       # Astro configuration
```

### Adding New Portfolio Items

**Via Decap CMS:**
1. Go to `yourdomain.com/admin`
2. Click "Portfolio Items"
3. Click "New Portfolio Item"
4. Fill in details for each language
5. Upload image
6. Save

**Manually:**
Create new `.md` files in `src/content/portfolio/[LOCALE]/`:
```markdown
---
title: "Piece Name"
description: "Brief description"
image: "https://url-to-image.jpg"
featured: true
category: "Furniture"
---

Detailed information about the piece...
```

### Customization

#### Colors
Edit `src/layouts/BaseLayout.astro` - CSS variables:
```css
--color-primary: #2c2416;
--color-secondary: #6b5b4a;
--color-light: #f5f1ed;
--color-accent: #c4a574;
```

#### Contact Information
Update contact details in:
- `src/content/[LOCALE]/contact.md` - For page content
- `src/pages/[locale]/contact.astro` - For contact page structure

#### Social Media
Update links in `src/pages/[locale]/contact.astro`

## Troubleshooting

### Decap CMS Login Issues
- Ensure GitHub OAuth is configured correctly
- Check repository access permissions
- Clear browser cache and try again

### Build Failures
- Run `npm install` to ensure dependencies are up-to-date
- Check for syntax errors in `.md` files
- View GitHub Actions logs for detailed error messages

## Maintenance

### Regular Tasks
- Update portfolio items as new work is completed
- Review contact form submissions
- Monitor website analytics
- Keep dependencies updated (npm update)

### Security
- Keep GitHub token secure
- Review Formspree privacy settings
- Monitor for unusual activity in CMS

## Support & Resources

- **Astro Docs**: https://docs.astro.build
- **Decap CMS Docs**: https://decapcms.org
- **Formspree Docs**: https://formspree.io
- **GitHub Pages**: https://pages.github.com

## License

All content is property of Artan Basha. Website code is available under MIT license.

---

Built with Astro, Decap CMS, and GitHub Pages.
