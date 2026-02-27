/**
 * Format a number to currency format
 * @param {number} value Number to format
 * @param {string} currency Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(value);
};

/**
 * Capitalize the first letter of a string
 * @param {string} text Text to format
 * @returns {string} Capitalized string
 */
export const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
};
