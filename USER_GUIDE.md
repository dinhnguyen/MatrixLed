# User Guide - Matrix Led

**Matrix Led** is a powerful screen measurement and layout verification tool. This guide covers all features and how to use them effectively.

## 🚀 Getting Started

1.  **Launch**: Open the application.
2.  **Start**: Click the **"Gét Gô"** button on the welcome screen.
3.  **Fullscreen**: The app will attempt to enter fullscreen mode for the most accurate measurements. You can exit fullscreen at any time using `Esc`.

## 🛠 Features in Detail

### 1. Measurement Rulers
- Rulers are displayed on all four sides of the screen (Top, Left, Right, Bottom).
- Markers at every 100px help you measure distances accurately.
- Custom marker positions are highlighted with labels on the rulers.

### 2. Guidelines (Crosshairs)
- **Toggle**: Click the **Guidelines** icon in the toolbar or press `G`.
- **Intersections**: Where horizontal and vertical guidelines meet, the exact `(x, y)` coordinates are displayed.
- **Configuration**: You can add specific X and Y coordinates for guidelines in the Settings panel.

### 3. Custom Shapes
Create rectangles to verify element sizes and spacing.
- **Add**: Open Settings (`S`) > **Shapes** tab > Fill in the form > Click **Add New Shape**.
- **Edit**: You can modify any existing shape:
    - **Name/Label**: For easy identification.
    - **Color**: Choose a color to contrast with your background.
    - **Dimensions**: X, Y position and Width (W), Height (H) in pixels.
- **Display**: Each shape shows its position coordinates and dimensions on screen.
- **Delete**: Remove shapes you no longer need using the Delete button.

### 4. Background Overlay (Mockup Comparison)
Overlay a design mockup to pixel-peep and verify implementation accuracy.
- **Upload**: Settings (`S`) > **Overlay** tab > Select an image file (PNG, JPG, etc.).
- **Drag**: Click and drag the overlay image to position it anywhere on screen.
- **Controls**:
    - **Opacity**: Adjust transparency to see both the overlay and content beneath it.
    - **Scale**: Resize the overlay if the resolution doesn't match 1:1 with your viewport.
    - **Lock**: Enable to prevent accidental movement while measuring.
    - **Reset Position**: Return the overlay to `(0,0)` coordinates.
    - **Clear Image**: Remove the overlay completely.

### 5. Presets Management
Save your workspace setups for different projects or screen sizes.
- **10 Preset Slots**: The app provides 10 preset slots to store different configurations.
- **Save**: Click **Save** on any slot to store your current setup (markers, shapes, guideline settings).
- **Load**: Click **Load** to restore a previously saved configuration.
- **Rename**: Edit the preset name directly in the input field.
- **Delete**: Remove unwanted presets to free up slots.
- **Import/Export**:
    - **Export**: Export individual presets as JSON files to share with colleagues.
    - **Import**: Import preset files into any available slot.
    - **All Presets**: Backup or restore your entire preset collection.

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `G` | Toggle Guidelines on/off |
| `S` | Open Settings Panel |
| `Esc` | Exit Fullscreen / Close any open modal (Settings or User Guide) |

## ❓ FAQ

**Q: Why does the app go fullscreen?**
A: Browser toolbars and UI elements can throw off measurements. Fullscreen ensures `window.innerHeight` and `window.innerWidth` reflect the actual screen real estate for pixel-perfect accuracy.

**Q: Where is my data saved?**
A: All data (presets, settings) is saved in your browser's `localStorage`. Clearing browser data will reset your presets unless you export them first.

**Q: Can I use this tool without fullscreen mode?**
A: Yes, you can exit fullscreen anytime with `Esc`. The tool will continue to work, but measurements will include browser UI elements.

**Q: How do I share my configurations with others?**
A: Use the Export feature in the Presets tab to save your configuration as a JSON file. Others can import this file to replicate your setup.

**Q: Can I drag the overlay image?**
A: Yes! Simply click and drag the overlay image to reposition it. Use the Lock checkbox to prevent accidental movement.
