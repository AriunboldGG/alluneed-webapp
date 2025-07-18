// Utility functions for calculator functionality

export const addToCalculator = (item) => {
  // Dispatch custom event to notify calculator bar
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('calculator:item-added', {
      detail: { item }
    }));
  }
};

export const removeFromCalculator = (item) => {
  // Dispatch custom event to notify calculator bar
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('calculator:item-removed', {
      detail: { item }
    }));
  }
};

export const getCalculatorCount = () => {
  // This could be enhanced to get count from localStorage or state management
  return 0;
}; 