# Matrix Led - Screen Measurement Tool

*Đọc bằng [Tiếng Việt](README_VI.md)*

**Advanced Screen Measurement & Layout Verification**

Matrix Led is a precise, browser-based tool designed for developers and designers to measure screen dimensions, verify layouts, and inspect pixel-perfect alignments using rulers, guidelines, and custom shapes.

Live Demo: [http://matrix-led.surge.sh](http://matrix-led.surge.sh)

## Features

### 📏 Precision Measurement
- **Rulers**: Pixel-perfect rulers on all four edges (top, left, right, bottom) with markers at every 100px.
- **Real-time Dimensions**: Displays the current viewport width and height.
- **Fullscreen Mode**: Maximizes the tool for accurate measuring without browser UI interference.

### 📐 Layout Verification
- **Guidelines**: Toggle crosshair guidelines (vertical & horizontal) to check alignment.
- **Intersection Coordinates**: Automatically displays (x, y) coordinates where guidelines intersect.
- **Custom Markers**: Define specific X and Y points to highlight on the rulers and guidelines.

### 🎨 Creative Tools
- **Custom Shapes**: Draw and position rectangles with configurable color, size, and position.
- **Background Overlay**: Upload a reference image (design mockup) to overlay on your screen, adjust opacity, scale, and position for pixel-perfect comparison

### 💾 Workflow & Management
- **Presets**: Save up to 10 configurations (markers, shapes, guidelines) as named presets.
- **Import/Export**: Share configurations via JSON files - export individual presets or all at once.

## Usage

📘 **[User Guide / Manual](USER_GUIDE.md)** - Detailed instructions on how to use all features.

### Keyboard Shortcuts
| Key | Action |
| :--- | :--- |
| `G` | Toggle Guidelines |
| `S` | Open Settings Panel |
| `Esc` | Exit Fullscreen / Close Modals |

### Getting Started
1. Open the [Live Demo](http://matrix-led.surge.sh) or run locally.
2. Click **"Gét Gô"** to enter measurement mode (fullscreen recommended).
3. Use the **Settings (S)** panel to:
   - Add custom guideline markers (specific X/Y pixel coordinates).
   - Create custom shapes for measuring specific areas.
   - Upload an overlay image to compare with design mockups.
   - Save/load presets for different projects.

## Installation / Running Locally
This is a static web application (HTML/CSS/JS). No build step or dependencies required.

1. Clone or download this repository
2. Open `index.html` in your browser.

   *Optional: For best experience (avoiding CORS issues with local images), run with a local server:*
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

## Deployment

### Automatic Deployment to Cloudflare Pages
This project is configured to automatically deploy to Cloudflare Pages on every push to `main`.

📖 **[Complete Deployment Guide](DEPLOYMENT.md)** - Step-by-step instructions for:
- Cloudflare Pages + GitHub integration (recommended)
- GitHub Actions setup with API tokens
- Custom domain configuration
- Troubleshooting

**Quick Start:**
1. Connect your GitHub repo to Cloudflare Pages
2. Set production branch to `main`
3. Leave build settings empty
4. Done! Auto-deployment is active.

## Technologies
- HTML5
- CSS3 (Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- **No external framework dependencies**

## License
MIT
