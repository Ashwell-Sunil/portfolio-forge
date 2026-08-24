import { generatePortfolioHTML } from './generatePortfolioHTML';

/**
 * Generates the standalone HTML file and triggers a browser download.
 */
export function downloadPortfolioHTML(portfolioData, themeId) {
  try {
    const html = generatePortfolioHTML(portfolioData, themeId);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    
    // Use the user's name for the filename, fallback to 'portfolio'
    let filename = 'portfolio.html';
    if (portfolioData.profile?.name) {
      const cleanName = portfolioData.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      filename = `${cleanName}-portfolio.html`;
    }
    a.download = filename;
    
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (err) {
    console.error('Failed to generate HTML download:', err);
    return false;
  }
}
