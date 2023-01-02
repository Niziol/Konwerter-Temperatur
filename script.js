const temperatureInput = document.querySelector('#converter');
const result = document.querySelector('.result');
const convertBtn = document.querySelector('.conv');
const resetBtn = document.querySelector('.reset');
const changeBtn = document.querySelector('.change');
const symbolBtns = document.querySelectorAll('.symbols');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const numbers = /[0-9]/;

const trimKelvin = (string) => {
	return string.replaceAll('°K', 'K');
};

const parseSymbol = (symbol) => {
	return symbol.replace('°', '');
};

const parseTemperature = (value) => {
	if (value === '' || !value.match(numbers)) {
		return null;
	}
	return parseFloat(value);
};

const convertCelsiusToFahrenheit = (celsius) => {
	return celsius * 1.8 + 32;
};

const convertCelsiusToKelvin = (celsius) => {
	return celsius + 273.15;
};

const convertCelsiusToRankine = (celsius) => {
	return celsius * 1.8 + 491.67;
};

const convertFahrenheitToCelsius = (fahrenheit) => {
	return (fahrenheit - 32) / 1.8;
};

const convertFahrenheitToKelvin = (fahrenheit) => {
	return (fahrenheit + 459.67) / 1.8;
};

const convertFahrenheitToRakine = (fahrenheit) => {
	return fahrenheit + 459.67;
};

const convertKelvinToCelsius = (kelvin) => {
	return kelvin - 273.15;
};

const convertKelvinToFahrenheit = (kelvin) => {
	return kelvin * 1.8 - 459.67;
};

const convertKelvinToRakine = (kelvin) => {
	return kelvin * 1.8;
};

const convertRankineToCelsius = (rankine) => {
	return rankine / 1.8 - 273.15;
};

const convertRankineToFahrenheit = (rankine) => {
	return rankine - 459.67;
};

const convertRankineToKelvin = (rankine) => {
	return rankine / 1.8;
};

const conversionFunctions = {
	'C-F': convertCelsiusToFahrenheit,
	'C-K': convertCelsiusToKelvin,
	'C-R': convertCelsiusToRankine,
	'F-C': convertFahrenheitToCelsius,
	'F-K': convertFahrenheitToKelvin,
	'F-R': convertFahrenheitToRakine,
	'K-C': convertKelvinToCelsius,
	'K-F': convertKelvinToFahrenheit,
	'K-R': convertKelvinToRakine,
	'R-C': convertRankineToCelsius,
	'R-F': convertRankineToFahrenheit,
	'R-K': convertRankineToKelvin,
};

const calculateTemperature = (symbolOne, symbolTwo, temperature) => {
	const conversionFunction = conversionFunctions[`${symbolOne}-${symbolTwo}`];
	return conversionFunction ? conversionFunction(temperature).toFixed(2) : null;
};

const convertion = () => {
	const temperature = parseTemperature(temperatureInput.value);
	if (temperature === null) {
		result.textContent = 'Musisz podać jakąś wartość!';
		return;
	}

	const symbolOne = parseSymbol(one.textContent);
	const symbolTwo = parseSymbol(two.textContent);
	const convertedTemperature = calculateTemperature(
		symbolOne,
		symbolTwo,
		temperature
	);

	if (convertedTemperature === null) {
		result.textContent = `Nie ma takiej możliwości konwersji!`;
		return;
	}

	result.textContent = trimKelvin(
		`${temperature}°${symbolOne} to ${convertedTemperature}°${symbolTwo}`
	);
};

const selectSymbol = (element, e) => {
	const symbol = e.target.textContent.slice(0, 1);
	element.textContent = trimKelvin('°' + symbol);
};

const resetConverter = () => {
	temperatureInput.value = '';
	result.textContent = '';
	one.textContent = '°C';
	two.textContent = '°F';
};

const swapSymbolsInText = () => {
	const temp = one.textContent;
	one.textContent = two.textContent;
	two.textContent = temp;
	result.textContent = '';
};

convertBtn.addEventListener('click', convertion);
resetBtn.addEventListener('click', resetConverter);
changeBtn.addEventListener('click', swapSymbolsInText);
symbolBtns.forEach((symbolBtn) => {
	symbolBtn.addEventListener('click', (event) => {
		if (event.detail === 1) {
			timer = setTimeout(() => {
				selectSymbol(one, event);
			}, 300);
		}
	});
	symbolBtn.addEventListener('dblclick', (event) => {
		clearTimeout(timer);
		selectSymbol(two, event);
	});
});
