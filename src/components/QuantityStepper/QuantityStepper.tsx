import styles from "./QuantityStepper.module.css";
import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import clsx from "clsx";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  variant?: "default" | "mini";
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  variant = "default",
}: QuantityStepperProps) {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={clsx(styles.container, variant === "mini" && styles.containerMini)}>
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className={styles.button}
        aria-label="Decrease quantity">
        <img
          src={minus}
          alt="Decrease quantity"
          className={value <= min ? styles.iconDisabled : undefined}
        />
      </button>

      <span className={styles.value}>{value}</span>

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className={styles.button}
        aria-label="Increase quantity">
        <img
          src={plus}
          alt="Increase quantity"
          className={value >= max ? styles.iconDisabled : undefined}
        />
      </button>
    </div>
  );
}
