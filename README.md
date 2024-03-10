<div align="center">

  <h1>Calculator</h1>
  
 
A calculator that uses the [mathjs](https://mathjs.org) library.

<h4>
    <a href="https://excelsior2021.github.io/calculator">View Project</a>
</div>

<br />

<img src="readme_assets/calculator-demo.gif" alt="smash it demo" />

<!-- About the Project -->

## Motivation

I wanted to challenge myself to see if I can create a calculator. Baisc calculators are relatively simple computers but there can be a lot of logic involved. There are levels to the complexity of a calculator. If you think about it, all computers are essentially calculators computing (calculating) binary at the lowest level. The challenge was to create a UI for a calculator that can handle, at the very least, a sequence of arithmetic operations.

## Usage

This calculator is able to perform arithmetic operations. There is logic to reduce syntax errors. Such as:

- Right brackets can only be inserted n(Left bracket) of times
- Operators can not follow each other

You can use a keyboard and/or click the calculator buttons to log valid entries.

- AC - ESC key
- CE - Backspace Key
- Sum - Enter/Return Key
- ×(multiply) - \* Key

Press `=` on the keyboard or Enter/Return twice to have the sum of the input logged.

You can also use the tab key to navigate the buttons of the calculator. By using Tab + Enter/Return, Enter/Return will not evaluate the input until Enter/Return is pressed for a second time.

<!-- TechStack -->

## Tech Stack

### Client

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)

## Approach

The design is minimalist as the focus was on the logic. The calculator buttons would be built from a component. The useState and useReducer hooks were used to ensure a string representation of the input was correctly formated with the correct syntax in order to be processed by mathjs to produce an output. If there are any errors, this would be logged on the calculator.

## Deployment

The application was deployed with GitHub Pages as an SPA.

## Enhancements

This project can be enhanced with the following features:

- Scientific calculator features
