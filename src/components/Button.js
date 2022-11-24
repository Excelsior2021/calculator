import styles from "./Button.module.css";

const Button = ({ buttonPress, button }) => (
  <button className={styles.button} onClick={buttonPress}>
    {button}
  </button>
);

export const HalfButton = ({ buttonPress, button }) => (
  <button className={styles["half-button"]} onClick={buttonPress}>
    {button}
  </button>
);

export default Button;
