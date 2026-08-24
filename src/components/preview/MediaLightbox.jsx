import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function MediaLightbox({ items, index, onClose, onIndex }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media lightbox"
    >
      <button
        type="button"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white"
        style={{ background: '#252525', border: '1px solid #323232', borderRadius: 2 }}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={16} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-4 w-9 h-9 flex items-center justify-center text-white"
            style={{ background: '#252525', border: '1px solid #323232', borderRadius: 2 }}
            onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="absolute right-4 w-9 h-9 flex items-center justify-center text-white"
            style={{ background: '#252525', border: '1px solid #323232', borderRadius: 2 }}
            onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <figure className="max-w-[90vw] max-h-[88vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {item.src?.match(/\.pdf($|\?)/i) || item.kind === 'pdf' ? (
          <iframe title={item.caption || 'Document'} src={item.src} className="w-[80vw] h-[80vh] bg-black" />
        ) : (
          <img src={item.src} alt={item.caption || 'Gallery image'} className="max-w-full max-h-[80vh] object-contain" />
        )}
        {item.caption && (
          <figcaption className="mt-3 text-[13px] text-[#d2d2d2]">{item.caption}</figcaption>
        )}
      </figure>
    </div>
  );
}
