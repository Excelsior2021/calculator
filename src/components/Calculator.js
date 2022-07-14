import { useState, useReducer } from "react"
import { evaluate, format } from "mathjs"
import Button, { HalfButton } from "./Button"
import styles from "./Calculator.module.css"
import buttonStyles from "./Button.module.css"

const intialState = {
  result: "",
  input: "",
}

function Calculator() {
  const [decimal, setDecimal] = useState(false)
  const [leftBracket, setLeftBracket] = useState(0)
  const [rightBracket, setRightBracket] = useState(0)
  const [activeElement, setActiveElement] = useState(false)
  const [sumPressed, setSumPressed] = useState(false)

  const [state, dispatchAction] = useReducer(reducer, intialState)

  function reducer(state, action) {
    const lastEntry = state.input[state.input.length - 1]

    if (action.type !== "SUM") {
      setSumPressed(false)
    }

    if (action.type === "NUMBER") {
      const input = state.input.concat(action.number)
      if (state.input === "0") {
        if (action.number === "0") {
          return {
            ...state
          }
        } else {
          state.input = ""
          return {
            ...state,
            input
          }
        }
      }

      return {
        ...state,
        input
      }
    }

    if (action.type === "CLEAR") {
      if (action.clear === "CE" || action.clear === "Backspace") {
        const input = state.input.substr(0, state.input.length - 1)
        if (lastEntry === ".") {
          setDecimal(false)
        }
        if (lastEntry === "(") {
          setLeftBracket(prevState => prevState - 1)
        }
        if (lastEntry === ")") {
          setRightBracket(prevState => prevState - 1)
        }
        if (state.input === "0.") {
          return {
            ...state,
            input: ""
          }
        }
        return {
          ...state,
          input
        }
      }

      if (action.clear === "AC" || action.clear === "Escape") {
        setDecimal(false)
        setLeftBracket(0)
        setRightBracket(0)
        return {
          ...state,
          result: "",
          input: "",
        }
      }
    }

    if (action.type === "DECIMAL") {
      if (state.input === "") {
        const input = "0."
        setDecimal(true)
        return {
          ...state,
          input
        }
      }

      if (!decimal) {
        if (!parseInt(lastEntry) && lastEntry !== "0") {
          const input = state.input.concat("0.")
          setDecimal(true)
          return {
            ...state,
            input
          }
        }

        const input = state.input.concat(".")
        setDecimal(true)
        return {
          ...state,
          input
        }
      }

      return {
        ...state
      }
    }

    if (action.type === "ARITHMETIC") {
      if (parseInt(lastEntry) || lastEntry === "0" || lastEntry === ")") {
        setDecimal(false)
        if (action.symbol === "+") {
          const input = state.input.concat("+")
          return {
            ...state,
            input,
          }
        }
        if (action.symbol === "-") {
          const input = state.input.concat("-")
          return {
            ...state,
            input,
          }
        }
        if (action.symbol === "×" || action.symbol === "*") {
          const input = state.input.concat("×")
          return {
            ...state,
            input,
          }
        }
        if (action.symbol === "/") {
          const input = state.input.concat("/")
          return {
            ...state,
            input,
          }
        }
      }
      return { ...state }
    }

    if (action.type === "SUM") {
      const input = state.input.replace(/×/gi, "*")

      if (sumPressed) {
        setSumPressed(false)
        return {
          ...state,
          input: state.result,
          result: ""
        }
      }

      try {
        if (input !== "") {
          const sum = format(evaluate(input), { notation: "auto", precision: 14, lowerExp: -12, upperExp: 12 })
          setSumPressed(true)
          return {
            ...state,
            result: sum
          }
        }
      } catch (err) {
        return {
          ...state,
          result: err.name
        }
      }
    }

    if (action.type === "BRACKET") {
      let input;
      if (action.bracket === "(") {
        input = state.input.concat("(")
        setLeftBracket(prevState => prevState + 1)
        return {
          ...state,
          input,
        }
      }

      if (action.bracket === ")") {
        if ((parseInt(lastEntry) || lastEntry === "0" || lastEntry === ")") && (rightBracket < leftBracket)) {
          input = state.input.concat(")")
          setRightBracket(prevState => prevState + 1)
          return {
            ...state,
            input,
          }
        }

        return {
          ...state
        }
      }
    }

    if (action.type === "POS/NEG") {
      if (state.input === "" || lastEntry === "0" || lastEntry === "(") {
        const input = state.input.concat("-")
        return {
          ...state,
          input
        }
      }
      return {
        ...state
      }
    }
    return intialState
  }

  //Keypress function
  document.onkeydown = event => {
    keydownHandler(event)
  }

  //Action Handlers
  const keydownHandler = event => {
    if (event.key === "Tab") {
      setActiveElement(true)
    }
    if (event.key === "Enter") {
      setActiveElement(false)
    }
    calculatorActionHandler(event.key)
  }

  const buttonPressHandler = event => {
    calculatorActionHandler(event.target.innerText)
    event.target.blur()
  }

  const calculatorActionHandler = action => {
    if (parseInt(action) || action === "0") {
      dispatchAction({ type: "NUMBER", number: action, })
    }

    if (action === "CE" || action === "AC" || action === "Escape" || action === "Backspace") {
      dispatchAction({ type: "CLEAR", clear: action })
    }

    if (action === ".") {
      dispatchAction({ type: "DECIMAL" })
    }

    if (action === "+" || action === "-" || action === "×" || action === "/" || action === "*") {
      dispatchAction({ type: "ARITHMETIC", symbol: action })
    }

    if ((action === "=" || action === "Enter") && !activeElement) {
      dispatchAction({ type: "SUM" })
    }

    if (action === "(" || action === ")") {
      dispatchAction({ type: "BRACKET", bracket: action })
    }

    if (action === "+/-") {
      dispatchAction({ type: "POS/NEG" })
    }
  }

  return <div className={styles.calculator}>
    <div className={styles.display}>
      <div className={styles["display--result"]}>
        {state.result}
      </div>
      <div className={styles["display--input"]} onKeyDown={buttonPressHandler}>
        {state.input}
      </div>
    </div>

    <div className={styles.actions}>

      <div className={styles.row}>
        <Button buttonPress={buttonPressHandler}>
          AC
        </Button>
        <Button buttonPress={buttonPressHandler}>
          CE
        </Button>
        <div className={`${buttonStyles.button} ${buttonStyles["button--half"]}`}>
          <HalfButton buttonPress={buttonPressHandler}>
            (
          </HalfButton>
          <HalfButton buttonPress={buttonPressHandler}>
            )
          </HalfButton>
        </div>
        <Button buttonPress={buttonPressHandler}>
          /
        </Button>
      </div>

      <div className={styles.row}>
        <Button buttonPress={buttonPressHandler}>
          1
        </Button>
        <Button buttonPress={buttonPressHandler}>
          2
        </Button>
        <Button buttonPress={buttonPressHandler}>
          3
        </Button>
        <Button buttonPress={buttonPressHandler}>
          ×
        </Button>
      </div>

      <div className={styles.row}>
        <Button buttonPress={buttonPressHandler}>
          4
        </Button>
        <Button buttonPress={buttonPressHandler}>
          5
        </Button>
        <Button buttonPress={buttonPressHandler}>
          6
        </Button>
        <Button buttonPress={buttonPressHandler}>
          -
        </Button>
      </div>

      <div className={styles.row}>
        <Button buttonPress={buttonPressHandler}>
          7
        </Button>
        <Button buttonPress={buttonPressHandler}>
          8
        </Button>
        <Button buttonPress={buttonPressHandler}>
          9
        </Button>
        <Button buttonPress={buttonPressHandler}>
          +
        </Button>
      </div>

      <div className={styles.row}>
        <Button buttonPress={buttonPressHandler}>
          0
        </Button>
        <Button buttonPress={buttonPressHandler}>
          .
        </Button>
        <Button buttonPress={buttonPressHandler}>
          +/-
        </Button>
        <Button buttonPress={buttonPressHandler}>
          =
        </Button>
      </div>
    </div>
  </div>
}

export default Calculator;