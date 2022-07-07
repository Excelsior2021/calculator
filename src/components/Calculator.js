import Button from "./Button"
import styles from "./Calculator.module.css"

function Calculator(props) {
  return <div className={styles.calculator}>

    <div className={styles.display}>
      <div className={styles["display--result"]}></div>
      <div className={styles["display--input"]}></div>
    </div>

    <div className={styles.actions}>

      <div className={styles.row}>
        <Button>
          C
        </Button>
        <Button>
          del
        </Button>
        <Button>
          ()
        </Button>
        <Button>
          /
        </Button>
      </div>

      <div className={styles.row}>
        <Button>
          1
        </Button>
        <Button>
          2
        </Button>
        <Button>
          3
        </Button>
        <Button>
          ×
        </Button>
      </div>

      <div className={styles.row}>
        <Button>
          4
        </Button>
        <Button>
          5
        </Button>
        <Button>
          6
        </Button>
        <Button>
          -
        </Button>
      </div>

      <div className={styles.row}>
        <Button>
          7
        </Button>
        <Button>
          8
        </Button>
        <Button>
          9
        </Button>
        <Button>
          +
        </Button>
      </div>

      <div className={styles.row}>
        <Button>
          0
        </Button>
        <Button>
          .
        </Button>
        <Button>
          +/-
        </Button>
        <Button>
          =
        </Button>
      </div>

    </div>
  </div>
}

export default Calculator;