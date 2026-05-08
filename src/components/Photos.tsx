import { useState, useCallback, useEffect, useMemo } from 'react';

import { createPortal } from 'react-dom';
import { PHOTOS, getDriveImageUrl } from './photoData';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Photos.css';

const Photos = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<number>>(new Set());

  // Shuffle photos randomly on mount
  const shuffledPhotos = useMemo(() => {
    const arr = [...PHOTOS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % shuffledPhotos.length);
    }
  }, [selectedIndex, shuffledPhotos.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + shuffledPhotos.length) % shuffledPhotos.length);
    }
  }, [selectedIndex, shuffledPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goNext, goPrev]);

  const handleImageLoad = (index: number) => {
    setLoadedPhotos(prev => new Set(prev).add(index));
  };

  if (PHOTOS.length === 0) {
    return (
      <div className="photos-container animate-fade-in">
        <div className="photos-header">
          <h2 className="text-gradient">Photo Gallery</h2>
          <p className="photos-subtitle">
            Photos will appear here once they're added from Google Drive.
          </p>
        </div>
        <div className="photos-empty glass-panel">
          <Image size={48} className="empty-icon" />
          <p>No photos yet</p>
          <span>Add Google Drive file IDs to <code>photoData.ts</code> to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className="photos-container animate-fade-in">
      <div className="photos-header">
        <h2 className="text-gradient">Photo Gallery</h2>
        <p className="photos-subtitle">
          A collection of moments and memories 📸
        </p>
      </div>

      <div className="photos-masonry">
        {shuffledPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`photo-card glass-panel ${loadedPhotos.has(index) ? 'loaded' : 'loading'}`}
            onClick={() => openLightbox(index)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={getDriveImageUrl(photo.id)}
              alt={photo.alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => handleImageLoad(index)}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('thumbnail')) {
                  target.src = `https://drive.google.com/thumbnail?id=${photo.id}&sz=w1000`;
                }
              }}
            />
            {photo.caption && (
              <div className="photo-caption">{photo.caption}</div>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && createPortal(
        <div className="lightbox-overlay animate-fade-in" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={goPrev}>
              <ChevronLeft size={32} />
            </button>

            <div className="lightbox-image-wrapper">
              <img
                src={getDriveImageUrl(shuffledPhotos[selectedIndex].id)}
                alt={shuffledPhotos[selectedIndex].alt}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('thumbnail')) {
                    target.src = `https://drive.google.com/thumbnail?id=${shuffledPhotos[selectedIndex].id}&sz=w2000`;
                  }
                }}
              />
              {shuffledPhotos[selectedIndex].caption && (
                <p className="lightbox-caption">{shuffledPhotos[selectedIndex].caption}</p>
              )}
            </div>

            <button className="lightbox-nav lightbox-next" onClick={goNext}>
              <ChevronRight size={32} />
            </button>

            <div className="lightbox-counter">
              {selectedIndex + 1} / {shuffledPhotos.length}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Photos;
