class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(char => char !== "");
    this.makeChainsObj();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  // Make Chains as new map
  makeChains() {
    const result = new Map()
    for (let i=0; i<this.words.length;i++){
      if(result.has(this.words[i])){
        
        result.get(this.words[i]).push(this.words[i+1] || null)
        
      }else{
        result.set(this.words[i], [this.words[i+1] || null])
      }
    }
    this.chains = result
}
  // Make Chains as Obj 
  makeChainsObj(){
    const result = {}
    for (let i=0; i< this.words.length;i++){
      if  (result[this.words[i]]){
        result[this.words[i]].push(this.words[i+1] || null)
      } else {
        result[this.words[i]] = [this.words[i+1] || null]
      }
    }
    this.chains = result
  }
  
  getRandomWord(object){ 
    let size = Object.keys(object).length
    let n = Math.floor(Math.random() * size)
    return object[n]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let result = [this.words[0]] // first word
    const chains = this.chains  
    
    const key_null = Object.keys(chains)[Object.keys(chains).length-1]
    
    for(let i=0; i<numWords -1; i++){
      
      let predictions = chains[result[i]] // ['cat','hat']
      
      let random = this.getRandomWord(predictions)
      
      // push a random word , but if word is null choose again.
      if (i !== numWords -2){
        while (random === key_null){
          random = this.getRandomWord(predictions)
          }
        result.push(random)
        
      // if it's the last word, push the key with null value
      } else if(i === numWords-2){
        result.push(key_null)
        
      } else{
        result.push(this.getRandomWord(predictions))
      }
    
    }
    return result.join(" ")
  }
}

module.exports = { MarkovMachine };




