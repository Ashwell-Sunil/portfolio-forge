import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { isFirebaseConfigured, storage } from './firebase';
import { compressImage } from '../utils/imageCompressor';

function sanitizeName(name) {
  return String(name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
}

/**
 * Read and compress file to high-quality Data URL with simulated progress.
 */
export async function readAsDataUrlWithProgress(file, onProgress) {
  if (onProgress) onProgress(15);

  // If it's an image, attempt compression for fast localStorage storage
  if (file.type && file.type.startsWith('image/')) {
    try {
      if (onProgress) onProgress(40);
      const compressed = await compressImage(file, 1200, 0.85);
      if (onProgress) onProgress(85);
      await new Promise((r) => setTimeout(r, 60));
      if (onProgress) onProgress(100);
      return compressed;
    } catch {
      // Fallback to standard FileReader
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const pct = Math.min(95, Math.round((e.loaded / e.total) * 100));
        onProgress(pct);
      }
    };

    reader.onload = async () => {
      if (onProgress) onProgress(90);
      await new Promise((r) => setTimeout(r, 50));
      if (onProgress) onProgress(100);
      resolve(reader.result);
    };

    reader.onerror = () => reject(new Error('Failed to read file locally.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Upload a file to Cloud Storage or fallback to base64 Data URL.
 * Automatically updates progress (0-100%) and guarantees resolution.
 */
export async function uploadPortfolioFile(file, uid, folder = 'uploads', onProgress) {
  if (!file) throw new Error('No file selected');

  if (onProgress) onProgress(5);

  // Check if Firebase Storage is truly configured and ready
  const isCloudReady = Boolean(
    isFirebaseConfigured &&
    storage &&
    storage.app?.options?.storageBucket &&
    uid &&
    uid !== 'anonymous-user' &&
    uid !== 'demo-user-123'
  );

  if (!isCloudReady) {
    return readAsDataUrlWithProgress(file, onProgress);
  }

  const fileName = file.name || `${folder}-item-${Date.now()}`;
  const path = `users/${uid}/${folder}/${Date.now()}-${sanitizeName(fileName)}`;
  const storageRef = ref(storage, path);

  try {
    // Attempt Firebase Storage Upload with 6s Timeout Safety Guard
    const uploadPromise = new Promise((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, file, {
        contentType: file.type || 'application/octet-stream',
      });

      task.on(
        'state_changed',
        (snapshot) => {
          if (onProgress && snapshot.totalBytes) {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onProgress(Math.min(98, pct));
          }
        },
        (error) => {
          console.warn('Firebase Storage upload error, falling back to local storage:', error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            if (onProgress) onProgress(100);
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }
      );
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storage upload timeout')), 6000)
    );

    return await Promise.race([uploadPromise, timeoutPromise]);
  } catch (err) {
    console.warn('Falling back to local Data URL due to storage upload issue:', err);
    return readAsDataUrlWithProgress(file, onProgress);
  }
}
