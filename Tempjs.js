const inputs = document.querySelectorAll('.input-block input');

function convertTemperature(value, unit) {
  let celsius;

  switch (unit) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    case 'Re':
      celsius = value * 1.25;
      break;
    case 'Ra':
      celsius = (value - 491.67) * 5 / 9;
      break;
  }

  return {
    C: celsius,
    F: (celsius * 9 / 5) + 32,
    K: celsius + 273.15,
    Re: celsius * 0.8,
    Ra: (celsius + 273.15) * 9 / 5
  };
}

inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const value = parseFloat(input.value.replace(',', '.'));

    if (isNaN(value)) {
      inputs.forEach(i => {
        if (i !== input) i.value = '';
      });
      return;
    }

    const unitMap = ['C', 'F', 'K', 'Re', 'Ra'];
    const currentUnit = unitMap[index];
    const result = convertTemperature(value, currentUnit);

    inputs.forEach((targetInput, i) => {
      if (i !== index) {
        const unit = unitMap[i];
        targetInput.value = result[unit].toFixed(2);
      }
    });
  });
});
