const btnGen = document.getElementById("btn-gen");
const containerBox = document.getElementById("container-box");
const dimBox = document.getElementById("input-dim");
let counterPoint = 0;

addOptionSelect();

btnGen.addEventListener("click",function(){
  reset();
  init();
});

// **************************************
// ************** FUNCTION **************
// **************************************

// FUNCTION CORE APP
function init(){
    // seleziono dimBox
    const countBox = dimBox.value ** 2;
    // --------------------------------------------------------------------
    // genero casualmente la posizione delle bombe da min a max, ultimo numero è la quantità di bombe in % -----> 0.16 = 16%
    const arrayBomb = randomizerUnique(1,countBox,countBox*0.16);
    // --------------------------------------------------------------------
    // 2. Add box
    for(let i=1; i<=countBox; i++){
      // richiamo la creazione di un box
      const box = createBox(i,dimBox.value,arrayBomb);

      // append del box, al containerBox
      containerBox.append(box);
    };
};

// FUNCTION CREA BOX
function createBox(index,dimBox,arrayBomb){
  const newBox = document.createElement("div");
  newBox.className = "box";
  newBox.style.width = 100 / dimBox + "%";
  newBox._boxID = index;
  newBox.addEventListener("click",function(){
    handlerBox(newBox,arrayBomb);
  });
  return newBox;
};

// FUNCTION HANDLERBOX
function handlerBox(box,arrayBomb){
  // rimuovo l'eventListener del click
  // this.removeEventListener("click",handlerBox);
  // console.dir(this);
  console.log("iao");
  console.log(box._boxID);
  // aggiungo la classe clicked o clicked-bomb per il cambio del bg
  if(!(arrayBomb.includes(this._boxID))){
    this.classList.add("clicked");
    counterPoint++;
  }else{
    this.classList.add("clicked-bomb");
    finegioco();
  }
}

// FUNCTION ADD OPTION SELECT
function addOptionSelect(){
  for(i=10; i>=2 ; i--){
    dimBox.innerHTML += `<option value="${i}">${i}x${i}</option>`;
  }
};

// FUNCTION RESET
function reset(){
  containerBox.innerHTML="";
};

// FUNCTION RANDOM UNIQUE NUMBER
/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @param {number} dim 
 * @returns 
 */
// randomizer senza ripetizioni dim:quantità
function randomizerUnique(min,max,dim){
  const randArray = []
  let numRnd;
  let i = 0;
  if(dim <= max - min + 1){
    console.log("randomizer start");
    do{
      numRnd = Math.floor(Math.random()* (max - min + 1) + min);
      if (!(randArray.includes(numRnd))){
        randArray.push(numRnd);
        i++;
      }
    }while(i<dim);
    console.log(randArray);
    console.log("randomizer stop");
  }else{
    console.log("Errore! la dimensione del vettore finale, deve essere inferiore alla quantità di numeri tra min e max");
  }
  return randArray;
}