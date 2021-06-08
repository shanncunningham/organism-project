// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) =>{
  return{
    specimenNum: specimenNum,
    dna: dna, 
    mutate(){
      let randomBase = Math.floor(Math.random() * 15) 
      let mutatedBase = returnRandBase();
      while(this.dna[randomBase] === mutatedBase){ 
        mutatedBase = returnRandBase();
      }
      this.dna[randomBase] = mutatedBase;
      return this.dna;
    },
    compareDNA(specimenTwo){
      let counter = 0;
      for(let i=0; i < this.dna.length; i++){
        if (this.dna[i] === specimenTwo.dna[i]){
            counter ++;
          }
      };
      const percentShared = ((counter / this.dna.length) * 100).toFixed(2);
      console.log(`Specimen #${this.specimenNum} and specimen #${specimenTwo.specimenNum} have ${percentShared} % DNA in common`);
    },
    willLikelySurvive(){
      const goodDNA = this.dna.filter(base => base === 'C' || base === 'G');
      return goodDNA.length / this.dna.length >= 0.6;
    }
  };
};

const survivorsArray = [];
let survivorsNumber = 1;

while (survivorsArray.length < 30) {
  let newOrg = pAequorFactory(survivorsNumber, mockUpStrand());
  if (newOrg.willLikelySurvive()){
    survivorsArray.push(newOrg);
  }
  survivorsNumber ++; 
};

/* testing mutate method
const organism = pAequorFactory(1, ['G', 'G', 'T', 'T','G', 'T', 'G', 'A','G', 'G', 'G', 'A','G', 'T', 'A']);
console.log(organism);
console.log(organism.mutate()); 
*/ 


/* testing compare DNA method 
const organism1 = pAequorFactory(1, ['G', 'G', 'G', 'T','G', 'T', 'G', 'A','G', 'G', 'G', 'A','G', 'T', 'A']);
const organism2 = pAequorFactory(3, ['G', 'T', 'T', 'T','G', 'G', 'G', 'G','G', 'A', 'G', 'A','G', 'T', 'A']);
organism1.compareDNA(organism2); 
*/ 

/* testing likely survive method
const organism1 = pAequorFactory(1, ['G', 'G', 'G', 'G','C', 'C', 'C', 'C','G', 'C', 'A', 'A','A', 'T', 'T']);
const organism2 = pAequorFactory(3, ['A', 'A', 'A', 'T', 'T', 'T','T', 'A', 'T', 'A','T', 'A', 'G', 'A','G']);
console.log(organism1.willLikelySurvive()); 
console.log(organism2.willLikelySurvive()); 
*/

/* testing survivor array code
console.log(survivorsArray);
*/ 