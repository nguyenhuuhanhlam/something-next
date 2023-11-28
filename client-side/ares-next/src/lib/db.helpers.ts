export const ParseDateString = (v) => v ? '"' + v.slice(0,10) + '"' : 'NULL'
export const ParseString = (v) => v ? '"' + v + '"' : 'NULL'