export const KELVIN = 'Kelvin';
export const CELSIUS = 'Celsius';
export const FAHRENHEIT = 'Fahrenheit';
export const RANKINE = 'Rankine';
export const LITERS = 'liters';
export const TABLESPOONS = 'tablespoons';
export const CUBIC_INCHES = 'cubic-inches';
export const CUPS = 'cups';
export const CUBIC_FEET = 'cubic-feet';
export const GALLONS = 'gallons';

export const temperatures = [KELVIN, CELSIUS, FAHRENHEIT, RANKINE] as const;
export const volumes = [LITERS, TABLESPOONS, CUBIC_INCHES, CUPS, CUBIC_FEET, GALLONS] as const;
export const allUnits = [...temperatures, ...volumes];
