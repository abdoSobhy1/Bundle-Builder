import { Accordion } from "../../components/Accordion/Accordion";
import { ReviewPanel } from "../../components/ReviewPanel/ReviewPanel";
import { BundleProvider } from "../../context/BundleContext";
import { useProductsData } from "../../hooks/useProductsData";
import styles from "./BundleBuilder.module.css";

export const BundleBuilder = () => {
  const { categories, isLoading, error } = useProductsData();

  if (isLoading) {
    return (
      <div className={styles.statusWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>Fetching bundle data...</div>
      </div>
    );
  }

  if (error || !categories) {
    return (
      <div className={styles.statusWrapper}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>!</div>
          <h3 className={styles.errorTitle}>Connection Error</h3>
          <p className={styles.errorText}>
            Unable to load the bundle catalog.
            <br />
            Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <BundleProvider categories={categories}>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.grid}>
            <section
              aria-label="Bundle builder steps"
              className={styles.stepsSection}>
              <h1 className={styles.mobileHeading}>Let's get started!</h1>
              <Accordion categories={categories} />
            </section>
            <aside aria-label="Bundle review" className={styles.aside}>
              <ReviewPanel categories={categories} />
            </aside>
          </div>
        </main>
      </div>
    </BundleProvider>
  );
};
