/**
 * Interface representing the properties for the Calculator component.
 *
 * @property {Function} onInputChange - Callback function to be invoked when the input value changes.
 * @param {string} value - The new value of the input.
 */
export interface CalculatorProps {
  onInputChange: (value: string) => void; 
}