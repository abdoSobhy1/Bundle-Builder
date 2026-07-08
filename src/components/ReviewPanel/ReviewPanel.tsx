import { useBundle } from "../../hooks/useBundle";
import productsData from "../../assets/data/products.json";
import type { Category } from "../../types/category";
import styles from "./ReviewPanel.module.css";
import lineItemStyles from "./ReviewPanelLineItem/ReviewPanelLineItem.module.css";


import { ReviewPanelLineItem } from "./ReviewPanelLineItem/ReviewPanelLineItem";
import { ReviewPanelTotals } from "./ReviewPanelTotals/ReviewPanelTotals";

export function ReviewPanel() {
  const {
    selections,
    updateQuantity,
    saveToStorage,
    savedMessageVisible,
    totals,
  } = useBundle();
  const categories = productsData.categories as Category[];

  // Render selected items grouped by category
  const renderLineItems = () => {
    const desiredOrder = ["cameras", "sensors", "accessories", "plans"];
    const orderedCategories = [...categories].sort(
      (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id),
    );

    return orderedCategories.map((category) => {
      const itemsToRender: React.ReactNode[] = [];

      category.products.forEach((product) => {
        const prodSelections = selections[product.id] || {};
        product.variants.forEach((variant) => {
          const qty = prodSelections[variant.id] || 0;
          if (qty > 0) {
            if (category.id === "plans") {
              itemsToRender.push(
                <ReviewPanelLineItem
                  key={`${product.id}-${variant.id}`}
                  product={product}
                  variant={variant}
                  itemVariant="plan"
                />
              );
            } else {
              itemsToRender.push(
                <ReviewPanelLineItem
                  key={`${product.id}-${variant.id}`}
                  product={product}
                  variant={variant}
                  qty={qty}
                  updateQuantity={updateQuantity}
                />
              );
            }
          }
        });
      });

      if (itemsToRender.length === 0) return null;

      return (
        <div key={category.id} className={styles.categoryGroup}>
          <h4 className={styles.categoryHeader}>{category.name}</h4>
          <div className={styles.lineItemsList}>{itemsToRender}</div>
        </div>
      );
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelGrid}>
        <div className={styles.leftCol}>
          <div className={styles.headerWrapper}>
            <span className={styles.headerSub}>Review</span>
            <h2 className={styles.headerTitle}>Your security system</h2>
            <p className={styles.headerDesc}>
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>

          <div className={styles.container}>
            {renderLineItems()}
            <div className={styles.categoryGroup} style={{ marginBottom: 0 }}>
              <div className={lineItemStyles.lineItem}>
                <div className={lineItemStyles.imageBox}>
                  <img
                    src="/images/shipping.svg"
                    alt="Shipping"
                    className={lineItemStyles.image}
                  />
                </div>
                <h4 className={lineItemStyles.itemTitle}>Fast Shipping</h4>
                <div className={lineItemStyles.itemPriceBox}>
                  <div className={lineItemStyles.itemComparePrice}>$5.99</div>
                  <div className={lineItemStyles.itemPrice}>FREE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <ReviewPanelTotals
            totals={totals}
            saveToStorage={saveToStorage}
            savedMessageVisible={savedMessageVisible}
          />
        </div>
      </div>
    </div>
  );
}
