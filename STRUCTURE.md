# 📁 Complete Project File Structure

## Full Directory Structure

```
mohamedayad-portfolio/
├── index.html
├── README.md
├── SETUP.md
├── CUSTOMIZATION.md
│
├── css/
│   ├── variables.css
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── form-handler.js
│   └── animations.js
│
├── assets/
│   └── images/
│       ├── profile.jpg
│       ├── favicon.ico
│       └── apple-touch-icon.png
│
└── documents/
    └── Mohamed_Mahmoud_Ayad_Resume.pdf
```

## File Descriptions

### Root Level Files

| File | Purpose | Type |
|------|---------|------|
| `index.html` | Main page with all sections | HTML |
| `README.md` | Project documentation | Markdown |
| `SETUP.md` | Setup and installation guide | Markdown |
| `CUSTOMIZATION.md` | Customization instructions | Markdown |

### CSS Files (`/css`)

| File | Lines | Purpose |
|------|-------|----------|
| `variables.css` | ~150 | CSS custom properties, themes, spacing, colors |
| `style.css` | ~850 | Main styles for all components |
| `animations.css` | ~400 | Animation keyframes and effects |
| `responsive.css` | ~550 | Media queries and responsive design |

**Total CSS: ~1950 lines**

### JavaScript Files (`/js`)

| File | Lines | Purpose |
|------|-------|----------|
| `main.js` | ~250 | Core functionality, navigation, scroll effects |
| `form-handler.js` | ~200 | Form validation and submission |
| `animations.js` | ~400 | Advanced animation features |

**Total JavaScript: ~850 lines**

### Assets (`/assets`)

#### Images (`/assets/images`)

| File | Size | Purpose |
|------|------|----------|
| `profile.jpg` | ~200KB | Profile picture |
| `favicon.ico` | ~5KB | Browser tab icon |
| `apple-touch-icon.png` | ~10KB | iOS bookmark icon |

### Documents (`/documents`)

| File | Size | Purpose |
|------|------|----------|
| `Mohamed_Mahmoud_Ayad_Resume.pdf` | ~200KB | Downloadable CV |

## Code Statistics

- **Total Files**: 10+
- **HTML**: ~500 lines
- **CSS**: ~1950 lines
- **JavaScript**: ~850 lines
- **Total Code**: ~3300 lines
- **No Build Tools**: Pure HTML/CSS/JS
- **No Dependencies**: Just AOS library (included via CDN)

## Loading Order

### CSS (in head)
1. `variables.css` - Sets up custom properties
2. `style.css` - Main styles
3. `animations.css` - Animation definitions
4. `responsive.css` - Media queries

### JavaScript (before closing body)
1. `AOS library` - From CDN
2. `main.js` - Core functionality
3. `animations.js` - Advanced features
4. `form-handler.js` - Form handling

## File Size Summary

```
index.html          ~30 KB
css/variables.css   ~8 KB
css/style.css       ~35 KB
css/animations.css  ~15 KB
css/responsive.css  ~20 KB
js/main.js          ~12 KB
js/form-handler.js  ~10 KB
js/animations.js    ~18 KB
---
Total CSS           ~78 KB
Total JS            ~40 KB
Total HTML          ~30 KB
```

## How to Use This Structure

### 1. Setup Files Locally
```
Your-Folder/
├── index.html
├── css/
│   ├── variables.css
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── form-handler.js
│   └── animations.js
└── assets/
    └── images/
        ├── profile.jpg
        └── favicon.ico
```

### 2. Open with VS Code
```bash
code .
```

### 3. Use Live Server
- Right-click `index.html`
- Select "Open with Live Server"

### 4. View in Browser
- Opens at `localhost:5500`
- Automatic refresh on changes

## Important File Paths in Code

### CSS Imports (in index.html)
```html
<link rel="stylesheet" href="./css/variables.css" />
<link rel="stylesheet" href="./css/style.css" />
<link rel="stylesheet" href="./css/animations.css" />
<link rel="stylesheet" href="./css/responsive.css" />
```

### JavaScript Imports (at end of body)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
<script src="./js/main.js"></script>
<script src="./js/animations.js"></script>
<script src="./js/form-handler.js"></script>
```

### Image Paths
```html
<img src="./assets/images/profile.jpg" alt="Profile" />
```

### Document Paths
```html
<a href="./documents/Mohamed_Mahmoud_Ayad_Resume.pdf" download>
  Download CV
</a>
```

## Notes

- All paths are relative, so maintain the folder structure
- Don't modify file names unless you update references
- CSS variables in `variables.css` are used throughout all CSS files
- Responsive queries are mobile-first, then breakpoints at 768px and 480px
- JavaScript has no external dependencies except AOS (from CDN)
