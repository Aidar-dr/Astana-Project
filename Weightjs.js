const inputs = document.querySelectorAll('.input-block input');

function convertWeight(value, unit) {
  let kg;

  switch (unit) {
    case 'kg':
      kg = value;
      break;
    case 'g':
      kg = value / 1000;
      break;
    case 'lb':
      kg = value * 0.453592;
      break;
    case 'oz':
      kg = value * 0.0283495;
      break;
    case 't':
      kg = value * 1000;
      break;
  }

  return {
    kg: kg,
    g: kg * 1000,
    lb: kg / 0.453592,
    oz: kg / 0.0283495,
    t: kg / 1000
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

    const unitMap = ['kg', 'g', 'lb', 'oz', 't'];
    const currentUnit = unitMap[index];
    const result = convertWeight(value, currentUnit);

    inputs.forEach((targetInput, i) => {
      if (i !== index) {
        const unit = unitMap[i];
        targetInput.value = result[unit].toFixed(4);
      }
    });
  });
});
