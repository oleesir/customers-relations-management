/**
 * @param {string} str
 *
 * @returns {string} camelCase
 */
const snakeToCamelCase = (str) => {
  const caseMatch = /_[a-z]{1}/;
  const [matcher] = str.match(caseMatch) || [];

  if (matcher) {
    return str.replace(caseMatch, matcher[1].toUpperCase());
  }
  return str;
};


export default snakeToCamelCase;
