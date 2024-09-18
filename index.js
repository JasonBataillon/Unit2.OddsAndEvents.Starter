// TODO: this file! :)
// === State ===

const state = {
  numBank: [],
  Odds: [],
  Evens: [],
};

/** Moves the input number */

function addToNumberBank() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const numberInput = document.querySelector('#number');
    const number = parseInt(numberInput.value, 10);

    if (!isNaN(number) && number !== '') {
      state.numBank.push(number);
      numberInput.value = '';
      render();
    }
  });
}

// === Render ===

/** Renders numbers in the number bank */

function renderInputNumber() {
  const startingInputNumber = state.numBank.map((number) => {
    const span = document.createElement('span');
    span.textContent = number + ', ';

    function moveNumber() {
      const index = state.numBank.indexOf(number);
      if (index !== -1) {
        state.numBank.splice(index, 1);
        if (number % 2 === 1) {
          state.Odds.push(number);
        } else {
          state.Evens.push(number);
        }
        render();
      }
    }

    span.addEventListener('click', () => {
      moveNumber();
      render();
    });
    return span;
  });

  const numberBank = document.querySelector('#numberBank output');
  numberBank.replaceChildren(...startingInputNumber);
}

/** Renders the input in the odds output section */

function renderOddsInput() {
  const oddsInput = state.Odds.map((input) => {
    const span = document.createElement('span');
    span.textContent = input + ', ';
    return span;
  });
  const oddsOutput = document.querySelector('#odds output');
  oddsOutput.replaceChildren(...oddsInput);
}

/** Renders the input in the evens output section */

function renderEvensInput() {
  const evensInput = state.Evens.map((input) => {
    const span = document.createElement('span');
    span.textContent = input + ', ';
    return span;
  });
  const evensOutput = document.querySelector('#evens output');
  evensOutput.replaceChildren(...evensInput);
}

function render() {
  renderInputNumber();
  renderOddsInput();
  renderEvensInput();
}

// === Sort buttons functions ===

function sortOne() {
  if (state.numBank.length > 0) {
    const number = state.numBank.pop();
    if (number % 2 === 1) {
      state.Odds.push(number);
    } else {
      state.Evens.push(number);
    }
    render();
  }
}
function sortAll() {
  for (const number of state.numBank) {
    if (number % 2 === 1) {
      state.Odds.push(number);
    } else {
      state.Evens.push(number);
    }
  }
  state.numBank = [];
  render();
}

// === Sort button event listeners

document.querySelector('#sortOne').addEventListener('click', (event) => {
  event.preventDefault();
  sortOne();
});

document.querySelector('#sortAll').addEventListener('click', (event) => {
  event.preventDefault();
  sortAll();
});

// === Script ===

//Initial render

render();
addToNumberBank();
