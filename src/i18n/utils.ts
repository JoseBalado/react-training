export function getBrowserLocale(): string {
  return (
    (navigator.languages &&
      navigator.languages[0] &&
      navigator.languages[0].split(/[-_]/)[0]) ||
    (navigator.language && navigator.language.split(/[-_]/)[0]) ||
    'en'
  );
}

export function flattenMessages(object: any, prefix: string = '') {
  return Object.keys(object).reduce((transaltions, key) => {
    const value = object[key];
    const prefixedKey: string = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      (transaltions as any)[prefixedKey] = value;
    } else {
      Object.assign(transaltions, flattenMessages(value, prefixedKey));
    }

    return transaltions;
  }, {});
}
