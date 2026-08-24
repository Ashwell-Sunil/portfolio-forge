/**
 * Portfolio share link — uses 100% client-side URL compression via CompressionStream.
 * Serialize → Compress (deflate-raw) → Base64URL → #data=...
 */

/**
 * Helper: Convert Uint8Array to Base64URL string
 */
function bufferToBase64Url(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Helper: Convert Base64URL string to Uint8Array
 */
function base64UrlToBuffer(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Compresses portfolio data into a tiny Base64 URL-safe string.
 */
export async function encodeDataToURLHash(portfolioData, themeId) {
  const payload = JSON.stringify({ data: portfolioData, themeId: themeId || 'engineering-dark' });
  
  // String -> Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  
  // Compress
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    }
  }).pipeThrough(new CompressionStream('deflate-raw'));
  
  // Consume stream to ArrayBuffer
  const compressedBuffer = await new Response(stream).arrayBuffer();
  
  // ArrayBuffer -> Base64URL
  const base64 = bufferToBase64Url(compressedBuffer);
  return base64;
}

/**
 * Decompresses a Base64 URL-safe string back into the portfolio object.
 */
export async function decodeURLHashToData(base64) {
  try {
    const compressedData = base64UrlToBuffer(base64);
    
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(compressedData);
        controller.close();
      }
    }).pipeThrough(new DecompressionStream('deflate-raw'));
    
    const decompressedBuffer = await new Response(stream).arrayBuffer();
    
    const decoder = new TextDecoder();
    const jsonStr = decoder.decode(decompressedBuffer);
    
    return JSON.parse(jsonStr); // { data, themeId }
  } catch (err) {
    console.error('Failed to decode share link:', err);
    return null;
  }
}

/**
 * Build the full shareable URL from the compressed hash.
 */
export function buildShareURL(compressedBase64) {
  const base = `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');
  return `${base}/#data=${compressedBase64}`;
}

/**
 * Parse the URL hash and return the compressed base64 string, or null.
 */
export function getHashPayload(hash) {
  if (hash && hash.startsWith('#data=')) return hash.slice(6);
  return null;
}
