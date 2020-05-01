
class Game {
    constructor(timeTotal, cardsDeck){
        this.cardsArray = cardsDeck;
        this.timeTotal = timeTotal;
        this.timeLeft = timeTotal;
        this.timer = document.getElementById('time-left');
        this.ticker = document.getElementById('flips');

    }

    start(){
        this.checkCard = null;
        this.totalClicks = 0;
        this.timeLeft = this.timeTotal;
        this.cardsMatched = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffle();
            this.counter = this.startCounter();
            this.busy = false;
        }, 500);
        this.hide();
        this.timer.innerText = this.timeLeft;
        this.ticker.innerText = this.totalClicks;

    }

    startCounter(){
        return setInterval(() => {
            this.timeLeft--;
            this.timer.innerText = this.timeLeft;
            if (this.timeLeft === 0)
                this.gameOver();
        }, 1000);
    }

    flip(card){
        if (this.checkFlip(card)) {
            this.totalClicks++;
            card.classList.add('visible');
            
            this.ticker.innerText = this.totalClicks;
            if (this.checkCard)
                this.checkMatch(card);
            else
                this.checkCard = card;
        }

    }
    hide(){
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('cardsMatched');
        });

    }
    checkMatch(card){
        if (this.cardType(card) === this.cardType(this.checkCard))
            this.cardComp(card, this.checkCard);
        else
            this.notMatch(card, this.checkCard);

        this.checkCard = null;

    }
    notMatch(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    cardComp(card1, card2){
        this.cardsMatched.push(card1);
        this.cardsMatched.push(card2);
        console.log(this)
        card1.classList.add('cardsMatched');
        card2.classList.add('cardsMatched');
        if (this.cardsMatched.length === this.cardsArray.length)
            this.won();
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
        // console.log(this.cardsMatched)
        return !this.busy && !this.cardsMatched.includes(card) && card !== this.checkCard;
    }

    gameOver(){
        document.getElementById('game-over').classList.add('visible');
        clearInterval(this.counter);
    }

    won(){
        
        document.getElementById('won').classList.add('visible');
        clearInterval(this.counter);
    }

}

function gameReady(){
    let cardsDeck = Array.from(document.getElementsByClassName('card'));
    let overlay = Array.from(document.getElementsByClassName('overlay'));
    let game = new Game(120, cardsDeck);


    overlay.forEach(over => {
        // console.log(over)
        over.addEventListener('click', () => {
            over.classList.remove('visible');
            game.start();
        });
    });
    cardsDeck.forEach(card => {
           // console.log(card)
        card.addEventListener('click', () => {
           game.flip(card);
        
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gameReady());
} else {
    gameReady();
}