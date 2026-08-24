import { generatePortfolioHTML } from './generatePortfolioHTML';

/**
 * Opens the portfolio in a new window and triggers the browser's print dialog.
 * User selects "Save as PDF" to get their PDF.
 */
export function downloadPortfolioAsPDF(portfolioData, themeId) {
  // Generate the HTML with an injected auto-print script
  const html = generatePortfolioHTML(portfolioData, themeId);

  // Inject print CSS + auto-trigger print after fonts load
  const printReady = html.replace('</head>', `
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page { margin: 0.5in; size: A4 portrait; }
    }
  </style>
  </head>`).replace('</body>', `
  <script>
    // Wait for fonts to load then print
    document.fonts.ready.then(function() {
      setTimeout(function() { window.print(); }, 300);
    });
  </script>
  </body>`);

  const w = window.open('', '_blank');
  if (!w) {
    alert('Please allow pop-ups to download as PDF.');
    return;
  }
  w.document.write(printReady);
  w.document.close();
}
