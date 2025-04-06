const inputs = document.querySelectorAll('.input-block input');

const conversions = {
  "Километры в час (км/ч)": {
    "Километры в час (км/ч)": 1,
    "Мили в час (миль/ч)": 0.621371,
    "Метров в секунду (м/с)": 0.277778,
    "Узлы (knots)": 0.539957,
    "Футы в секунду (ft/s)": 0.911344
  },
  "Мили в час (миль/ч)": {
    "Километры в час (км/ч)": 1.60934,
    "Мили в час (миль/ч)": 1,
    "Метров в секунду (м/с)": 0.44704,
    "Узлы (knots)": 0.868976,
    "Футы в секунду (ft/s)": 1.46667
  },
  "Метров в секунду (м/с)": {
    "Километры в час (км/ч)": 3.6,
    "Мили в час (миль/ч)": 2.23694,
    "Метров в секунду (м/с)": 1,
    "Узлы (knots)": 1.94384,
    "Футы в секунду (ft/s)": 3.28084
  },
  "Узлы (knots)": {
    "Километры в час (км/ч)": 1.852,
    "Мили в час (миль/ч)": 1.15078,
    "Метров в секунду (м/с)": 0.514444,
    "Узлы (knots)": 1,
    "Футы в секунду (ft/s)": 1.68781
  },
  "Футы в секунду (ft/s)": {
    "Километры в час (км/ч)": 1.09728,
    "Мили в час (миль/ч)": 0.681818,
    "Метров в секунду (м/с)": 0.3048,
    "Узлы (knots)": 0.592484,
    "Футы в секунду (ft/s)": 1
  }
};

inputs.forEach(input => {
  input.addEventListener('input', () => {
    const value = parseFloat(input.value);
    if (isNaN(value)) return;

    const label = input.nextElementSibling.innerText.trim();

    const conv = conversions[label];
    if (!conv) return;

    inputs.forEach(otherInput => {
      const otherLabel = otherInput.nextElementSibling.innerText.trim();
      if (otherInput !== input && conv[otherLabel]) {
        otherInput.value = (value * conv[otherLabel]).toFixed(2);
      }
    });
  });
});
