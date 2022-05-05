//console.log("Welcome to War Game!");

class Card {
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
    showCard(){
        return `Suit: ${this.suit}, Value: ${this.value}`;
    }
}

//let c = new Card("clubs", 9); // Test statements
//console.log(c.showCard());    // Test statements

class Deck {
    constructor(){
        let cards = [
            // fill the deck with Card objects
            // appropriate suit and value
        ];
    createDeck(){
        cards.push(new Card("spades", 1));
    }
    }
}




// Deal 26 Cards to two Players from a Deck. 
// Iterate through the turns where each Player plays a Card
// The Player who played the higher card is awarded a point
// Ties result in zero points for either Player
// After all cards have been played, display the score.


// create a deck class - it should have an array that can hold card objects, it should have methods like shuffle, deal, etc. 
// create a card class - it should have some properties like rank and suit


// create a deck class - it should have an array that can hold card objects, it should have methods like shuffle, deal, etc. 


// create a card class - it should have some properties like rank and suit

class Player {}