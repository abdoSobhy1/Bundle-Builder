import { useState } from "react";
import clsx from "clsx";
import { ProductCard } from "../ProductCard/ProductCard";
import { useBundle } from "../../hooks/useBundle";
import styles from "./Accordion.module.css";

import productsData from "../../assets/data/products.json";
import type { Category } from "../../types/category";

import livestreamIcon from "../../assets/icons/livestream.svg";
import carotDown from "../../assets/icons/carrot.svg";
import protectionIcon from "../../assets/icons/protection.svg";
import shieldIcon from "../../assets/icons/plan.svg";
import sensorIcon from "../../assets/icons/sensors.svg";

const iconMap: Record<string, string> = {
  camera: livestreamIcon,
  shield: shieldIcon,
  sensor: sensorIcon,
  protection: protectionIcon,
};

const categories = productsData.categories as Category[];

export function Accordion() {
  const [openStepId, setOpenStepId] = useState<string>(categories[0].id);
  const { selections } = useBundle();

  return (
    <div className={styles.container}>
      {categories.map((category, index) => {
        const isOpen = openStepId === category.id;
        const iconSrc = iconMap[category.icon];

        const selectedCount = category.products.reduce((count, prod) => {
          const productSelections = selections[prod.id] || {};
          const hasSelectedVariants = Object.values(productSelections).some(
            (qty) => qty > 0,
          );
          return count + (hasSelectedVariants ? 1 : 0);
        }, 0);

        return (
          <div
            key={category.id}
            className={clsx(styles.step, isOpen && styles.stepOpen)}>
            <div className={styles.stepHeader}>
              Step {index + 1} of {categories.length}
              <div className={styles.stepDivider} />
            </div>

            <button
              onClick={() => setOpenStepId(isOpen ? "" : category.id)}
              className={styles.stepButton}>
              <div className={styles.buttonLeft}>
                <div className={styles.iconContainer}>
                  <img
                    src={iconSrc}
                    alt={category.title}
                    className={styles.icon}
                  />
                </div>
                <h2 className={styles.stepTitle}>{category.title}</h2>
              </div>
              <div className={styles.buttonRight}>
                {selectedCount > 0 && (
                  <span className={styles.selectedText}>
                    {selectedCount} selected
                  </span>
                )}
                <img
                  src={carotDown}
                  alt="Toggle"
                  className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
                />
              </div>
            </button>

            <div
              className={clsx(
                styles.gridContainer,
                isOpen ? styles.gridOpen : styles.gridClosed,
              )}>
              <div className={styles.gridInner}>
                <div className={styles.productsGrid}>
                  {category.products.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                  })}
                </div>
                {index < categories.length - 1 && (
                  <div className={styles.nextButtonContainer}>
                    <button
                      onClick={() => setOpenStepId(categories[index + 1].id)}
                      className={styles.nextButton}>
                      Next: {categories[index + 1].title}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isOpen && <div className={styles.stepDivider} />}
          </div>
        );
      })}
    </div>
  );
}
