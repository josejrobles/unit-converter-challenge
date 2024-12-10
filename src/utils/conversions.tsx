import {
  KELVIN,
  CELSIUS,
  FAHRENHEIT,
  RANKINE,
  LITERS,
  TABLESPOONS,
  CUBIC_INCHES,
  CUPS,
  CUBIC_FEET,
  GALLONS
} from '../constants/units';

export const kelvinToCelsius = (kelvin: number): number => kelvin - 273.15;
export const kelvinToFahrenheit = (kelvin: number): number => (1.8 * (kelvin - 273.15)) + 32;
export const kelvinToRankine = (kelvin: number): number => 1.8 * kelvin;

export const celsiusToKelvin = (celcius: number): number => celcius + 273.15;
export const celsiusToFahrenheit = (celcius: number): number => (1.8 * celcius) + 32;
export const celsiusToRankine = (celcius: number): number => (celcius + 273.15) * 1.8;

export const fahreinheitToKelvin = (fahrenheit: number): number => ((5*(fahrenheit - 32))/9) + 273.15;
export const fahreinheitToCelcius = (fahrenheit: number): number => (5 * (fahrenheit - 32)) / 9;
export const fahrenheitToRankine = (fahrenheit: number): number => fahrenheit + 459.67;

export const rankineToKelvin = (rankine: number): number => rankine/1.8;
export const rankineToCelcius = (rankine: number): number => (rankine/1.8) - 273.15;
export const rankineToFahrenheit = (rankine: number): number => rankine - 459.67;

export const litersToTablespoons = (liters: number): number => liters * 67.628;
export const litersToCubicInches = (liters: number): number => liters * 61.024;
export const litersToCups = (liters: number): number => liters * 4.22675;
export const litersToCubicFeet = (liters: number): number => liters * 0.035315;
export const litersToGallons = (liters: number): number => liters * 0.264172;

export const tablespoonsToLiters = (tablespoons: number): number => tablespoons * 0.01478676;
export const tablespoonsToCubicInches = (tablespoons: number): number => tablespoons * 0.90234375;
export const tablespoonsToCups = (tablespoons: number): number => tablespoons * 0.0625;
export const tablespoonsToCubicFeet = (tablespoons: number): number => tablespoons * 0.00052219;
export const tablespoonsToGallons = (tablespoons: number): number => tablespoons * 0.00390625;

export const cubicInchesToLiters = (cubicInches: number): number => cubicInches * 0.01638706;
export const cubicInchesToTablespoons = (cubicInches: number): number => cubicInches * 1.10822511;
export const cubicInchesToCups = (cubicInches: number): number => cubicInches * 0.06926407;
export const cubicInchesToCubicFeet = (cubicInches: number): number => cubicInches * 0.0005787;
export const cubicInchesToGallons = (cubicInches: number): number => cubicInches * 0.004329;

export const cupsToLiters = (cups: number): number => cups * 0.23658824;
export const cupsToTablespoons = (cups: number): number => cups * 16;
export const cupsToCubicInches = (cups: number): number => cups * 14.4375;
export const cupsToCubicFeet = (cups: number): number => cups * 0.00835503;
export const cupsToGallons = (cups: number): number => cups * 0.0625;

export const cubicFeetToLiters = (cubicFeet: number): number => cubicFeet * 28.3168466;
export const cubicFeetToTablespoons = (cubicFeet: number): number => cubicFeet * 1915.01299;
export const cubicFeetToCubicInches = (cubicFeet: number): number => cubicFeet * 1728;
export const cubicFeetToCups = (cubicFeet: number): number => cubicFeet * 119.688312;
export const cubicFeetToGallons = (cubicFeet: number): number => cubicFeet * 7.48051948;

export const gallonsToLiters = (gallons: number): number => gallons * 3.78541178;
export const gallonsToTablespoons = (gallons: number): number => gallons * 256;
export const gallonsToCubicInches = (gallons: number): number => gallons * 231;
export const gallonsToCups = (gallons: number): number => gallons * 16;
export const gallonsToCubicFeet = (gallons: number): number => gallons * 0.13368056;


export const conversionMap: { [key: string]: {[key: string]: ((arg0: number) => number) } } = {
  [KELVIN]: {
    [CELSIUS]: kelvinToCelsius,
    [FAHRENHEIT]: kelvinToFahrenheit,
    [RANKINE]: kelvinToRankine
  },
  [CELSIUS]: {
    [KELVIN]: celsiusToKelvin,
    [FAHRENHEIT]: celsiusToFahrenheit,
    [RANKINE]: celsiusToRankine
  },
  [FAHRENHEIT]: {
    [KELVIN]: fahreinheitToKelvin,
    [CELSIUS]: fahreinheitToCelcius,
    [RANKINE]: fahrenheitToRankine
  },
  [RANKINE]: {
    [KELVIN]: rankineToKelvin,
    [CELSIUS]: rankineToCelcius,
    [FAHRENHEIT]: rankineToFahrenheit,
  },
  [LITERS]: {
    [TABLESPOONS]: litersToTablespoons,
    [CUBIC_INCHES]: litersToCubicInches,
    [CUPS]: litersToCups,
    [CUBIC_FEET]: litersToCubicFeet,
    [GALLONS]: litersToGallons
  },
  [TABLESPOONS]: {
    [LITERS]: tablespoonsToLiters,
    [CUBIC_INCHES]: tablespoonsToCubicInches,
    [CUPS]: tablespoonsToCups,
    [CUBIC_FEET]: tablespoonsToCubicFeet,
    [GALLONS]: tablespoonsToGallons
  },
  [CUBIC_INCHES]: {
    [LITERS]: cubicInchesToLiters,
    [TABLESPOONS]: cubicInchesToTablespoons,
    [CUPS]: cubicInchesToCups,
    [CUBIC_FEET]: cubicInchesToCubicFeet,
    [GALLONS]: cubicInchesToGallons
  },
  [CUPS]: {
    [LITERS]: cupsToLiters,
    [TABLESPOONS]: cupsToTablespoons,
    [CUBIC_INCHES]: cupsToCubicInches,
    [CUBIC_FEET]: cupsToCubicFeet,
    [GALLONS]: cupsToGallons
  },
  [CUBIC_FEET]: {
    [LITERS]: cubicFeetToLiters,
    [TABLESPOONS]: cubicFeetToTablespoons,
    [CUBIC_INCHES]: cubicFeetToCubicInches,
    [CUPS]: cubicFeetToCups,
    [GALLONS]: cubicFeetToGallons
  },
  [GALLONS]: {
    [LITERS]: gallonsToLiters,
    [TABLESPOONS]: gallonsToTablespoons,
    [CUBIC_INCHES]: gallonsToCubicInches,
    [CUPS]: gallonsToCups,
    [CUBIC_FEET]: gallonsToCubicFeet
  }
};

export const areAllNonNullValues = (obj: { [key: string]: string | null }, keys: string[]): obj is { [key: string]: string } =>
  keys.every(key => obj[key] !== null && obj[key] !== '' && (typeof obj[key] === 'string'));

export const isNumberOrDecimal = (value: string): boolean =>  {
  const regex = /^\d*\.?\d+$/;
  return regex.test(value);
};
