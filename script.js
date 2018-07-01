const memoryGame = {
    divboard: null, //div z planszą
    divscore: null, //div z wynikiem
    tileamount: 24, //liczba kafelkow
    tilerow: 6, //liczba kafelków w wierszu
    tiles: [], //pusta tablica na wymieszane kafelki
    tilesselected: [], // pusta tablica na sprawdzone (kliknięte) kafelki
    movenumber: 0, //liczba ruchów
    tilesimg: [ //grafiki kafelków
        'images/tile1.png',
        'images/tile2.png',
        'images/tile3.png',
        'images/tile4.png',
        'images/tile5.png',
        'images/tile6.png',
        'images/tile7.png',
        'images/tile8.png',
        'images/tile9.png',
        'images/tile10.png',
        'images/tile11.png',
        'images/tile12.png'
    ],
    clickpos: true, //czy można klikać na kafelki
    tiledual: 0, //liczba kafelków, które są dopasowane

    //(el) - krótkie odniesienie var do eventu

    tileClick : function(el) {
        if (this.clickpos) {
            //jeżeli jeszcze nie pobraliśmy 1 elementu
            //lub jeżeli index tego elementu nie istnieje w pobranych...
            if (!this.tilesselected[0] || (this.tilesselected[0].dataset.index !== el.target.dataset.index)) {
                this.tilesselected.push(el.target);
                el.target.style.backgroundImage = 'url(' + this.tilesimg[el.target.dataset.cardType] + ')';
            }
            if (this.tilesselected.length === 2) {
                this.clickpos = false;
                if (this.tilesselected[0].dataset.cardType === this.tilesselected[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }
                this.movenumber++;
                this.divScore.innerHTML = this.movenumber;
            }
        }
    },

    deleteTiles : function() {
        this.tilesselected[0].remove();
        this.tilesselected[1].remove();
        this.clickpos = true; //po usunięciu można już klikać na kafelki
        this.tilesselected = [];
        this.tiledual++;
        if (this.tiledual >= this.tileamount / 2) {
            alert('Game over!');
        }
    },

    resetTiles : function() { //ukrywanie kafelków na nowo, jeżeli nie są takie same
        this.tilesselected[0].style.backgroundImage = 'url(images/tile.png)';
        this.tilesselected[1].style.backgroundImage = 'url(images/tile.png)';
        this.tilesselected = [];
        this.clickpos = true;
    },


    startGame: function () {

        //czyszczenie planszy
        this.divBoard = document.querySelector('.game-board');
        this.divBoard.innerHTML = '';
        //czyszczenie planszy z ruchami
        this.divScore = document.querySelector('.game-score');
        this.divBoard.innerHTML = '';
        //czyszczenie zmiennych, aby można było rozpocząć ponownie grę
        this.tiles = [];
        this.tilesselected = [];
        this.movenumber = [];
        this.clickpos = true;
        this.tiledual = 0;


        //generowanie tablicy z parami numerów kafelków
        for (let i = 0; i < this.tileamount; i++) {
            this.tiles.push(Math.floor(i / 2));
        }
        //mieszanie tablicy przy użyciu liczb losowych
        for (let i = 1; i <= this.tileamount - 1; i++) {
            const swap = Math.floor(Math.random() * i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }
        //wstawienie tiles na planszę
        for (let i = 0; i < this.tileamount; i++){
            const tile = document.createElement('div');
            tile.classList.add("game-tile"); // classlist - właściwość do zarządzania klasami css danego elementu
            this.divBoard.appendChild(tile); // appendChild - wstawienie elementu tile do divboard

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth+10) * (i%this.tilerow) + 'px';
            tile.style.top = 5 + (tile.offsetHeight+10) * (Math.floor(i/this.tilerow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));

        }


    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.game-start'). addEventListener('click', function() {
        memoryGame.startGame();
    });
});