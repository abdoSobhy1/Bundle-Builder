import { formatPrice } from "../../../utils/price";
import styles from "./ReviewPanelTotals.module.css";

interface ReviewPanelTotalsProps {
  totals: {
    subtotal: number;
    total: number;
    savings: number;
  };
  saveToStorage: () => void;
  savedMessageVisible: boolean;
}

export function ReviewPanelTotals({
  totals,
  saveToStorage,
  savedMessageVisible,
}: ReviewPanelTotalsProps) {
  return (
    <div className={styles.rightColInner}>
      <div className={styles.desktopTotalsWrapper}>
        <div className={styles.guaranteeBox}>
          <img
            src="/images/Satisfaction Badge.png"
            alt="Satisfaction Guarantee"
            className={styles.guaranteeImg}
          />
          <div className={styles.guaranteeText}>
            <h4 className={styles.guaranteeTitle}>
              30-day hassle-free returns
            </h4>
            <p className={styles.guaranteeDesc}>
              <br /> If you're not totally in love with the product, we will
              refund you 100%.
            </p>
          </div>
        </div>

        <div className={styles.totalsBox}>
          <div className={styles.totalsRight}>
            {totals.total >= 50 && (
              <div className={styles.affirmBadge}>
                as low as {formatPrice(totals.total / 12)}/mo
              </div>
            )}
            <div className={styles.priceRow}>
              <div className={styles.totalsOld}>
                {formatPrice(totals.subtotal)}
              </div>
              <div className={styles.totalsTotal}>
                {formatPrice(totals.total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.checkoutBox}>
        {totals.savings > 0 && (
          <p className={styles.totalsSavings}>
            Congrats! You're saving {formatPrice(totals.savings)} on your
            security bundle!
          </p>
        )}
        <button
          className={styles.checkoutBtn}
          onClick={() => alert("Checkout initiated!")}>
          Checkout
        </button>

        <button className={styles.saveBtn} onClick={saveToStorage}>
          {savedMessageVisible
            ? "Saved to browser!"
            : "Save my system for later"}
        </button>
      </div>
    </div>
  );
}
