import allWords from 'an-array-of-french-words'

const vowels = 'aeiou'

const withoutAccent = (value: string) => {
  return value.replace(/[ÀÁÂÃÄÅ]/g, 'A')
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[ÒÓÔÕÖ]/g, 'O')
    .replace(/[òóôõöø]/g, 'o')
    .replace(/[ÈÉÊË]/g, 'E')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ÌÍÎÏ]/g, 'I')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[ÙÚÛÜ]/g, 'U')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ÝŸ]/g, 'Y')
    .replace(/[ýÿ]/g, 'y')
    .replace(/Ç/g, 'C')
    .replace(/ç/g, 'c')
    .replace(/Ñ/g, 'N')
    .replace(/ñ/g, 'n')
    .replace(/Æ/g, 'AE')
    .replace(/æ/g, 'ae')
    .replace(/Œ/g, 'OE')
    .replace(/œ/g, 'oe')
}

export default class Resolver {
  private _words: Array<string>

  constructor() {
    this._words = (allWords as Array<string>).filter((w) => !w.includes('-'))
  }

  public getWords(pattern: string, containedLetters: Array<string>, tries: Array<string>) {
    const contains = containedLetters.map((l) => l.toLowerCase())
    const found = [...new Set(pattern.replace(/\./g, '').split(''))]
    const notContains = [...new Set(tries.join('').split('').filter((l) => !found.includes(l) && !contains.includes(l)))].join('')
    const regexsErrors = contains.map((letter) => tries.map((a) => new RegExp(`^${a.split('').map((l) => l === letter ? l :'.').join('')}`))).flat()
    const replacement = notContains ? `[^${notContains.replace(/[^a-z]/g, '')}]` : '.';
    const regexExcludes = new RegExp(`^${pattern.replace(/\./g, replacement)}$`)
    const regexIncludes = new RegExp(pattern.replace(/[a-z]/g, '.').replace(/\./g, '(.)'))
    
    console.log('found', found);
    console.log('notContains', notContains);
    console.log('replacement', replacement);

    this._words = this._words
      .map((w) => withoutAccent(w.toLowerCase()))
      .filter((w) => {
        if (!regexExcludes.test(w)) return false

        if (regexsErrors.some((e) => e.test(w))) return false

        if (tries.includes(w)) return false

        const matches = w.match(regexIncludes)
        matches.shift()

        delete matches.index
        delete matches.input
        delete matches.groups

        return contains.every((letter) => matches.includes(letter))
      })

    const enrichedWords = this._words.map((word) => {
      const letters = word.split('').filter((l) => !contains.includes(l))
      const wordsVowels = [...new Set(letters.filter((l) => vowels.includes(l)))].length
      const wordsConsonants = [...new Set(letters.filter((l) => !vowels.includes(l)))].length

      return {
        word,
        score: wordsVowels * 2 + wordsConsonants
      }
    })

    enrichedWords.sort((a, b) => b.score - a.score)

    return [...new Set(enrichedWords)].slice(0, 5).map(({ word }) => word)
  }

  public getRemainingWordsCount() {
    return this._words.length
  }
}