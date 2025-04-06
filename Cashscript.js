const API_KEY = '0c24ebf0ee57627c1b58d170';
let exchangeRates = {};
let baseCurrency = 'USD';

const inputBlocks = document.querySelectorAll('.input-block');
const inputs = document.querySelectorAll('.input-block input');
const resultLabels = document.querySelectorAll('.result-label');

async function fetchExchangeRates() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
    const data = await response.json();
    
    if (data.result === 'success') {
      exchangeRates = data.conversion_rates;
      console.log('Курсы валют успешно загружены:', exchangeRates);
      if (!exchangeRates[baseCurrency]) {
        exchangeRates[baseCurrency] = 1;
      }
    } else {
      console.error('Ошибка при получении курсов валют:', data['error-type']);
      loadFallbackRates();
    }
  } catch (error) {
    console.error('Ошибка сети:', error);
    loadFallbackRates();
  }
}

function loadFallbackRates() {
  exchangeRates = {
    "USD": 1,
    "EUR": 0.93,
    "GBP": 0.80,
    "RUB": 92.50,
    "KZT": 450.50
  };
  console.warn('Используются резервные курсы валют');
}

function getCurrencyCode(text) {
  const match = text.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : null;
}

function convertCurrency(inputElement) {
  const value = parseFloat(inputElement.value);
  
  if (isNaN(value)) {
    // Очищаем другие поля, если введено не число
    inputs.forEach(input => {
      if (input !== inputElement) {
        input.value = '';
      }
    });
    return;
  }

  const inputBlock = inputElement.closest('.input-block');
  const label = inputBlock.querySelector('.result-label').textContent;
  const fromCurrency = getCurrencyCode(label);
  
  if (!fromCurrency || !exchangeRates[fromCurrency]) {
    console.error('Неизвестная валюта:', fromCurrency);
    return;
  }

  inputs.forEach(otherInput => {
    if (otherInput !== inputElement) {
      const otherBlock = otherInput.closest('.input-block');
      const otherLabel = otherBlock.querySelector('.result-label').textContent;
      const toCurrency = getCurrencyCode(otherLabel);
      
      if (toCurrency && exchangeRates[toCurrency]) {
        otherInput.value = ((value / exchangeRates[fromCurrency]) * exchangeRates[toCurrency]).toFixed(4);
      }
    }
  });
}

fetchExchangeRates();

inputs.forEach(input => {
  input.addEventListener('input', () => convertCurrency(input));
});