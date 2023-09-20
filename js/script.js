const btnGen = document.getElementById("btn-gen");
const containerBox = document.getElementById("container-box");
const dimBox = document.getElementById("input-dim");
let counterPoint = 0;
let arrayBomb = [];
let countBox = 0;

addOptionSelect();
// reset();
// init();

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
    countBox = dimBox.value ** 2;
    // --------------------------------------------------------------------
    // genero casualmente la posizione delle bombe da min a max, ultimo numero è la quantità di bombe in % -----> 0.16 = 16%
    arrayBomb = randomizerUnique(1,countBox,countBox*0.15);
    // --------------------------------------------------------------------
    // 2. Add box
    for(let i=1; i<=countBox; i++){
      // richiamo la creazione di un box
      const box = createBox(i);

      // append del box, al containerBox
      containerBox.append(box);
    };
};

// FUNCTION CREA BOX
function createBox(index){
  const newBox = document.createElement("div");
  newBox.className = "box";
  newBox.style.width = 100 / dimBox.value + "%";
  newBox._boxID = index;
  newBox.addEventListener("click",handlerBox);
  return newBox;
};

// FUNCTION HANDLERBOX EVENT LISTENER CLICK
function handlerBox(){
  // rimuovo l'eventListener del click
  this.removeEventListener("click",handlerBox);
  // console.dir(this);
  console.log("boxID: ",this._boxID);

  // aggiungo la classe clicked o clicked-bomb per il cambio del bg
  if(!(arrayBomb.includes(this._boxID))){
    // richiamo la funzione per sapere quante bombe ci sono nelle vicinanze
    this.innerHTML = nearbyBomb(this._boxID);

    this.classList.add("clicked");
    counterPoint++;
    if(counterPoint === countBox - arrayBomb.length){
      endGame("win");
    }
  }else{
    this.classList.add("clicked-bomb");
    endGame("lose");
  }
  return this;
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
  counterPoint = 0;
};

// FUNCTION RANDOM UNIQUE NUMBER ARRAY
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

// FUNCTION FINE GIOCO
function endGame(event){
  let text = "";
  viewBomb();
  if(event === "lose"){
    text = "PERSO! Ti è esplosa una bomba tra le mani!";
  }else{
    text = "VINTO! Hai schivato tutte le bombe!";
  }
  containerBox.innerHTML += `
  <div class="hover">
    <p class="fs-3 fw-bold text-white">Hai totalizzato: ${counterPoint} punti</p>
    <p class="fs-2 fw-bold text-white">${text}</p>
  </div>
  `;
}

// FUNCTION viewBomb
function viewBomb(){
  const allBox = document.getElementsByClassName("box");
  for( i = 0 ; i < allBox.length; i++){
    // controllo tutti gli elementi box, se sono bombe le mostro
    if(arrayBomb.includes(allBox[i]._boxID)){
      allBox[i].classList.add("clicked-bomb");
    }
    // su tutti i box rimuovo l' EventListener click
    allBox[i].removeEventListener("click",handlerBox);
  }
}

// FUNCTION NEARBY BOMB
function nearbyBomb(id){
  const dim = parseInt(dimBox.value);
  let counterNearbyBomb = 0
  if(id === 1){
    // elemento in alto a SX
    console.log("-> elemento in alto a SX")
    // --------------------------------------------
    if(arrayBomb.includes(id + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim + 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if(id === dim){
    // elemento in alto a DX
    console.log("-> elemento in alto a DX")
    // --------------------------------------------
    if(arrayBomb.includes(id - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim - 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if(id === countBox - dim + 1){
    // elemento in basso a SX
    console.log("-> elemento in basso a SX")
    // --------------------------------------------
    if(arrayBomb.includes(id - dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if(id === countBox){
    // elemento in basso a DX
    console.log("-> elemento in basso a DX")
    // --------------------------------------------
    if(arrayBomb.includes(id - dim - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if(id > 1 && id < dim ){
    // first row
    console.log("-> first row")
    // --------------------------------------------
    if(arrayBomb.includes(id - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim + 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if(id > countBox - dim + 1 && id < countBox){
    // last row
    console.log("-> last row")
    // --------------------------------------------
    if(arrayBomb.includes(id - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim + 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if(((id - 1) % dim) == 0){
    // es. dim = 10, il mio id è 11,21,31,..., sottraggo 1 e controllo il resto con il modulo
    // first col
    console.log("-> first col");
    // --------------------------------------------
    if(arrayBomb.includes(id + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim + 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else
  if((id % dim) == 0){
    // es. dim = 10, il mio id è 20,30,40,..., controllo il resto con il modulo
    // last col
    console.log("-> last col");
    // --------------------------------------------
    if(arrayBomb.includes(id - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim - 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }else{
    // tutto quello che rimane è il centro
    // blocco centrale
    console.log("-> center");
    // --------------------------------------------
    if(arrayBomb.includes(id - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id - dim + 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim - 1)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim)){
      counterNearbyBomb++;
    }
    if(arrayBomb.includes(id + dim + 1)){
      counterNearbyBomb++;
    }
    // --------------------------------------------
  }
  
  return counterNearbyBomb;
}