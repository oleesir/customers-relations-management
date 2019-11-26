import snakeToCamelCase from './snakeToCamelCase';
/**
 * @param {array} result
 *
 * @returns {array} camelCase
 */
const mapResultToCamelCase = (result) => result.map((row) => {
  const rowEntries = Object.entries(row);
  const convertedRow = {};

  rowEntries.forEach(([key, value]) => {
    convertedRow[snakeToCamelCase(key)] = value;
  });

  return convertedRow;
});

export default mapResultToCamelCase;
