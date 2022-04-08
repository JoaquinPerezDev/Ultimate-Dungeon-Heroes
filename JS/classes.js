class Character {
    constructor(position, health, strength, armor, deck, block, imageSrc, scaleX = 1, scaleY = 1, framesMax = 1, context) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
        this.block = block;
        this.deck = deck;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.ctx = context;
    }
// use conditional to check for if useCard() function is used, animate attack 
    draw() {
        // this.ctx.drawImage(
        //     this.image, 
        //     this.framesCurrent * (this.image.width / this.framesMax),
        //     0,
        //     this.image.width / this.framesMax,
        //     this.image.height,
        //     this.position.x, 
        //     this.position.y,
        //     (this.image.width / this.framesMax) * this.scale,
        //     this.image.height * this.scale
        // )
        console.log(this.image)
        this.ctx.drawImage(
            this.image, 
            0,
            0,
            100,
            100,
            0, 
            0,
            100,
            100
        )
    }

    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesCurrent < this.framesMax) {
            this.framesCurrent++;
            } else{ 
                this.framesCurrent = 0;
            }
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
//jump to 255 for Level class extension of Sprite
class Sprite {
    constructor(position, imageSrc, scaleX = 1, scaleY = 1, framesMax = 1, context) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scaleX = scaleX;
        this.scaleY = scaleY
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.ctx = context;
    }

    draw() {
        this.ctx.drawImage(     
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y,
            (this.image.width / this.framesMax) * this.scaleX,
            this.image.height * this.scaleY
        )
        // this.ctx.fillRect(100, 100, 50, 50) 
    }

    update() {
        this.draw();
        if(this.framesCurrent < this.framesMax) {
        this.framesCurrent++;
        } else{ 
            this.framesCurrent = 0;
        }
    }
}

class Card {
    constructor(name, position, imageSrc, context) {
        this.name = name;
        this.position = position;
        this.width = 50;
        this.height = 75;
        this.image = new Image();
        this.image.src = imageSrc;
        this.ctx = context;
    }
    
    draw() {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesCurrent < this.framesMax) {
            this.framesCurrent++;
            } else{ 
                this.framesCurrent = 0;
            }
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

}

//Our attack and block cards! These will be the most basic example of cards
//found in the game. Later on these can be extended to other types.

class AttackCard extends Card {
    constructor(name, position, strength, imageSrc, context) {
        super(name, position, imageSrc, context)
        this.strength = strength;
        this.type = 'attack';
    }

    // draw(x, y) {
    //     ctx.fillStyle = 'white';
    //     ctx.fillRect (x, y, this.width, this.height);
    // }
}

class BlockCard extends Card {
    constructor(name, position, block, imageSrc, context) {
        super(name, position, imageSrc, context) 
        this.block = block;
        this.type = 'block';
    }

    // draw(x, y) {
    //     // ctx.fillStyle = 'white';
    //     // ctx.fillRect (x, y, this.width, this.height);
    // }
}


/* our hero character */
class Hero extends Character {
    constructor(position, health, strength, armor, energy, deck, block, imageSrc, scaleX = 1, scaleY = 1, framesMax = 1, context) {
        super(position, health, strength, armor, deck, block, imageSrc, scaleX, scaleY, framesMax, context)
        this.energy = energy;
        this.discardPile = [];
        this.hand = [];
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    draw() {
        this.ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y,
            (this.image.width / this.framesMax) * this.scaleX,
            this.image.height * this.scaleY
        )        
        // this.ctx.drawImage(
        //     this.image, 
        //     0,
        //     0,
        //     100,
        //     100,
        //     0, 
        //     0,
        //     100,
        //     100
        // )
    }

    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesCurrent < this.framesMax) {
            this.framesCurrent++;
            } else{ 
                this.framesCurrent = 0;
            }
    }
    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            alert(`The fates predicted YOU would not become the Ultimate Dungeon Hero`)
        } else {
            console.log(`Not the face! You take ${damage} points of damage. Your HP is now ${this.health}`)
        }
    }

    gainsBlock(block) {
        this.health = this.health + block;
        if(this.health > 30) {
            console.log(`You are becoming an impenetrable human fortress! Your HP is now ${this.health}`) 
        } else {
            console.log(`suit up or shut up! Your HP is now ${this.health}`)
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
    constructor(position, health, strength, armor, deck, block, imageSrc, scaleX = 1, scaleY = 1, framesMax = 1, context) {
        super(position, health, strength, armor, deck, block, imageSrc, scaleX, scaleY, framesMax, context)
        this.hand = [];
        this.discardPile = [];
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }
   
    draw() {
        this.ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y,
            (this.image.width / this.framesMax) * this.scaleX,
            this.image.height * this.scaleY
        )

    }

    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesCurrent < this.framesMax) {
            this.framesCurrent++;
            } else{ 
                this.framesCurrent = 0;
            }
    }

    chooseCardFromHand(cardIndexInHand) {
        return this.hand.splice(cardIndexInHand, 1)[0];
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            alert(`YOU have S L A I N the enemy. You have been rightfully crowned the Ultimate Dungeon Hero!`)
        } else {
            console.log(`The skeleton has been attacked for ${damage} damage! Skeleton's HP is now ${this.health}`)
        } 

    }
    
    gainsBlock(block) {
        this.health = this.health + block;
        if(this.health > 30) {
            console.log(`What are you doing Hero? The enemy is near invincible! Skeleton's HP is now ${this.health}`)
        } else {
            console.log(`The skeleton is plotting your demise! Skeleton's HP is now ${this.health}`)
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
        //add text box with this floating text below. Need to look into canvas animation
        // console.log(`prepare yourself for battle, Hero!`)
    this.Hero.image.onload = () => { 
        this.Enemy.image.onload = () => {
            this.Hero.draw();
            this.Enemy.draw();
            this.Hero.deck.shuffleDeck();
            this.activateHeroTurn();
         }
    }
}


activateHeroTurn() {
        //add text box with this floating text below. Need to look into canvas animation
        console.log(`It is your turn, Hero! Choose wisely...`)

    //Need to write a function that will check each card from deck, and draw it on the board at each card position #1-5
    this.Hero.hand = this.Hero.deck.pullCardFromDeck(5);
    this.Hero.hand.forEach((element, index) => { 
        element.setPosition({x:135 + index * 65, y:-37})
        element.draw()
    })



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
   this.Enemy.hand;
   console.log(this.Enemy.hand)
   //
   let chosenEnemyCard = this.Enemy.chooseCardFromHand(Math.floor(Math.random() * this.Enemy.hand));
   console.log(this.Enemy.hand, chosenEnemyCard);

   this.Enemy.useCard(chosenEnemyCard, this.Hero);
   this.Enemy.endTurn();
   console.log(this.Enemy.hand, this.Enemy.discardPile);
   this.activateHeroTurn();
}

// endBattle() {
//     //add alert that game 
// }

}
