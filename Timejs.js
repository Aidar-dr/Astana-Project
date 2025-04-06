const inputs = document.querySelectorAll('.input-block input');

function convertTime(value, unit) {
  let seconds;

  switch (unit) {
    case 's':
      seconds = value;
      break;
    case 'min':
      seconds = value * 60;
      break;
    case 'h':
      seconds = value * 3600;
      break;
    case 'd':
      seconds = value * 86400;
      break;
    case 'w':
      seconds = value * 604800;
      break;
  }

  return {
    s: seconds,
    min: seconds / 60,
    h: seconds / 3600,
    d: seconds / 86400,
    w: seconds / 604800
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

    const unitMap = ['s', 'min', 'h', 'd', 'w'];
    const currentUnit = unitMap[index];
    const result = convertTime(value, currentUnit);

    inputs.forEach((targetInput, i) => {
      if (i !== index) {
        const unit = unitMap[i];
        targetInput.value = result[unit].toFixed(4);
      }
    });
  });
});
