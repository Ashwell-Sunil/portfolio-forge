/**
 * Frontend API client — all calls proxy through Vite to http://localhost:3001
 */

const BASE = '/api';

// ── Portfolio ──────────────────────────────────────────────────────────────
export async function publishPortfolio(data, slug, themeId) {
  const res = await fetch(`${BASE}/portfolios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, slug, themeId }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Publish failed');
  return res.json();
}

export async function fetchPortfolio(slug) {
  const res = await fetch(`${BASE}/portfolios/${slug}`);
  if (!res.ok) throw new Error('Portfolio not found');
  return res.json();
}

// ── File Upload ────────────────────────────────────────────────────────────
/**
 * Upload a File object to the backend.
 * Returns { url, filename, originalName, mimetype, size }
 */
export async function uploadFile(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  // Use XMLHttpRequest for progress events
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BASE}/upload`);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(data);
        else reject(new Error(data.error || 'Upload failed'));
      } catch {
        reject(new Error('Invalid server response'));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));
    xhr.send(formData);
  });
}

// ── Server info (local network IP for phone sharing) ──────────────────────
export async function getServerInfo() {
  try {
    const res = await fetch(`${BASE}/server-info`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
