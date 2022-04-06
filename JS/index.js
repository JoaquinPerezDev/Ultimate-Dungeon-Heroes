const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Create character class, which will then extend to hero and enemies. 

class Character {
    constructor(name, position, health, strength, armor, deck, block) {
        this.name = name;
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
        this.block = block;
        this.deck = deck;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    chooseCardFromHand(cardIndexInHand) {
        return this.hand.splice(cardIndexInHand, 1)[0];
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
    }

    gainsBlock(block) {
        this.health = this.health + block;
    }

    useCard(card, target) {
        //apply card's effect here. 
        
        if(card.type === 'attack') {
            target.receiveDamage(this.strength);
        }
        //if(card.type === 'attack') {
        // 
        if(card.type === 'block') {
            this.gainsBlock(this.block);
        }

        this.energy--; //this.energy -= this.cardEnergy;
        this.discardPile.push(card);

    }
}


class Card {
    constructor(name) {
        this.name = name;
        this.width = 100;
        this.height = 150;
    }
    
    drawCardOnCanvas(x, y) {
        ctx.fillStyle = 'white';
        // if(hero.deck.card.)
        ctx.fillRect (x, y, this.width, this.height);
    }

}

//Our attack and block cards! These will be the most basic example of cards
//found in the game. Later on these can be extended to other types.

class AttackCard extends Card {
    constructor(name, strength) {
        super(name)
        this.strength = strength;
        this.type = 'attack';
    }

    draw(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect (x, y, this.width, this.height);
    }
}

class BlockCard extends Card {
    constructor(name, block) {
        super(name) 
        this.block = block;
        this.type = 'block';
    }

    draw(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect (x, y, this.width, this.height);
    }
}


/* our hero character */
class Hero extends Character {
    constructor(name, position, health, strength, armor, energy, deck, block) {
        super(name, position, health, strength, armor, deck, block)
        this.energy = energy;
        this.discardPile = [];
        this.hand = [];
        this.block = block;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect (this.position.x, this.position.y, 50, 150);
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            alert(`The fates predicted ${this.name} would not become the Ultimate Dungeon Hero`)
        } else {
            console.log(`Not the face! ${this.name} takes ${damage} points of damage. ${this.name}'s health is ${this.health}`)
        }
    }

    gainsBlock(block) {
        this.health = this.health + block;
        if(this.health > 30) {
            console.log(`${this.name} is becoming an impenetrable human fortress! ${this.name}'s health is ${this.health}`) 
        } else {
            console.log(`suit up or shut up! ${this.name} gains ${block} points of armor`)
        }
    }

    useCard(card, target) {
        //apply card's effect here. 
        
        console.log(card)
        if(card.type === 'attack') {
            target.receiveDamage(card.strength);
        }
        //if(card.type === 'attack') {
        // 
        if(card.type === 'block') {
            console.log(this.health)
            this.gainsBlock(card.block);
            console.log(this.health)
        }

        this.energy--; //this.energy -= this.cardEnergy;
        this.discardPile.push(card);

    }

    endTurn() {
       let remainingHand = this.hand.splice(0, this.hand.length);
        this.discardPile.push(...remainingHand);
        if(this.deck.cards.length === 0) {
            this.deck.cards = this.discardPile;
            this.discardPile = [];
            console.log('the deck has been refilled!');
        }
        this.energy = 3;
    }

}

//our enemies! This can be further extended into different kinds. 
//Once we can functionally play through one level/set of enemies and succeed in win/losing.

class Enemy extends Character { 
    constructor(name, position, health, strength, armor, deck, block) {
        super(name, position, health, strength, armor, deck)
        this.block = block;
        this.hand = [];
        this.discardPile = [];
    }

    draw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect (this.position.x, this.position.y, 100, 200);
    }

    chooseCardFromHand(cardIndexInHand) {
        return this.hand.splice(cardIndexInHand, 1)[0];
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            alert(`our hero has slain the ${this.name}, onward!`)
        } else {
            console.log(`${this.name} has been attacked for ${damage} damage! ${this.name}'s health is ${this.health}`)
        } 

    }
    
    gainsBlock(block) {
        this.health = this.health + block;
        if(this.health > 30) {
            console.log(`What are you doing Hero? ${this.name} is near invincible!${this.name}'s health is ${this.health}`)
        } else {
            console.log(`${this.name} is plotting your demise!`)
        }
    }

    useCard(card, target) {
        //apply card's effect here. 
        
        console.log(card)
        if(card.type === 'attack') {
            target.receiveDamage(this.strength);
        }
        //if(card.type === 'attack') {
        // 
        if(card.type === 'block') {
            console.log(this.health)
            this.gainsBlock(this.block);
            console.log(this.health)
        }

        this.energy--; //this.energy -= this.cardEnergy;
        this.discardPile.push(card);

    }

    endTurn() {
        let remainingHand = this.hand.splice(0, this.hand.length);
         this.discardPile.push(...remainingHand);
         if(this.deck.cards.length === 0) {
            this.deck.cards = this.discardPile;
            this.discardPile = [];
        }
     }
/* the below methods will be attached to other card extensions once the battle system has been figured out 
    increaseArmor() {
        this.armor += 2;
    }

    enrage() {
        this.strength += 2;
    }
*/
}

//the cards that comprise our deck! I have included multiples of each to account
//for every single card included in the starting deck. This may change once
//I can figure out how to create more efficient code.
//                               name, strength, cardNumber
const attack1 = new AttackCard ('Slice & dice!', 6, 1)

const attack2 = new AttackCard ('Slice & dice!', 6, 2)

const attack3 = new AttackCard ('Slice & dice!', 6, 3)

const attack4 = new AttackCard ('Slice & dice!', 6, 4)

const attack5 = new AttackCard ('Slice & dice!', 6, 5)

const attack6 = new AttackCard ('Slice & dice!', 6, 6)

const block1 = new BlockCard ('Suit up!', 4, 7)

const block2 = new BlockCard ('Suit up!', 4, 8)

const block3 = new BlockCard ('Suit up!', 4, 9)

const block4 = new BlockCard ('Suit up!', 4, 10)

class Deck {
    constructor() {
        //this.cards = cardArray; add (cardArray) constructor
        this.cards = [
            attack1,
            attack2,
            attack3,
            attack4,
            attack5,
            attack6, 
            block1,
            block2,
            block3,
            block4
        ];
    }

    createDeck() {
      return this.cards;   
        /* This function will create a new deck, 
        comprised of a combination of our cards, when the game is initialized. */
    }

    shuffleDeck () {
        let newShuffledCardsArray = this.cards;
        let currentIndex = newShuffledCardsArray.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [newShuffledCardsArray[currentIndex], 
           newShuffledCardsArray[randomIndex]] =
          [newShuffledCardsArray[randomIndex], 
           newShuffledCardsArray[currentIndex]];
        }
      
        return newShuffledCardsArray;
      }

      /* variation of code of the Fisher-Yates Shuffle. */
        /* This function will shuffle the deck anytime we start a new level, 
        based on an event listener 'click' on 'new level' 
        ** UPDATE 04/06/22 'new level' feature will be added in V2 or V3, \
        once battle mechanics have been improved and new cards are introduced ** */

    pullCardFromDeck(numberOfCards) {

        let cardsDrawnArray = [];
        for(let i = 0; i < numberOfCards; i++){
            cardsDrawnArray.push(this.cards.shift())
        } 
        return cardsDrawnArray;
    }
  
}

// class EnemyDeck extends Deck {
//        constructor() {
//         this.cards = [
//             attack1, 
//             block1
//         ];
//     }
    
//     createDeck() {
//       return this.cards;   
//         /* This function will create a new deck, 
//         comprised of a combination of our cards, when the game is initialized. */
//     }

//     shuffleDeck () {
//         let newShuffledCardsArray = this.cards;
//         let currentIndex = newShuffledCardsArray.length,  randomIndex;
      
//         // While there remain elements to shuffle...
//         while (currentIndex != 0) {
      
//           // Pick a remaining element...
//           randomIndex = Math.floor(Math.random() * currentIndex);
//           currentIndex--;
      
//           // And swap it with the current element.
//           [newShuffledCardsArray[currentIndex], 
//            newShuffledCardsArray[randomIndex]] =
//           [newShuffledCardsArray[randomIndex], 
//            newShuffledCardsArray[currentIndex]];
//         }
      
//         return newShuffledCardsArray;
//         console.log(newShuffledCardsArray)
//       }
//     // shuffleDeck() {
//     //     let shuffle;
//     //     let newShuffledCardsArray = this.cards;
//     //     for (let i = 0; i < this.cards.length; i++) {
//     //         shuffle = Math.floor((Math.random() * this.cards.length));
//     //         return shuffle;
//     //     /* This function will shuffle the deck anytime we start a new level, 
//     //     based on an event listener 'click' on 'new level' */
//     //     }
//     // }
// }

//1. create 2 decks, 1 enemy and 1 hero. the enemy should have its own deck, 
//the hero should have its own deck(in its constructor).
//2. for the game loop, first draw cards on screen, draw enemy and player on screen.
//3. add eventlistener attached to mouse click relative to it's position on canvas. 
//3A. check if eventlistener clicks on another card or end turn button, skipping 
//when clicked it plays cards' effect on enemy and subtracts hero energy, then deletes card from hand.
//4. create a separate event listener on end turn button, that triggers enemy to randomly select a card of its own and play it. 
//5. After enemy plays 1 card, end enemy turn. Draw new card from player deck and re-draw all player cards on screen.
//6. translate canvas dimensions relative to browser dimensions because mouse events are based on browser dimensions.

class Battle {
constructor(hero, enemy) {
    this.Hero = hero;
    this.Enemy = enemy;
    this.Hero.deck.shuffleDeck();
}
// addHero() {
//     this.Hero.draw();
// }

// addEnemy() {
//     this.Enemy.draw();
// }

beginBattle() {
    this.Hero.deck.shuffleDeck();
    this.Hero.draw();
    this.Enemy.draw();
}


activateHeroTurn() {

    //add text box with this floating text below. Need to look into canvas animation
    console.log(`prepare yourself for battle, Hero!`)
    //Need to write a function that will check each card from deck, and draw it on the board at each card position #1-5
    this.Hero.hand = this.Hero.deck.pullCardFromDeck(5);
    console.log(this.Hero.hand);


    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '1':
                if(this.Hero.hand.length >= 1 && this.Hero.energy > 0) {
                const chosenCard0 = this.Hero.chooseCardFromHand(0);
                this.Hero.useCard(chosenCard0, this.Enemy);
                console.log(this.Hero.hand, chosenCard0, this.Hero.discardPile, this.Hero.energy);
                }
                break;
            case '2':
                if(this.Hero.hand.length >= 2 && this.Hero.energy > 0) {
                const chosenCard1 = this.Hero.chooseCardFromHand(1);
                this.Hero.useCard(chosenCard1, this.Enemy);
                console.log(this.Hero.hand, chosenCard1, this.Hero.discardPile, this.Hero.energy);
                }
                break;
            case '3':
                if(this.Hero.hand.length >= 3 && this.Hero.energy > 0) {
                const chosenCard2 = this.Hero.chooseCardFromHand(2);
                this.Hero.useCard(chosenCard2, this.Enemy);
                console.log(this.Hero.hand, chosenCard2, this.Hero.discardPile, this.Hero.energy);
                }
                break;
            case '4':
                if(this.Hero.hand.length >= 4 && this.Hero.energy > 0) {
                const chosenCard3 = this.Hero.chooseCardFromHand(3);
                this.Hero.useCard(chosenCard3, this.Enemy);
                console.log(this.Hero.hand, chosenCard3, this.Hero.discardPile, this.Hero.energy);
                }
                break;
            case '5':
                if(this.Hero.hand.length >= 5 && this.Hero.energy > 0) {
                const chosenCard4 = this.Hero.chooseCardFromHand(4);
                this.Hero.useCard(chosenCard4, this.Enemy);
                console.log(this.Hero.hand, chosenCard4, this.Hero.discardPile, this.Hero.energy);
                }
                break;
            case ' ':
                this.Hero.endTurn();
                this.activateEnemyTurn();
                break;  
        }
      })
    //Event listeners can be made for each card in the hand, corresponding to a number key 1-5. 
    //A variable for each can be made for sake of simplicity
}

activateEnemyTurn(){
    console.log(`it is the enemy's turn to act!`)
   this.Enemy.deck.shuffleDeck();
//Enemy turn is fully automated, can be attached to endTurn() event listener for Hero's turn.
   this.Enemy.hand = this.Enemy.deck.pullCardFromDeck(5);
   console.log(this.Enemy.hand)
   //
   let chosenEnemyCard = this.Enemy.chooseCardFromHand(Math.floor(Math.random() * this.Enemy.hand));
   console.log(this.Enemy.hand, chosenEnemyCard);

   this.Enemy.useCard(chosenEnemyCard, this.Hero);
   this.Enemy.endTurn();
   console.log(this.Enemy.hand, this.Enemy.discardPile);
 //  this.activateHeroTurn();
/* add conditional to enemyTurn that ends the turn 
once skeleton has played 1 Card from EnemyDeck. 
*/
}

// endBattle() {
//     //add alert that game 
// }

}
//Battle sequence function invoking and event listeners below here


let newBattle;
const startGameButton = document.getElementById('start-game-button');
// const endTurnButton = document.getElementById('end-turn-button');

if (startGameButton) {
    startGameButton.addEventListener('click', event => {

        canvas.width = 1024
        canvas.height = 576

        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white';
        ctx.fillText('UI PLACEMENT LEGEND', 50, 50)
        ctx.fillText('ULTIMATE DUNGEON HERO ATTEMPT #1', 415, 50)
        ctx.fillText('battle screen', 450, 100)
        ctx.fillText('Hero', 250, 325)
        ctx.fillText('hero health bar', 250, 375)
        ctx.fillText('hero energy', 50, 425)
        ctx.fillText('enemies', 800, 350)
        ctx.fillText('enemy 1 turn intention', 750, 125)
        ctx.fillText('enemy 1 health bar', 750, 375)
        ctx.fillText('deck pile icon', 50, 475)
        ctx.fillText('card1', 250, 500)
        ctx.fillText('card2', 375, 500)
        ctx.fillText('card3', 500, 500)
        ctx.fillText('card4', 625, 500)
        ctx.fillText('card5', 750, 500)
        ctx.fillText('discard pile icon', 50, 525)
        ctx.fillText('end turn button', 900, 525)



        const player = new Hero('player', {x: 250, y: 200}, 30, 6, 0, 3, new Deck(), 0);
        //our skeleton baddies
        const skeleton1 = new Enemy('skeleton', {x: 750, y: 150}, 22, 3, 0, new Deck(), 0);
        let newBattle = new Battle(player, skeleton1);
        player.draw();
        skeleton1.draw();
        newBattle.beginBattle();
        newBattle.activateHeroTurn();


    });
  }

//2. for the game loop, first draw cards on screen, draw enemy and player on screen.
//3. add eventlistener attached to mouse click relative to it's position on canvas. 
//3A. check if eventlistener clicks on another card or end turn button, skipping 
//when clicked it plays cards' effect on enemy and subtracts hero energy, then deletes card from hand.
//4. create a separate event listener on end turn button, that triggers enemy to randomly select a card of its own and play it. 
//5. After enemy plays 1 card, end enemy turn. Draw new card from player deck and re-draw all player cards on screen.
//6. translate canvas dimensions relative to browser dimensions because mouse events are based on browser dimensions.



