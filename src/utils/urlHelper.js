/**
 * Smart URL parser & normalizer for external media and image links.
 * Automatically transforms Google Drive, Dropbox, GitHub, Imgur, and web share links
 * into direct raw image assets.
 */
export function normalizeImageUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const url = rawUrl.trim();

  // 1. Data URLs & Blob URLs are returned as-is
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  try {
    // 2. Google Drive share links
    // Formats:
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // https://drive.google.com/open?id=FILE_ID
    // https://drive.google.com/uc?id=FILE_ID
    const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
    const driveIdMatch = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/i);
    const driveId = driveFileMatch?.[1] || driveIdMatch?.[1];
    if (driveId) {
      // Use direct high-speed Google UserContent CDN
      return `https://lh3.googleusercontent.com/d/${driveId}`;
    }

    // 3. Dropbox share links
    // https://www.dropbox.com/s/xyz/filename.png?dl=0 -> https://dl.dropboxusercontent.com/s/xyz/filename.png
    if (url.includes('dropbox.com')) {
      if (url.includes('dl.dropboxusercontent.com')) return url;
      if (url.includes('?dl=0')) return url.replace('?dl=0', '?raw=1');
      const dropMatch = url.match(/dropbox\.com\/s\/([a-zA-Z0-9_-]+)\/([^?]+)/i);
      if (dropMatch) {
        return `https://dl.dropboxusercontent.com/s/${dropMatch[1]}/${dropMatch[2]}`;
      }
      return url.includes('?') ? `${url}&raw=1` : `${url}?raw=1`;
    }

    // 4. GitHub repository blob image links
    // https://github.com/user/repo/blob/main/img.png -> https://raw.githubusercontent.com/user/repo/main/img.png
    const githubMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/i);
    if (githubMatch) {
      return `https://raw.githubusercontent.com/${githubMatch[1]}/${githubMatch[2]}/${githubMatch[3]}/${githubMatch[4]}`;
    }

    // 5. Imgur page links
    // https://imgur.com/xyz -> https://i.imgur.com/xyz.jpg
    const imgurMatch = url.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)$/i);
    if (imgurMatch && !url.includes('/a/') && !url.includes('/gallery/')) {
      return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
    }

    return url;
  } catch (err) {
    console.warn('Could not normalize URL:', err);
    return url;
  }
}

/**
 * Safely format an external web URL to ensure it has http/https protocol.
 * Prevents client-side router 404s when navigating to user-entered URLs
 * such as 'linkedin.com/in/username' or 'github.com/org'.
 */
export function formatExternalUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  // Data URLs, Blob URLs, mailto, tel
  if (/^(?:mailto:|tel:|blob:|data:)/i.test(trimmed)) {
    return trimmed;
  }

  // Already has http:// or https://
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Protocol-relative URL like //example.com
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  // Otherwise prepend https://
  return `https://${trimmed}`;
}
