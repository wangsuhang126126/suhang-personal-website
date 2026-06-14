import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({ images, activeIndex, onClose, onSelect }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const activeImage = images[activeIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onSelect((activeIndex - 1 + images.length) % images.length);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onSelect((activeIndex + 1) % images.length);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = dialogRef.current?.querySelectorAll("button");
      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length, onClose, onSelect]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded about page image"
      onMouseDown={handleBackdropClick}
      ref={dialogRef}
    >
      <button
        className="image-lightbox-close"
        type="button"
        aria-label="Close expanded image"
        onClick={onClose}
        ref={closeButtonRef}
      >
        ×
      </button>
      <button
        className="image-lightbox-nav image-lightbox-prev"
        type="button"
        aria-label="Show previous image"
        onClick={() => onSelect((activeIndex - 1 + images.length) % images.length)}
      >
        ←
      </button>
      <img className="image-lightbox-image" src={activeImage.src} alt={activeImage.alt} />
      <button
        className="image-lightbox-nav image-lightbox-next"
        type="button"
        aria-label="Show next image"
        onClick={() => onSelect((activeIndex + 1) % images.length)}
      >
        →
      </button>
    </div>,
    document.body,
  );
}
