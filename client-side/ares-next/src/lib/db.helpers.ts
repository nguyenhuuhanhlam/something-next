export const ParseDateString = (v) => v ? '"' + v.slice(0,10) + '"' : 'NULL'
export const ParseString = (v) => v ? '"' + v + '"' : 'NULL'
export const ParseCurrencyToInt = (v) => v ? v.split('|')[0] : 'NULL'