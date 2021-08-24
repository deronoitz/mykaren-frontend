/**
 * Get object value safely if the object is deeply nested
 * @param {Array<String>} keys - Object key you want to traverse
 * @param {Object} object - The targeted object
 */
export function getSafely(keys, object) {
  return keys.reduce((acc, val) => (acc === null || acc === undefined ? null : acc[val]), object);
}

/**
 * Get image src
 * @param {Object} file - File object
 * @param {Function} callback - Callback function which recieve the result
 */
export function previewImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  };
}

/**
 * Helper to reselect dropdown value to implement language changes
 * @param {Array<Object>|Object} selected - array or object containing selected dropdown value
 * @param {Array<Object>} options - list of object to compare and get the same value
 */
export function reselect(selected, options) {
  const isSingle = !Array.isArray(selected);

  if (isSingle) {
    return options.filter((item) => item.value === selected.value)[0];
  } else {
    const selectedValue = selected.map((x) => x.value);
    return options.filter((item) => selectedValue.includes(item.value));
  }
}
