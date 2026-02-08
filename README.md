# ChaiCode Authentication Template

> A production-ready, reusable authentication UI template built with **HTML + Tailwind CSS** for the ChaiCode Registry.

![Template Preview](https://via.placeholder.com/800x400/1e293b/3b82f6?text=Auth+Template+Preview)

---

## 🎯 Why This Template?

Authentication is a core feature of every web application. This template provides:
- **Pre-built UI screens** for all common auth flows
- **Modern dark theme** with professional aesthetics
- **Zero dependencies** - just HTML + Tailwind CSS
- **Easy customization** - swap colors, logos, and text
- **Mobile-first responsive design**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for Tailwind build)
- Any code editor

### Installation

```bash
# 1. Clone or download the repository
git clone <repo-url>
cd auth-template

# 2. Install dependencies
npm install

# 3. Build Tailwind CSS
npm run build:css

# 4. Start local server
npm run serve
```

### 🌐 Open in Browser
```
http://localhost:3000
```

### Development Mode
```bash
# Watch for CSS changes (auto-rebuild)
npm run dev
```

---

## 📂 Folder Structure

```
auth-template/
├── index.html                    # Landing page (page showcase)
│
├── templates/                    # 📄 HTML Templates
│   ├── auth/                     # 🔐 Core Authentication
│   │   ├── signin.html           # Sign In (email + password)
│   │   ├── signup.html           # Sign Up (registration form)
│   │   ├── forgot-password.html  # Request password reset
│   │   └── reset-password.html   # Set new password
│   │
│   ├── verify/                   # ✅ Verification Flows
│   │   ├── otp.html              # 6-digit OTP input
│   │   ├── magic-link-sent.html  # Email sent confirmation
│   │   └── magic-link-verified.html  # Success + redirect
│   │
│   └── account/                  # ⚙️ Account Management
│       ├── security.html         # Password & 2FA settings
│       ├── authenticator-setup.html  # QR code + backup codes
│       └── sessions.html         # Active sessions list
│
├── css/
│   ├── input.css                 # Source CSS (Tailwind directives)
│   └── styles.css                # Compiled CSS (auto-generated)
│
├── assets/
│   ├── icons/                    # SVG icons (31 icons)
│   └── logo/                     # Logo assets
│
├── tailwind.config.js            # Tailwind configuration
├── package.json                  # npm scripts
└── README.md                     # This file
```

---

## 📋 All Screens Included

### Core Authentication
| Screen | Path | Features |
|--------|------|----------|
| Sign In | `/templates/auth/signin.html` | Email/password, OAuth (Google, GitHub), Remember me |
| Sign Up | `/templates/auth/signup.html` | Full name, email, phone, password with validation |
| Forgot Password | `/templates/auth/forgot-password.html` | Email input, success/error states |
| Reset Password | `/templates/auth/reset-password.html` | New password + confirm, requirements hint |

### Verification
| Screen | Path | Features |
|--------|------|----------|
| OTP Verification | `/templates/verify/otp.html` | 6-digit input boxes, auto-focus, resend timer |
| Magic Link Sent | `/templates/verify/magic-link-sent.html` | Instructions, resend button |
| Magic Link Verified | `/templates/verify/magic-link-verified.html` | Success animation, auto-redirect |

### Account Security (Optional)
| Screen | Path | Features |
|--------|------|----------|
| Security Settings | `/templates/account/security.html` | Change password, 2FA toggle, recovery options |
| Authenticator Setup | `/templates/account/authenticator-setup.html` | QR code, manual key, backup codes |
| Session Management | `/templates/account/sessions.html` | Device list, sign out all sessions |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **Tailwind CSS v4** | Utility-first styling (npm build) |
| **Google Fonts (Inter)** | Modern typography |
| **CSS Animations** | Loading spinners, transitions |

### What's NOT Included (By Design)
- ❌ No JavaScript frameworks (React, Vue, etc.)
- ❌ No backend services or APIs
- ❌ No external UI libraries
- ✅ Minimal JS only for password toggle & OTP auto-focus

---

## 🎨 Design Decisions

### Visual Design
- **Dark Mode First** - Optimized for reduced eye strain
- **Split Layout** - Professional 50/50 split on desktop, stacks on mobile
- **Brand Panel** - Left side features logo with animated grid background
- **8px Grid System** - Consistent spacing throughout

### Accessibility
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Keyboard navigation on all interactive elements
- ✅ Visible focus indicators
- ✅ ARIA labels on buttons and inputs
- ✅ WCAG AA compliant color contrast

### User Experience
- Clear navigation between related screens
- Error states with helpful guidance
- Success feedback with green alerts
- Loading states with CSS animations
- Mobile-first responsive breakpoints

---

## 🎨 Customization Guide

### 1. Change Colors
Edit CSS variables in `css/input.css`:
```css
:root {
    --brand-primary: #3b82f6;    /* Your brand color */
    --brand-secondary: #2563eb;
    --bg-primary: #0f172a;       /* Dark background */
    --bg-secondary: #1e293b;
}
```
Then rebuild: `npm run build:css`

### 2. Replace Logo
Swap files in `assets/logo/`:
- `logo-dark.svg` - Used on dark backgrounds
- `logo.svg` - Used on light backgrounds

### 3. Change Font
Update Google Fonts import in each HTML file:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 4. Modify Text & Labels
- Edit placeholder text in HTML files
- Update form labels and validation hints
- Customize error/success messages

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640px - 1024px | Responsive padding |
| Desktop | > 1024px | 50/50 split layout |

---

## 🌐 Browser Support

| Browser | Versions |
|---------|----------|
| Chrome | Latest 2 |
| Firefox | Latest 2 |
| Safari | Latest 2 |
| Edge | Latest 2 |

---

## 📦 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run build:css` | Build Tailwind CSS (production) |
| `npm run dev` | Watch mode - auto-rebuild on changes |
| `npm run serve` | Start local server on port 3000 |

---

## 🔗 Page URLs (Local)

When running `npm run serve`:

| Page | URL |
|------|-----|
| Landing | http://localhost:3000 |
| Sign In | http://localhost:3000/auth/signin.html |
| Sign Up | http://localhost:3000/auth/signup.html |
| Forgot Password | http://localhost:3000/auth/forgot-password.html |
| Reset Password | http://localhost:3000/auth/reset-password.html |
| OTP Verification | http://localhost:3000/verify/otp.html |
| Magic Link Sent | http://localhost:3000/verify/magic-link-sent.html |
| Magic Link Verified | http://localhost:3000/verify/magic-link-verified.html |
| Account Security | http://localhost:3000/account/security.html |
| Authenticator Setup | http://localhost:3000/account/authenticator-setup.html |
| Sessions | http://localhost:3000/account/sessions.html |

---

## ✅ Submission Checklist

- [x] All core authentication screens
- [x] Verification flows (OTP + Magic Link)
- [x] Optional security features
- [x] Responsive design
- [x] Dark mode
- [x] Clean folder structure
- [x] Documentation
- [ ] Live demo URL (deploy to Vercel/Netlify)
- [ ] Screenshots

---

## 📄 License

MIT License - Free to use and modify.

---

**Built for ChaiCode Registry** | HTML + Tailwind CSS v4
