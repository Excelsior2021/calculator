import { useState, useReducer } from "react";
import { evaluate, format } from "mathjs";
import Button, { HalfButton } from "./Button";
import styles from "./Calculator.module.css";
import buttonStyles from "./Button.module.css";

const intialState = {
  result: "",
  input: "",
};

const reducer = (
  state,
  action,
  decimal,
  leftBracket,
  rightBracket,
  sumPressed,
  setDecimal,
  setLeftBracket,
  setRightBracket,
  setSumPressed
) => {
  const lastEntry = state.input[state.input.length - 1];

  let message = "MaxCharLimit";

  const inputLengthCheck = input => {
    if (window.innerWidth < 500) {
      if (input.length === 14) return true;
    }
    if (input.length === 20) return true;
  };

  if (action.type !== "SUM") setSumPressed(false);

  if (action.type === "NUMBER") {
    const input = state.input.concat(action.number);
    if (inputLengthCheck(input))
      return {
        ...state,
        result: message,
      };

    if (state.input === "0")
      if (action.number === "0") {
        return {
          ...state,
        };
      } else {
        state.input = "";
        return {
          ...state,
          input,
        };
      }

    return {
      ...state,
      input,
    };
  }

  if (action.type === "CLEAR") {
    if (action.clear === "CE" || action.clear === "Backspace") {
      const input = state.input.substr(0, state.input.length - 1);
      if (!inputLengthCheck(input)) {
        if (lastEntry === ".") {
          setDecimal(false);
        }
        if (lastEntry === "(") {
          setLeftBracket(prevState => prevState - 1);
        }
        if (lastEntry === ")") {
          setRightBracket(prevState => prevState - 1);
        }
        if (state.input === "0.") {
          return {
            ...state,
            input: "",
          };
        }
        return {
          ...state,
          result: "",
          input,
        };
      }
    }

    if (action.clear === "AC" || action.clear === "Escape") {
      setDecimal(false);
      setLeftBracket(0);
      setRightBracket(0);
      return {
        ...state,
        result: "",
        input: "",
      };
    }
  }

  if (action.type === "DECIMAL") {
    if (state.input === "") {
      const input = "0.";
      if (inputLengthCheck(input)) {
        return {
          ...state,
          result: message,
        };
      }
      setDecimal(true);
      return {
        ...state,
        input,
      };
    }

    if (!decimal) {
      if (!parseInt(lastEntry) && lastEntry !== "0") {
        const input = state.input.concat("0.");
        if (inputLengthCheck(input)) {
          return {
            ...state,
            result: message,
          };
        }
        setDecimal(true);
        return {
          ...state,
          input,
        };
      }

      const input = state.input.concat(".");
      if (inputLengthCheck(input)) {
        return {
          ...state,
          result: message,
        };
      }
      setDecimal(true);
      return {
        ...state,
        input,
      };
    }

    return {
      ...state,
    };
  }

  if (action.type === "ARITHMETIC") {
    if (parseInt(lastEntry) || lastEntry === "0" || lastEntry === ")") {
      setDecimal(false);
      if (action.symbol === "+") {
        const input = state.input.concat("+");
        if (inputLengthCheck(input)) {
          return {
            ...state,
            result: message,
          };
        }
        return {
          ...state,
          input,
        };
      }
      if (action.symbol === "-") {
        const input = state.input.concat("-");
        if (inputLengthCheck(input)) {
          return {
            ...state,
            result: message,
          };
        }
        return {
          ...state,
          input,
        };
      }
      if (action.symbol === "×" || action.symbol === "*") {
        const input = state.input.concat("×");
        if (inputLengthCheck(input)) {
          return {
            ...state,
            result: message,
          };
        }
        return {
          ...state,
          input,
        };
      }
      if (action.symbol === "/") {
        const input = state.input.concat("/");
        if (inputLengthCheck(input)) {
          return {
            ...state,
            result: message,
          };
        }
        return {
          ...state,
          input,
        };
      }
    }
    return { ...state };
  }

  if (action.type === "SUM") {
    const input = state.input.replace(/×/gi, "*");
    if (inputLengthCheck(input)) {
      return {
        ...state,
        result: message,
      };
    }

    if (sumPressed) {
      setSumPressed(false);
      return {
        ...state,
        input: state.result,
        result: "",
      };
    }

    try {
      if (input !== "") {
        const sum = format(evaluate(input), {
          notation: "auto",
          precision: 14,
          lowerExp: -12,
          upperExp: 12,
        });
        setSumPressed(true);
        return {
          ...state,
          result: sum,
        };
      }
    } catch (err) {
      return {
        ...state,
        result: err.name,
      };
    }
  }

  if (action.type === "BRACKET") {
    let input;
    if (action.bracket === "(") {
      input = state.input.concat("(");
      if (inputLengthCheck(input)) {
        return {
          ...state,
          result: message,
        };
      }
      setLeftBracket(prevState => prevState + 1);
      return {
        ...state,
        input,
      };
    }

    if (action.bracket === ")") {
      if (
        (parseInt(lastEntry) || lastEntry === "0" || lastEntry === ")") &&
        rightBracket < leftBracket
      ) {
        input = state.input.concat(")");
        if (inputLengthCheck(input)) {
          return {
            ...state,
            result: message,
          };
        }
        setRightBracket(prevState => prevState + 1);
        return {
          ...state,
          input,
        };
      }

      return {
        ...state,
      };
    }
  }

  if (action.type === "POS/NEG") {
    if (state.input === "" || lastEntry === "0" || lastEntry === "(") {
      const input = state.input.concat("-");
      if (inputLengthCheck(input)) {
        return {
          ...state,
          result: message,
        };
      }
      return {
        ...state,
        input,
      };
    }
    return {
      ...state,
    };
  }
  return intialState;
};

const Calculator = () => {
  const [decimal, setDecimal] = useState(false);
  const [leftBracket, setLeftBracket] = useState(0);
  const [rightBracket, setRightBracket] = useState(0);
  const [activeElement, setActiveElement] = useState(false);
  const [sumPressed, setSumPressed] = useState(false);

  const reducerArguments = [
    decimal,
    leftBracket,
    rightBracket,
    sumPressed,
    setDecimal,
    setLeftBracket,
    setRightBracket,
    setSumPressed,
  ];

  const [state, dispatchAction] = useReducer(
    (state, action) => reducer(state, action, ...reducerArguments),
    intialState
  );

  //Keypress function
  document.onkeydown = event => {
    keydownHandler(event);
  };

  //Action Handlers
  const keydownHandler = event => {
    if (event.key === "Tab") {
      setActiveElement(true);
    }
    if (event.key === "Enter") {
      setActiveElement(false);
    }
    calculatorActionHandler(event.key);
  };

  const buttonPressHandler = event => {
    calculatorActionHandler(event.target.innerText);
    event.target.blur();
  };

  const calculatorActionHandler = action => {
    if (parseInt(action) || action === "0")
      dispatchAction({ type: "NUMBER", number: action });

    if (
      action === "CE" ||
      action === "AC" ||
      action === "Escape" ||
      action === "Backspace"
    )
      dispatchAction({ type: "CLEAR", clear: action });

    if (action === ".") dispatchAction({ type: "DECIMAL" });

    if (
      action === "+" ||
      action === "-" ||
      action === "×" ||
      action === "/" ||
      action === "*"
    )
      dispatchAction({ type: "ARITHMETIC", symbol: action });

    if ((action === "=" || action === "Enter") && !activeElement)
      dispatchAction({ type: "SUM" });

    if (action === "(" || action === ")")
      dispatchAction({ type: "BRACKET", bracket: action });

    if (action === "+/-") dispatchAction({ type: "POS/NEG" });
  };

  const buttons = [
    ["1", "2", "3", "×"],
    ["4", "5", "6", "-"],
    ["7", "8", "9", "+"],
    ["0", ".", "+/-", "="],
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles["display--result"]}>{state.result}</div>
        <div
          className={styles["display--input"]}
          onKeyDown={buttonPressHandler}
        >
          {state.input}
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.row}>
          <Button buttonPress={buttonPressHandler} button="AC" />
          <Button buttonPress={buttonPressHandler} button="CE" />
          <div
            className={`${buttonStyles.button} ${buttonStyles["button--half"]}`}
          >
            <HalfButton buttonPress={buttonPressHandler} button="(" />
            <HalfButton buttonPress={buttonPressHandler} button=")" />
          </div>
          <Button buttonPress={buttonPressHandler} button="/" />
        </div>

        {buttons.map((_row, i) => (
          <div className={styles.row}>
            {buttons[i].map(button => (
              <Button buttonPress={buttonPressHandler} button={button} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
