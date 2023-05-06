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
  private _pattern: string
  private _contains: Array<string>
  private _tries: Array<string>
  private _words: Array<string>

  constructor(pattern: string) {
    this._pattern = pattern.toLowerCase()
    this._contains = []
    this._tries = []
    this._words = (allWords as Array<string>).filter((w) => !w.includes('-'))
  }

  public getWords() {

    const regexsErrors = this._contains.map((letter) => this._tries.map((a) => new RegExp(`^${a.split('').map((l) => l === letter ? l :'.').join('')}`))).flat()
    const replacement = '.'
    const regexExcludes = new RegExp(`^${this._pattern.replace(/_/g, replacement)}$`)
    const regexIncludes = new RegExp(this._pattern.replace(/[a-z]/g, '.').replace(/_/g, '(.)'))

    console.log(this._words.length)
    
    this._words = this._words
      .map((w) => withoutAccent(w.toLowerCase()))
      .filter((w) => {
        if (!regexExcludes.test(w)) return false

        if (regexsErrors.some((e) => e.test(w))) return false

        if (this._tries.includes(w)) return false

        const matches = w.match(regexIncludes)
        matches.shift()

        delete matches.index
        delete matches.input
        delete matches.groups

        return this._contains.every((letter) => matches.includes(letter))
      })
    console.log(this._words.length)

    const enrichedWords = this._words.map((word) => {
      const letters = word.split('').filter((l) => !this._contains.includes(l))
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

  public addTry(word: string) {
    this._tries.push(word)
  }

  public getRemainingWordsCount() {
    return this._words.length
  }
}