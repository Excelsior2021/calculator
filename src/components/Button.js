import styles from "./Button.module.css"

function Button(props) {
  return <button className={styles.button} onClick={props.buttonPress}>
    {props.children}
  </button>
}

export function HalfButton(props) {
  return <button className={styles["half-button"]} onClick={props.buttonPress}>
    {props.children}
  </button>
}

export default Button