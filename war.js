
class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }

    describeCard() {
        console.log(`${this.value} of ${this.suit}.`)
    }
}


class Deck {
    constructor(){
        this.deckOfCards = [];
    }

    // Creates full deck of 52 cards, 13 values for each suit.
    createDeck() {
        const cardSuits = ['Hearts ♥️', 'Spades ♠️', ' Diamonds ♦️', 'Clubs ♣️']
        // iterates through all 13 card values (2 - Ace/14)
        for (let i = 2; i < 15; i++){
            for (let s = 0; s < cardSuits.length; s++){
                    this.deckOfCards.push(new Card(i, cardSuits.at(s)));        
            }
        }
    }

    // Used the "Fisher-Yates" shuffle method, thanks internet! https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript
    // Iterates through the array in reverse order
    shuffle(){
        for (let i = this.deckOfCards.length - 1; i > 0; i--){
            // Generates random index
            const r = Math.floor(Math.random() * (i + 1));
            
            // swap elements at i and r
            const temp = this.deckOfCards[i];
            this.deckOfCards[i] = this.deckOfCards[r];
            this.deckOfCards[r] = temp;
        }
    }
    
    // Splices the first and second half of the deck, assigns them to their own arrays.
    split(){
        let deck1 = this.deckOfCards.splice(0, 26);
        let deck2 = this.deckOfCards.splice(0, 26);
        return [deck1, deck2];
    }
}

// Empty player class, no methods just data storage
class Player {
    constructor(name){
        this.name = name;
        this.playerDeck = [];
        this.points = 0;
    }
}


class Game {
    constructor(){
        // just a lil variable that keeps track of ties/draws
        this.draw = 0
    }

    start(){
        // creates 2 new players
        let player1 = new Player('Player One');
        let player2 = new Player('Player Two');
        
        // Creates new deck of cards, shuffles them
        let deck = new Deck();
        deck.createDeck();
        deck.shuffle();
        
        //Splits the deck and deals the halves out to each player
        const [deck1, deck2] = deck.split();
        player1.playerDeck = deck1;
        player2.playerDeck = deck2;
        
        // Logs both player decks to the console, for the sake of viewing
        console.log(`Player One's Deck:`);
        console.log(player1.playerDeck);
        console.log(`Player Two's Deck:`);
        console.log(player2.playerDeck);
        
        // Informs the user of card values
        console.log(`
11 = Jack, 12 = Queen, 13 = King, 14 = Ace  

`);

        // This plays the game! Iterates through all 26 player cards
        for (let i = 0; i < player1.playerDeck.length && player2.playerDeck.length; i++){
            // Displays the current card battle, based on i value.
            console.log(`${player1.playerDeck[i].value} of ${player1.playerDeck[i].suit} VS ${player2.playerDeck[i].value} of ${player2.playerDeck[i].suit}`)

            // Checks if the card values are higher than or equal to one another. 
            if (player1.playerDeck[i].value > player2.playerDeck[i].value){
                player1.points += 1;
                console.log(`Player One gets the point!`);
            } else if (player1.playerDeck[i].value < player2.playerDeck[i].value) {
                player2.points += 1;
                console.log(`Player Two has the higher card! A point to them!`);    
            } else {
                this.draw += 1;
                console.log(`We have a tie! No points are rewarded.`);
            }
        }
        
        // Displays the total points and ties.
        console.log(`Player One: ${player1.points}
Player Two: ${player2.points}
Ties: ${this.draw}`);

        // Declares a winner! 
        if (player1.points > player2.points){
            console.log(`Congrats Player One, you're the winner with ${player1.points} points!`);
        } else if (player1.points < player2.points){
            console.log(`Congrats Player Two, you're the winner with ${player2.points} points!`)
        } else if (player1.points == player2.points){
            console.log(`It's a tie! Refresh to play again.`)
        }
    }
}

// TIME TO PLAY THE GAAAAAME
let game = new Game;
game.start();