import styles from "./Button.module.css";

type buttonProps = {
  buttonPress: React.MouseEventHandler<HTMLButtonElement>;
  button: string;
};

const Button = ({ buttonPress, button }: buttonProps) => (
  <button className={styles.button} onClick={buttonPress}>
    {button}
  </button>
);

export const HalfButton = ({ buttonPress, button }: buttonProps) => (
  <button className={styles["half-button"]} onClick={buttonPress}>
    {button}
  </button>
);

export default Button;
