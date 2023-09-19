# Esercizio: Griglia Campo Minato
nome repo: js-campominato-grid

## Consegna
L’utente clicca su un bottone che genererà una griglia di gioco quadrata.

Ogni cella ha un numero progressivo, da 1 a 100.

Ci saranno quindi 10 caselle per ognuna delle 10 righe.

Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

## Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:

- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;

- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;

- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

## Logica

1. Al click del bottone, esegue un ciclo di n iterazioni, nel primo caso 100

2. Ad ogni iterazione, creiamo un elemento che sarà il nostro quadrato e facciamo l'append al contenitore padre

3. Quando creiamo l'elemento quadrato aggiungiamo un eventListner per il click

4. all'evento click aggiungiamo o togliamo una classe css, che cambia il colore, e stampiamo il numero della cella, che abbiamo associato alla creazione del quadrato