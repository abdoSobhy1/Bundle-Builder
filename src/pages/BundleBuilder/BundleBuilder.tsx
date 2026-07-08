import { Accordion } from "../../components/Accordion/Accordion";
import { ReviewPanel } from "../../components/ReviewPanel/ReviewPanel";
import { BundleProvider } from "../../context/BundleContext";
import styles from "./BundleBuilder.module.css";

export const BundleBuilder = () => {
  return (
    <BundleProvider>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.grid}>
            <section aria-label="Bundle builder steps" className={styles.stepsSection}>
              <h1 className={styles.mobileHeading}>Let's get started!</h1>
              <Accordion />
            </section>
            <aside
              aria-label="Bundle review"
              className={styles.aside}>
              <ReviewPanel />
            </aside>
          </div>
        </main>
      </div>
    </BundleProvider>
  );
};
