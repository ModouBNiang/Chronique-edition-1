import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';

const rootDir = process.cwd();

async function buildStandalone() {
  console.log('1. Building production bundle with Vite (IIFE format for file:// compatibility)...');

  // Ensure index.html is the clean Vite entry template before running Vite build
  const templateHtml = `<!doctype html>
<html lang="fr" class="dark bg-[#0c0d0e] text-[#f4f1ea] antialiased selection:bg-[#c89d66]/30 selection:text-[#f4f1ea]">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CHRONIQUE — ÉDITION N° 01 | Micro-Magazine Éditorial Interactif</title>
    <meta name="description" content="Micro-magazine éditorial interactif consacré à la direction artistique, au brutalisme poétique et aux univers visuels immersifs." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%230c0d0e'/%3E%3Crect x='4' y='4' width='56' height='56' fill='none' stroke='%23c89d66' stroke-width='1.5'/%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' fill='%23f4f1ea' font-family='Georgia, serif' font-size='34' font-style='italic'%3EC%3C/text%3E%3C/svg%3E" />
  </head>
  <body class="bg-[#0c0d0e] text-[#f4f1ea] overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(rootDir, 'index.html'), templateHtml, 'utf8');

  await build({
    base: './',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      cssCodeSplit: false,
      assetsInlineLimit: 100000000,
      rollupOptions: {
        output: {
          format: 'iife',
          name: 'ChroniqueApp',
          inlineDynamicImports: true,
          entryFileNames: 'assets/app.js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
  });

  const assetsDir = path.join(rootDir, 'dist', 'assets');
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find((f) => f.endsWith('.css'));
  const jsFile = files.find((f) => f.endsWith('.js'));

  if (!cssFile || !jsFile) {
    throw new Error('Could not find compiled CSS or JS in dist/assets');
  }

  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  const jsContent = fs
    .readFileSync(path.join(assetsDir, jsFile), 'utf8')
    .replace(/<\/script/gi, '<\\/script');

  // Build 100% self-contained HTML that works via double-click (file://) without any server
  const standaloneHtml = `<!doctype html>
<html lang="fr" class="dark bg-[#0c0d0e] text-[#f4f1ea] antialiased selection:bg-[#c89d66]/30 selection:text-[#f4f1ea]">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CHRONIQUE — ÉDITION N° 01 | Micro-Magazine Éditorial Interactif</title>
    <meta name="description" content="Micro-magazine éditorial interactif consacré à la direction artistique, au brutalisme poétique et aux univers visuels immersifs." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%230c0d0e'/%3E%3Crect x='4' y='4' width='56' height='56' fill='none' stroke='%23c89d66' stroke-width='1.5'/%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' fill='%23f4f1ea' font-family='Georgia, serif' font-size='34' font-style='italic'%3EC%3C/text%3E%3C/svg%3E" />
    <style>${cssContent}</style>
  </head>
  <body class="bg-[#0c0d0e] text-[#f4f1ea] overflow-x-hidden">
    <div id="root"></div>
    <script>${jsContent}</script>
  </body>
</html>`;

  // Write standalone HTML to:
  // 1. Root index.html (for direct double-click opening in file explorer)
  // 2. Root CHRONIQUE-Magazine.html (explicit standalone launcher file)
  // 3. dist/index.html
  fs.writeFileSync(path.join(rootDir, 'index.html'), standaloneHtml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'CHRONIQUE-Magazine.html'), standaloneHtml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'dist', 'index.html'), standaloneHtml, 'utf8');

  console.log('✓ Standalone local web application generated successfully!');
}

buildStandalone().catch((err) => {
  console.error(err);
  process.exit(1);
});
