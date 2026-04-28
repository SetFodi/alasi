# Alasi Premium Awnings - Static Frontend

This project is the production-ready static frontend for the Alasi Awnings website. It has been completely decoupled from the original React/Babel development prototype, ensuring fast load times and clean, modular code.

## Current State of the Codebase
- **Production-Ready (Static)**: Yes! The code uses pure, lightweight Vanilla HTML, CSS, and JS. The 3D Awning Visualizer relies on Google's highly performant `<model-viewer>` component. The styles are managed via native CSS Variables.
- **Odoo Integration**: Not yet. If the goal is to make these sections editable via the Odoo Website Builder, the HTML chunks in `index.html` will need to be converted into Odoo **QWeb Snippets**.

## How to Run This Locally

Because the site loads external 3D models (`.glb` files) and textures, you cannot simply double-click the `index.html` file to open it in your browser (you will run into CORS security errors). 

You must run it via a local web server. You can do this in one of three ways:

### 1. Using VS Code (Easiest)
If you use VS Code, install the **Live Server** extension. 
Right-click on `index.html` and select **"Open with Live Server"**.

### 2. Using Python (Terminal)
Open your terminal in this directory and run:
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080` in your browser.

### 3. Using Node.js (Terminal)
If you have Node.js installed, you can use `npx serve`:
```bash
npx serve .
```
Then visit the URL it provides (usually `http://localhost:3000`).
