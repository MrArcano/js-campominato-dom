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
    // genero casualmente la posizione delle bombe da min a max, ultimo numero è la quantità di bombe in % -----> 0.15 = 15%
    const arrayBomb = randomizerUnique(1,countBox,countBox*0.16);
    // --------------------------------------------------------------------
    // 2. Add box
    for(let i=1; i<=countBox; i++){
      // richiamo la creazione di un box
      const box = createBox(i,dimBox.value);

      // append del box, al containerBox
      containerBox.append(box);
    };
};

// FUNCTION CREA BOX
function createBox(index,dimBox){
  const newBox = document.createElement("div");
  newBox.className = "box";
  newBox.style.width = 100 / dimBox + "%";
  newBox._boxID = index;
  newBox.addEventListener("click",handlerBox);
  return newBox;
};

// FUNCTION HANDLERBOX
function handlerBox(){
  // rimuovo l'eventListener del click
  this.removeEventListener("click",handlerBox);
  // console.dir(this);
  console.log(this._boxID);
  // aggiungo la classe clicked per il cambio del bg
  this.classList.add("clicked");
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

