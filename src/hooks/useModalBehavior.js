import { useEffect, useRef } from 'react';

/**
 * Custom hook to lock body scroll and manage modal accessibility focus/escape key
 * @param {Object} options
 * @param {boolean} options.isOpen - Whether the modal/popup is currently open
 * @param {Function} [options.onClose] - Callback when Escape key is pressed or close requested
 * @param {React.RefObject} [options.focusRef] - Optional ref to element that should be focused when opened
 * @param {boolean} [options.preventScrollbarShift=true] - Whether to compensate padding for scrollbar
 */
export function useModalBehavior({
  isOpen,
  onClose,
  focusRef,
  preventScrollbarShift = true
}) {
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    previousActiveElement.current = document.activeElement;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Prevent layout shift when scrollbar disappears
    if (preventScrollbarShift) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    // Lock scrolling on both body and html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    // Auto focus the target modal element or close button if provided
    const timer = setTimeout(() => {
      if (focusRef?.current && typeof focusRef.current.focus === 'function') {
        focusRef.current.focus();
      }
    }, 50);

    // Escape key listener to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, focusRef, preventScrollbarShift]);
}

/**
 * Lightweight scroll lock hook for simple lightboxes/drawers.
 * onClose is stored in a ref so changing it never re-triggers the effect.
 */
export function useBodyScrollLock(isLocked, onClose) {
  const onCloseRef = useRef(onClose);
  // Keep ref in sync with the latest callback without adding it as a dependency
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isLocked) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onCloseRef.current) {
        e.preventDefault();
        onCloseRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLocked]); // ← hanya bergantung pada isLocked, bukan onClose
}
