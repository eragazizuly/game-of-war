const shuffle = document.getElementById("shuffle")
const draw = document.getElementById("draw")
const imgContainer = document.getElementById("img-container")
const containerOne = document.getElementById("container-one")
const containerTwo = document.getElementById("container-two")
const winner = document.getElementById("winner")
const remaining = document.getElementById("remaining")
const comp = document.getElementById("comp")
const me = document.getElementById("me")
let compScore = 0
let myScore = 0
let deckId

shuffle.addEventListener("click", shuffleDeck)
draw.addEventListener("click", drawCards)

function shuffleDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
            remaining.textContent = `Remaining cards: ${data.remaining}`
            console.log(data)
        })
}

function drawCards() {
    if(deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(response => response.json())
            .then(data => {
                remaining.textContent = `Remaining cards: ${data.remaining}`
                containerOne.innerHTML = `<img src="${data.cards[0].image}" alt="${data.cards[0].value} of ${data.cards[0].suit}">`
                containerTwo.innerHTML = `<img src="${data.cards[1].image}" alt="${data.cards[1].value} of ${data.cards[1].suit}">`
                highestCard(data.cards[0], data.cards[1])
                if(data.remaining === 0) {
                    draw.disabled = true
                    if(compScore > myScore) {
                        winner.textContent = "Computer won the game!"
                    } else if(compScore < myScore) {
                        winner.textContent = "You won the game!"
                    } else {
                        winner.textContent = "Friendship won the game))!"
                    }
                }
            })
    }
}

function highestCard(card1, card2) {
    const cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = cardsValues.indexOf(card1.value)
    const card2Value = cardsValues.indexOf(card2.value)
    if(card1Value > card2Value) {
        winner.textContent = "Computer wins!"
        compScore++
        comp.textContent = `Computer Score: ${compScore}`
    } else if (card1Value === card2Value) {
        winner.textContent = ("War")
    } else {
        winner.textContent = ("You win!")
        myScore++
        me.textContent = `My Score: ${myScore}`
    }
}
