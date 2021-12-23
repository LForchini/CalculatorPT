# Calculator App

This is a project made by the apprentices at Playtech given to us by our manager.
It's meant to a be a quick practice project.

By: Bev, Bence, Jeric, Brook, and Leo

## Requirements

### Need to have

1. User can input numbers one digit at a time.
1. User can input a negative for negative numbers.
1. User can delete input digits.
1. User can clear the expression.
1. User can input decimal numbers.
1. User can input operations to perform on the numbers.
1. User can input brackets to change order of operations.
1. User can carry out multiple operations in one expression.
1. User can see the current state of the expression.
1. User can cause the expression to be evaluated according to the rules of BIDMAS.
1. User can evaluate the same expression multiple times without inputting it again.
1. User recieves error messages when evaluating invalid expression (div by 0).
1. User can only input a certain amount of digits per number (to clarify w/ Vic).

### Nice to have

1. User can open a menu for more complicated operations / scientific.
1. User can input the expression directly using the keyboard.
1. User can copy an expression and have it evaluate.
1. User can see a history of evaluated expressions (saved in local storage).
1. Test things
1. User can select constants to include in the expression.
1. The result of the previous expression is stored (maybe in ans variable, maybe implied)
1. User can insert digits in the middle of numbers.

### Tasks

User want to action because reason

1. Create outline of calculator with buttons and text input field
1. Implement button press logic
1. Expression evaluation function

## Installation

### Requirements

This project is React.js based, and includes TailwindCSS, however these are both downloaded during the installation below.
`npm` is required for the installation procedure, and is acquired by downloading NodeJS from either the Software Center or the [NodeJS Website](https://nodejs.org).

### Setting up

1. Download the repository by executing `git clone git@github.com:LForchini/CalculatorPT.git`.
   If that doesn't work, try downloading it using https with `git clone https://github.com/LForchini/CalculatorPT.git`.
1. Move into the directory using `cd CalculatorPT`.
1. Install project requirements using `npm i`.
   This will automatically download all of the dependencies and devDependencies to compatible versions.
1. Install `npm i howler` and `npm i antd` in order to access the sound and toggle features.

   

### Accessing the website

- `npm start` will run a test development server which will run on `localhost:3000`.
  This should open automatically in your default browser.
- `npm run build` will build an optimised production version of the website, which can be found in the generated `build` directory.
- We also have a GitHub Page hosting this website which can be accessed [here](https://LForchini.github.io/CalculatorPT).
  This is updated with every push to main.
