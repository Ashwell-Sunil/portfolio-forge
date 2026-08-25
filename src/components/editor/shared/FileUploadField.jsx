import { useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { uploadPortfolioFile } from '../../../services/cloudStorage';
import { updateProfileAvatarInFirestore } from '../../../services/firestore';
import ImageCropModal from './ImageCropModal';

const UploadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const XIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>
);

const CropIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
  </svg>
);

/**
 * Adobe Spectrum-styled direct local file upload field.
 * Pure file dropzone + dynamic progress tracking + preview card + optional 1:1 image cropper.
 */
export default function FileUploadField({
  id,
  label,
  value = '',
  onChange,
  accept = 'image/*',
  hint,
  previewType = 'image',
  folder = 'uploads',
  enableCrop = false,
  cropAspect = 1,
  cropShape = 'round',
  onUploadSuccess,
}) {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [imgLoadFailed, setImgLoadFailed] = useState(false);

  // Cropping State
  const [isCropping, setIsCropping] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [pendingFileName, setPendingFileName] = useState('avatar.jpg');

  useEffect(() => {
    setImgLoadFailed(false);
  }, [value]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(cropImageSrc);
      }
    };
  }, [cropImageSrc]);

  const executeUpload = async (fileToUpload, originalName) => {
    setError('');
    setImgLoadFailed(false);
    setUploading(true);
    setProgress(5);
    const targetName = originalName || fileToUpload.name || `${folder}-item-${Date.now()}`;
    setFileName(targetName);

    try {
      const resultUrl = await uploadPortfolioFile(
        fileToUpload,
        user?.uid || 'user-session',
        folder,
        (pct) => setProgress(pct)
      );

      // 1. Update React state via onChange
      onChange(resultUrl);

      // 2. If this is an avatar or profile image and the user is authenticated, update the Firestore doc
      if (user?.uid && (folder === 'avatars' || id === 'profile-image')) {
        await updateProfileAvatarInFirestore(user.uid, resultUrl);
      }

      if (onUploadSuccess) {
        onUploadSuccess(resultUrl);
      }

      setProgress(100);
    } catch (err) {
      console.error('Upload processing error:', err);
      setError(err.message || 'Could not process file.');
    } finally {
      setTimeout(() => {
        setUploading(false);
      }, 250);
    }
  };

  const handleFile = async (e) => {
    if (e) {
      e.stopPropagation?.();
    }
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setError('File is too large. Maximum size is 25MB.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // Intercept image file when cropping is enabled: do NOT upload immediately
    const isImage =
      file.type?.startsWith('image/') ||
      accept.includes('image') ||
      /\.(jpg|jpeg|png|webp|gif|svg|avif|heic|heif)$/i.test(file.name || '');

    if (enableCrop && isImage) {
      setError('');
      if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(cropImageSrc);
      }
      const objectUrl = URL.createObjectURL(file);
      setCropImageSrc(objectUrl);
      setPendingFileName(file.name || 'avatar.jpg');
      setIsCropping(true);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // Standard immediate upload for non-cropped files
    await executeUpload(file, file.name);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleCropConfirm = async (croppedResult) => {
    // croppedResult contains { file, blob, dataUrl }
    setIsCropping(false);
    if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(cropImageSrc);
      setCropImageSrc(null);
    }
    if (inputRef.current) inputRef.current.value = '';

    // Upload the newly cropped image to Firebase Storage
    await executeUpload(croppedResult.file, pendingFileName);
  };

  const handleCropCancel = useCallback(() => {
    setIsCropping(false);
    if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(cropImageSrc);
      setCropImageSrc(null);
    }
    if (inputRef.current) inputRef.current.value = '';
  }, [cropImageSrc]);

  const handleClear = (e) => {
    if (e) e.stopPropagation?.();
    onChange('');
    setFileName('');
    setError('');
    setImgLoadFailed(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const isPdf = value?.includes('.pdf') || value?.startsWith('data:application/pdf') || previewType === 'file';

  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={id} className="spectrum-label">{label}</label>}

      <div className="space-y-2">
        {/* Active Uploaded File Preview */}
        {value && !uploading && (
          <div
            className="flex items-center gap-2.5 p-2 rounded transition-colors"
            style={{
              background: 'var(--pf-card-bg, #EDF5ED)',
              border: '1px solid var(--pf-border-color, #B0C6B0)',
            }}
          >
            {!isPdf && previewType === 'image' && !value.includes('.pdf') ? (
              <div className="relative shrink-0">
                {!imgLoadFailed ? (
                  <img
                    src={value}
                    alt="Upload preview"
                    className="w-10 h-10 rounded object-cover shadow-sm"
                    style={{ border: '1px solid var(--pf-border-color, #B0C6B0)' }}
                    onError={() => setImgLoadFailed(true)}
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center shadow-sm"
                    style={{
                      background: 'var(--pf-input-bg, #FAF7F1)',
                      border: '1px solid var(--pf-border-color, #B0C6B0)',
                      color: 'var(--pf-ui-accent, #447244)',
                    }}
                  >
                    <ImageIcon />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="w-10 h-10 rounded flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  background: 'var(--pf-input-bg, #FAF7F1)',
                  border: '1px solid var(--pf-ui-accent, #447244)',
                  color: 'var(--pf-ui-accent, #447244)',
                }}
              >
                <FileIcon />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold truncate" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
                {fileName || (isPdf ? 'Document Attached' : 'Image Uploaded')}
              </p>
              <p className="text-[10px] truncate" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
                {value.startsWith('http') ? 'Cloud Storage Asset' : 'Ready & Attached'}
              </p>
            </div>

            {/* Re-crop trigger button if image and enableCrop is on */}
            {enableCrop && !isPdf && value && (
              <label
                htmlFor={`${id}-file`}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="p-1 rounded text-[var(--pf-text-muted,#888)] hover:text-[var(--pf-ui-accent,#447244)] transition-colors cursor-pointer"
                title="Crop new photo"
                aria-label="Upload and crop replacement photo"
              >
                <CropIcon />
              </label>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear(e);
              }}
              onTouchStart={(e) => e.stopPropagation()}
              className="p-1 rounded text-[var(--pf-text-muted,#888)] hover:text-[#ec5b62] transition-colors"
              title="Remove file"
              aria-label="Remove uploaded file"
            >
              <XIcon />
            </button>
          </div>
        )}

        {/* Uploading Dynamic Progress Bar */}
        {uploading && (
          <div
            className="p-2.5 rounded space-y-1.5 transition-all"
            style={{
              background: 'var(--pf-card-bg, #EDF5ED)',
              border: '1px solid var(--pf-border-color, #B0C6B0)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="truncate" style={{ color: 'var(--pf-text-primary, #1B2A1B)' }}>
                Uploading {fileName}…
              </span>
              <span className="font-semibold" style={{ color: 'var(--pf-ui-accent, #447244)' }}>
                {progress}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--pf-input-border, #CFC2AF)' }}>
              <div
                className="h-full transition-all duration-200 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'var(--pf-ui-accent, #447244)',
                }}
              />
            </div>
          </div>
        )}

        {/* Direct Local Dropzone Trigger */}
        {!value && !uploading && (
          <label
            htmlFor={`${id}-file`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="flex flex-col items-center justify-center gap-1.5 w-full py-3.5 px-3 rounded cursor-pointer transition-all hover:opacity-90 shadow-sm select-none"
            style={{
              background: 'var(--pf-input-bg, #FAF7F1)',
              border: '1px dashed var(--pf-border-color, #B0C6B0)',
              touchAction: 'manipulation',
            }}
          >
            <div style={{ color: 'var(--pf-ui-accent, #447244)' }}>
              {enableCrop ? <CropIcon /> : <UploadIcon />}
            </div>
            <span className="text-[11px] text-center font-medium pointer-events-none" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>
              {enableCrop ? 'Click to select & crop photo' : 'Click to upload file'}{' '}
              <span>({accept.includes('pdf') ? 'PDF or Image' : 'PNG, JPG, WebP, SVG'})</span>
            </span>
            <input
              ref={inputRef}
              id={`${id}-file`}
              type="file"
              accept={accept}
              onClick={(e) => {
                e.stopPropagation();
                // Reset value to ensure onChange triggers even if selecting the same file again on mobile
                e.target.value = '';
              }}
              onChange={(e) => {
                e.stopPropagation();
                handleFile(e);
              }}
              className="sr-only"
              aria-label={`Upload ${label}`}
            />
          </label>
        )}
      </div>

      {error && <p className="text-[11px] text-[#ec5b62]">⚠ {error}</p>}
      {hint && !error && <p className="text-[10.5px]" style={{ color: 'var(--pf-text-muted, #6B7A6E)' }}>{hint}</p>}

      {/* 1:1 Aspect Ratio Cropping Modal */}
      {isCropping && cropImageSrc && (
        <ImageCropModal
          imageSrc={cropImageSrc}
          fileName={pendingFileName}
          aspect={cropAspect}
          cropShape={cropShape}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
