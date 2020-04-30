
class Game {
    constructor(cardsDeck){
        this.cardsArray = cardsDeck;
       

    }

    start(){
        this.checkCard = null;
        this.matched = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffle();
            this.busy = false;
        }, 500);
        this.hide();

    }

    flip(card){
        if (this.checkFlip(card)) {
            card.classList.add('visible');
            if (this.checkCard)
                this.cardComp(card);
            else
                this.checkCard = card;
        }

    }
    hide(){
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });

    }
    checkMatch(card1, card2){
        this.matched.push(card1);
        this.matched.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');


    }
    notMacth(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    cardComp(card){
        if (this.cardType(card) === this.cardType(this.checkCard))
            this.cardComp(card, this.checkCard);
        else
            this.notMatch(card, this.checkCard);

        this.checkCard = null;
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

    gameOver(){
        document.getElementById('game-over').classList.add('visible');
    }

    won(){
        document.getElementById('won').classList.add('visible');
    }
    
   

}


function gameReady(){
    cardsDeck = Array.from(document.getElementsByClassName('card'));
    let game = new Game(cardsDeck);
    game.start();
    cardsDeck.forEach(card => {
        console.log(card)
        card.addEventListener('click', () => {
           game.flip(card)
        
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gameReady());
} else {
    gameReady();
}