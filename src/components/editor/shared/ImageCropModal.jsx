import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../../utils/cropImage';

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const RotateCwIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
  </svg>
);

const ZoomInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

const ZoomOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ResetIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

export default function ImageCropModal({
  imageSrc,
  fileName = 'profile-avatar.jpg',
  aspect = 1, // Enforce 1:1 aspect ratio by default
  cropShape = 'round', // 'round' or 'rect'
  onConfirm,
  onCancel,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [shape, setShape] = useState(cropShape);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle keyboard shortcuts (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isProcessing) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, isProcessing]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const cropped = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        fileName,
        'image/jpeg',
        0.92
      );

      // cropped contains { file, blob, dataUrl }
      await onConfirm(cropped);
    } catch (err) {
      console.error('Error cropping image:', err);
      setErrorMsg(err.message || 'Failed to crop image. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      style={{
        background: 'rgba(10, 15, 12, 0.82)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-200 border"
        style={{
          background: 'var(--pf-editor-bg, #182218)',
          borderColor: 'var(--pf-border-color, #2E422E)',
          color: 'var(--pf-text-primary, #EDE7DC)',
          maxHeight: '92vh',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b shrink-0"
          style={{
            background: 'var(--pf-topbar-bg, #121A12)',
            borderColor: 'var(--pf-border-color, #2E422E)',
          }}
        >
          <div>
            <h2 id="crop-modal-title" className="text-sm font-bold tracking-tight">
              Crop Profile Picture
            </h2>
            <p className="text-[11px] opacity-75 mt-0.5">
              Drag to reposition, adjust zoom & rotation (1:1 square ratio)
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="p-1.5 rounded-lg opacity-70 hover:opacity-100 transition-opacity disabled:opacity-30"
            aria-label="Close cropping modal"
          >
            <XIcon />
          </button>
        </div>

        {/* Cropper Viewport Container */}
        <div className="relative w-full h-72 sm:h-80 bg-[#0c120c] overflow-hidden select-none">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              cropShape={shape}
              showGrid={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          )}

          {/* Mask Guide Overlay Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10.5px] font-medium text-white/90 border border-white/10">
            <span>Ratio 1:1</span>
            <span className="opacity-40">•</span>
            <button
              type="button"
              onClick={() => setShape((s) => (s === 'round' ? 'rect' : 'round'))}
              className="hover:underline text-emerald-400 font-semibold cursor-pointer"
              title="Toggle preview shape guide"
            >
              {shape === 'round' ? 'Circle guide' : 'Square guide'}
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="px-5 py-3.5 space-y-3 shrink-0">
          {/* Zoom Slider & Buttons */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-medium opacity-80">
              <span className="flex items-center gap-1">
                <ZoomInIcon /> Zoom
              </span>
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
                disabled={zoom <= 1 || isProcessing}
                className="p-1.5 rounded bg-black/20 hover:bg-black/40 disabled:opacity-30 transition-all"
                aria-label="Zoom out"
              >
                <ZoomOutIcon />
              </button>

              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.05}
                aria-label="Zoom level"
                onChange={(e) => setZoom(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#447244] bg-[#2E422E]"
              />

              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(2)))}
                disabled={zoom >= 3 || isProcessing}
                className="p-1.5 rounded bg-black/20 hover:bg-black/40 disabled:opacity-30 transition-all"
                aria-label="Zoom in"
              >
                <ZoomInIcon />
              </button>
            </div>
          </div>

          {/* Quick Rotation & Reset Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-black/20 hover:bg-black/35 border border-white/10 transition-all"
                aria-label="Rotate 90 degrees clockwise"
              >
                <RotateCwIcon />
                <span>Rotate 90°</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isProcessing || (zoom === 1 && rotation === 0 && crop.x === 0 && crop.y === 0)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium opacity-70 hover:opacity-100 disabled:opacity-30 transition-all"
                aria-label="Reset crop position"
              >
                <ResetIcon />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-[10px] opacity-60 hidden sm:block">
              1:1 profile image standard
            </p>
          </div>

          {errorMsg && (
            <p className="text-[11px] text-[#ec5b62] bg-[#ec5b62]/10 p-2 rounded border border-[#ec5b62]/20">
              ⚠ {errorMsg}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-2.5 px-5 py-3 border-t shrink-0"
          style={{
            background: 'var(--pf-topbar-bg, #121A12)',
            borderColor: 'var(--pf-border-color, #2E422E)',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold opacity-80 hover:opacity-100 transition-opacity disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-all text-white"
            style={{
              background: isProcessing ? '#2E422E' : 'var(--pf-ui-accent, #447244)',
            }}
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Crop…</span>
              </>
            ) : (
              <>
                <CheckIcon />
                <span>Apply & Save Crop</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
