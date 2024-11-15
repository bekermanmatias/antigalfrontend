// src/utils/formatCamelCase.js

/**
 * Formatea una cadena de texto para que cada palabra comience con mayúscula.
 * 
 * @param {string} text - La cadena de texto que se desea formatear.
 * @return {string} - La cadena formateada en CamelCase.
 */
const formatCamelCase = (text) => {
    // Excepciones comunes que no deberían estar en mayúsculas
    const exceptions = ['e', 'y', 'de', 'en', 'el', 'la', 'los', 'las'];

    return text
        .split(' ') // Divide el texto en palabras
        .map(word => {
        // Si es una palabra de excepción, la devolvemos en minúscula
        if (exceptions.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }
        // De lo contrario, la formateamos con la primera letra en mayúscula
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' '); // Unimos las palabras nuevamente en una cadena
};

export default formatCamelCase;
  