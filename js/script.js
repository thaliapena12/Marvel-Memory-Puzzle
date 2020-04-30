
class Game {
    constructor(cardsDeck){
        this.cardsArray = cardsDeck;
        this.busy = true;

    }

    start(){
        this.checkCard = null;
        this.matched = [];
        this.hide = [];

    }

    flip(){

    }
    hide(){

    }
    cardComp(card1, card2){
        this.matched.push(card1);
        this.matched.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');

    }
    cardType(card) {
        return card.getElementsByClassName('value')[0].src;
    }
    shuffle() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let index = Math.floor(Math.random() * (i + 1));
            this.cardsArray[index].style.order = i;
            this.cardsArray[i].style.order = index;
        }
    }

    checkFlip(card) {
        return !this.busy && !this.matched.includes(card) && card !== this.checkCard;
    }
    
   

}


function gameReady(){
    cardsDeck = Array.from(document.getElementsByClassName('card'));

    cardsDeck.forEach(card => {
        console.log(card)
        card.addEventListener('click', () => {
            //flip(card);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gameReady());
} else {
    gameReady();
}