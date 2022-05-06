// WELCOME to WAR!!!
// A card game played in the browser driven by user clicks

//const SUITS = ["diamonds", "clubs", "hearts", "spades"]
//const SUITS = ["♦", "♣", "♥", "♠"]
const SUITS = ["Orcs", "Gnolls", "Dwarves", "Elves"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
//const VALUES = ["A", "LVL 2", "LVL 3", "LVL 4", "LVL 5", "LVL 6", "LVL 7", "LVL 8", "LVL 9", "LVL 10", "LVL J", "LVL Q", "LVL K"]


// images need to replace suits next


class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards(){
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        // swaps index of cards --> perfectly random every time
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}
 
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
    }

    getHTML() {
        const cardDiv = document.createElement("div")
        //cardDiv.innerText = this.suit
        //cardDiv.innerHTML = `<img src="FRAME_ORC.png" style ='width:120px'>`; // single image
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        // renders images for each suit (race) 
        if (this.suit === "Orcs") {
                cardDiv.innerHTML = `<img src="FRAME_ORC.png" style ='width:120px'>`;
            } else if (this.suit === "Gnolls") {
                cardDiv.innerHTML = `<img src="FRAME_GNOLL.png" style ='width:120px'>`;
            } else if (this.suit === "Dwarves") {
                cardDiv.innerHTML = `<img src="FRAME_DWARF.png" style ='width:120px'>`;
            } else {
                cardDiv.innerHTML = `<img src="FRAME_ELF.png" style ='width:120px'>`;  
            }
        return cardDiv

    }
}




function freshDeck() {
    // flatMap returns a single flat array, rendering one of each card
    return SUITS.flatMap(suits => {
        return VALUES.map(value => {
            return new Card(suits, value)
        })
    })
}

// Deck functions above this line 

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound, stop

document.addEventListener('click', () =>{
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})


startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck (deck.cards.slice(0, deckMidpoint))
    computerDeck = new Deck (deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false
    stop = false

    cleanBeforeRound()
    //console.log(playerDeck) // show player decks
    ///console.log(computerDeck) // show computer decks
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""

    updateDeckCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = 'You win the battle'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = 'You lose the battle'
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = 'Draw -- you are evenly matched'
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerText = 'Your army LOST!'
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = 'Your army WINS the WAR!'
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck){
    return deck.numberOfCards === 0
}

function testLog(){
    console.log('the game is running');
}

