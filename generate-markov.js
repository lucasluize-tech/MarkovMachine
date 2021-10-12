const {argv, exit} = require('process')
const axios = require('axios')
const { readFile } = require('fs');
const markov = require("./markov")

function makeText(text){
    let m = new markov.MarkovMachine(text)
    console.log(m.makeText())
}
async function getTextFromUrl(url){
    let res;
    try {
        res = await axios.get(url)
    } catch (err){
        console.log(err)
        exit(1)
    }
    makeText(res.data)   
  }
  
  function getTextFromFile(path){
    readFile(path, 'utf8', (err, data)=>{
      if(err){
          console.log('Error reading', path)
          console.log('Code:', err.code)
          exit(1)
      }
      makeText(data)
    })  
  }
  
  let [method, path] = argv.slice(2)
  console.log (`method: ${method}, path: ${path}`)
  
  if (method =="file"){
    
    console.log(`...generated text from file "${argv[3]}" ...\n`)
    getTextFromFile(path)
    
  } else if (method ==="url"){
    
    console.log(`...generated text from url "${argv[3]}" ...\n`)
    getTextFromUrl(path)
  
  }
  