const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = 'white';
ctx.fillText('PRELIMINARY UI PLACEMENT LEGEND', 50, 50)
ctx.fillText('ULTIMATE DUNGEON HERO ATTEMPT #1', 415, 50)
ctx.fillText('Preliminary battle screen', 450, 100)
ctx.fillText('Hero', 250, 325)
ctx.fillText('hero health bar', 250, 375)
ctx.fillText('hero energy', 250, 400)
ctx.fillText('enemies', 775, 325)
ctx.fillText('enemy 1 turn intention', 700, 175)
ctx.fillText('enemy 2 turn intention', 850, 175)
ctx.fillText('enemy 1 health bar', 700, 375)
ctx.fillText('enemy 2 health bar', 850, 375)
ctx.fillText('deck pile icon', 75, 475)
ctx.fillText('card1', 250, 500)
ctx.fillText('card2', 350, 500)
ctx.fillText('card3', 450, 500)
ctx.fillText('card4', 550, 500)
ctx.fillText('card5', 650, 500)
ctx.fillText('discard pile icon', 75, 525)
ctx.fillText('end turn button', 875, 525)

//Create character class, which will then extend to hero and enemies. 

class Character {
    constructor(name, position, health, strength, armor, deck) {
        this.name = name;
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
        this.deck = deck;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    attack() {
        return this.strength;
    }

    useAttackCard() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
    }
}

class Card {
    constructor(name, cardNumber) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.width = 100;
        this.height = 150;
    }
    
    drawCardOnCanvas(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect (x, y, this.width, this.height);
    }

}
// 

class Level {
    //We will likely need to create a level class to shift the entire screen from 
    //map to level back to map to go to the next level and so on.
    //reviewing the chronometer lab, we can create multiple levels that will draw our background, 
    //characters, etc. on the screen, as the game begins
}


//Our attack and block cards! These will be the most basic example of cards
//found in the game. Later on these can be extended to other types.

class AttackCard extends Card {
    constructor(name, strength, cardNumber) {
        super(name, cardNumber)
        this.strength = strength;
        this.type = 'attack';
    }

    draw(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect (x, y, this.width, this.height);
    }
}

class BlockCard extends Card {
    constructor(name, block, cardNumber) {
        super(name, cardNumber) 
        this.block = block;
        this.type = 'block';
    }

    useBlockCard() {
        return this.block;
    }

    draw(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect (x, y, this.width, this.height);
    }
}


/* our hero character */
class Hero extends Character {
    constructor(name, position, health, strength, armor, energy, deck, block) {
        super(name, position, health, strength, armor, deck)
        this.energy = energy;
        this.discardPile = [];
        this.hand = [];
        this.block = block;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect (this.position.x, this.position.y, 50, 150);
    }

    gainsBlock(block) {
        this.health = this.health + block;
        if(this.health >= 30) {
            return `${this.Hero.name} is becoming an impenetrable human fortress!` 
        } else {
            return `suit up or shut up! ${this.Hero.name} gains ${block} points of armor`
        }
    }


    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            return `The fates predicted ${this.Hero.name} would not become the Ultimate Dungeon Hero`
        } else {
            return `Not the face! ${this.Hero.name} takes ${damage} points of damage`
        }
    }

    chooseCardFromHand(cardIndexInHand) {
        return this.hand.splice(cardIndexInHand, 1)[0];
    }

    useCard(card) {
        //apply card's effect here. 
        console.log('apply card\'s effect and subtract energy from hero', card)
        // if(card === Hero.deck.AttackCard) {
        //     this.Enemy.receiveDamage(this.AttackCard.strength);
        // } else {
        //     this.Hero.gainsBlock(this.BlockCard.block);
        // }
        this.energy--; //this.energy -= this.cardEnergy;
        this.discardPile.push(card);

    }

    endTurn() {
       let remainingHand = this.hand.splice(0, this.hand.length);
        this.discardPile.push(...remainingHand);
        if(this.deck.length === 0) {
            this.deck.push(this.discardPile);
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
        ctx.fillRect (this.position.x, this.position.y, 50, 100);
    }

    chooseCardFromHand(cardIndexInHand) {
        return this.hand.splice(cardIndexInHand, 1)[0];
    }

    useCard(card) {
        //apply card's effect here. 
        console.log('apply card\'s effect and subtract energy from hero', card)
        // if(card === Hero.deck.AttackCard) {
        //     this.Enemy.receiveDamage(this.AttackCard.strength);
        // } else {
        //     this.Hero.gainsBlock(this.BlockCard.block);
        // }
        this.energy--; //this.energy -= this.cardEnergy;
        this.discardPile.push(card);

    }

    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            return `our hero has slain the ${this.name}, onward!`
        } else {
            return `${this.Enemy.name} has been attacked for ${damage} damage!`
        }
    }
    
    gainsBlock(block) {
        this.health = this.health + block;
        if(this.health >= 30) {
            return `What are you doing ${this.Hero.name}? ${this.Enemy.name} is near invincible!` 
        } else {
            return `${this.Enemy.name} is plotting your demise!`
        }
    }

    endTurn() {
        let remainingHand = this.hand.splice(0, this.hand.length);
         this.discardPile.push(...remainingHand);
         if(this.deck.length === 0) {
            this.deck.push(this.discardPile);
            console.log('the deck has been refilled!');
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
        // this.cards += cards;
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
        based on an event listener 'click' on 'new level' */

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
    this.Enemy.deck.shuffleDeck();
}
// addHero() {
//     return this.player;
// }

// addEnemy() {
//     return this.skeleton1;
// }

activateHeroTurn() {
    console.log(`prepare yourself for battle, Hero!`)
    this.Hero.hand = this.Hero.deck.pullCardFromDeck(5);
    console.log(this.Hero.hand);
    let chosenCard = this.Hero.chooseCardFromHand(3);
    console.log(this.Hero.hand, chosenCard, this.Hero.energy);
    this.Hero.useCard(chosenCard);
    console.log(this.Hero.hand, this.Hero.discardPile, this.Hero.energy);
    chosenCard = this.Hero.chooseCardFromHand(1); 
    this.Hero.useCard(chosenCard);
    console.log(this.Hero.hand, this.Hero.discardPile, this.Hero.energy); 
    chosenCard = this.Hero.chooseCardFromHand(2);
    this.Hero.useCard(chosenCard);
    console.log(this.Hero.hand, this.Hero.discardPile, this.Hero.energy); 
    this.Hero.endTurn();
    console.log(this.Hero.hand, this.Hero.discardPile);

/* add eventListener 'mousedown'  to activate card[i] relative to where the cards 
are positioned on screen. */
    /* add conditional to 'mousedown' on "End Turn" button that starts enemyTurn() 
    */
}

activateEnemyTurn() {
    console.log(`it is the enemy's turn to act!`)
   this.Enemy.deck.shuffleDeck();
   this.Enemy.hand = this.Enemy.deck.pullCardFromDeck(3);
   console.log(this.Enemy.hand)
   //
   let chosenEnemyCard = this.Enemy.chooseCardFromHand(Math.floor(Math.random() * this.Enemy.hand));
   console.log(this.Enemy.hand, chosenEnemyCard);
   this.Enemy.useCard(chosenEnemyCard);
   this.Enemy.endTurn();
   console.log(this.Enemy.hand, this.Enemy.discardPile);


/* add conditional to enemyTurn that ends the turn 
once skeleton has played 1 Card from EnemyDeck. 
*/

}

}

//Our hero!
const player = new Hero('player', {x: 250, y: 150}, 30, 6, 0, 3, new Deck(), 0)

//our skeleton baddies
const skeleton1 = new Enemy('skeleton', {x: 700, y: 200}, 22, 3, 0, new Deck(), 0)

const skeleton2 = new Enemy('skeleton', {x: 850, y: 200}, 19, 4, 0, new Deck(), 0)


let newBattle = new Battle(player, skeleton1);
// newBattle.activateHeroTurn();
// newBattle.activateHeroTurn();
console.log(newBattle.activateHeroTurn());
console.log(newBattle.activateEnemyTurn());
console.log(newBattle.activateHeroTurn());
console.log(newBattle.activateEnemyTurn());
console.log(newBattle.activateHeroTurn());
console.log(newBattle.activateEnemyTurn());


//1. create 2 decks, 1 enemy and 1 hero. the enemy should have its own deck, 
//the hero should have its own deck(in its constructor).
//2. for the game loop, first draw cards on screen, draw enemy and player on screen.
//3. add eventlistener attached to mouse click relative to it's position on canvas. 
//3A. check if eventlistener clicks on another card or end turn button, skipping 
//when clicked it plays cards' effect on enemy and subtracts hero energy, then deletes card from hand.
//4. create a separate event listener on end turn button, that triggers enemy to randomly select a card of its own and play it. 
//5. After enemy plays 1 card, end enemy turn. Draw new card from player deck and re-draw all player cards on screen.
//6. translate canvas dimensions relative to browser dimensions because mouse events are based on browser dimensions.