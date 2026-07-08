import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CheckoutPopup.module.css";

interface CheckoutPopupProps {
  onClose: () => void;
}

export function CheckoutPopup({ onClose }: CheckoutPopupProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsRendered(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const popupContent = (
    <div className={`${styles.overlay} ${isRendered ? styles.overlayVisible : ""}`} onClick={onClose}>
      <div 
        className={`${styles.popup} ${isRendered ? styles.popupVisible : ""}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <div className={styles.iconContainer}>
          <div className={styles.checkIcon}>&#10003;</div>
        </div>
        <h2 className={styles.title}>Processing Your Bundle</h2>
        <p className={styles.desc}>
          Thank you for choosing Wyze! Your customized bundle is being prepared for checkout.
        </p>
        <button className={styles.actionBtn} onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}
