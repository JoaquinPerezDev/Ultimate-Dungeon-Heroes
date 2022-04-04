const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)


//Create character class, which will then extend to hero and enemies. 

class Character {
    constructor(position, health, strength, armor) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
    }



}

class Card {
    constructor(name, strength, block, cardNumber, type, position) {
        this.position = position;
        this.name = name;
        this.strength = strength;
        this.block = block;
        this.cardNumber = cardNumber;
        this.type = type;
        this.width = 100;
        this.height = 150;
    }
    
    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    attack() {
        return this.strength;
    }

    block() {
        return this.block;
    }


}

class Level {
    //We will likely need to create a level class to shift the entire screen from 
    //map to level back to map to go to the next level and so on.
    //reviewing the chronometer lab, we can create multiple levels that will draw our background, 
    //characters, etc. on the screen, as the game begins
}


//Our attack and block cards! These will be the most basic example of cards
//found in the game. Later on these can be extended to other types.

class AttackCard extends Card {
    constructor(name, strength, cardNumber, type, position) {
        super(name, strength, cardNumber, type)
        this.position = position;
        this.strength = 6;
        this.width = 100;
        this.height = 150;
    }
    
    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    attack() {
        return this.strength;

    }
}
class BlockCard extends Card {
constructor(name, block, cardNumber, type, position) {
    super(name, block, cardNumber, type) 
    this.position = position;
    this.block = 4;
    this.width = 100;
    this.height = 150;
}

draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
}

block() {
    return this.block;
}
}


/* our hero character */
class Hero extends Character {
    constructor(position, name, health, strength, armor, energy) {
        super(position, health, strength, armor, energy)
        this.name = name;
        this.energy = energy;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect (this.position.x, this.position.y, 50, 150);
    }

    attack() {
        return this.strength;
        this.energy - 1;
    }

    block() {
        return this.armor;
        this.energy - 1;
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            return `${this.name} has perished attempting to become an Ultimate Dungeon Hero`
        } else {
            return `${this.name} has been attacked for ${damage} damage!`
        }
    }

}
//Our hero!
const player = new Hero({x: 250, y: 150}, 'player', 30, 5, 0, 3)

//our enemies! This can be further extended into different kinds. 
//Once we can functionally play through one level/set of enemies and succeed in win/losing.

class Enemy extends Character {
    constructor(position, name, health, strength, armor) {
        super(position, name, health, strength, armor)
        this.name = name;
        this.width = 50;
        this.height = 100;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
    }

    draw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect (this.position.x, this.position.y, 50, 100);
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
        if(this.health <= 0) {
            return `our hero has slain the ${this.name}, you may advance`
        } else {
            return `${this.name} has been attacked for ${damage} damage!`
        }
    }

    increaseArmor() {
        this.armor += 2;
    }

    enrage() {
        this.strength += 2;
    }

}

//our skeleton badies
const skeleton1 = new Enemy({x: 700, y: 200}, 'skeleton', 22, 3, 0)

const skeleton2 = new Enemy({x: 800, y: 200}, 'skeleton', 22, 3, 0)


//the cards that comprise our deck! I have included multiples of each to account
//for every single card included in the starting deck. This may change once
//I can figure out how to create more efficient code.
//                               name, strength, cardNumber, type, position
const attack1 = new AttackCard ('Slice & dice!', 6, 1, 'attack', {x: 450, y:400})

const attack2 = new AttackCard ('Slice & dice!', 6, 2, 'attack', {x: 450, y:400})

const attack3 = new AttackCard ('Slice & dice!', 6, 3, 'attack', {x: 450, y:400})

const attack4 = new AttackCard ('Slice & dice!', 6, 4, 'attack', {x: 450, y:400})

const attack5 = new AttackCard ('Slice & dice!', 6, 5, 'attack', {x: 450, y:400})

const attack6 = new AttackCard ('Slice & dice!', 6, 6, 'attack', {x: 450, y:400})

const block1 = new BlockCard ('Suit up!', 4, 7, 'attack', {x: 450, y:400})

const block2 = new BlockCard ('Suit up!', 4, 8, 'attack', {x: 450, y:400})

const block3 = new BlockCard ('Suit up!', 4, 9, 'attack', {x: 450, y:400})

const block4 = new BlockCard ('Suit up!', 4, 10, 'attack', {x: 450, y:400})



class Deck {
    constructor(cards) {
        this.cards += cards;
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

    shuffleDeck() {
        let shuffle;
        for (let i = 0; i < this.cards.length; i++) {
            shuffle = Math.floor((Math.random() * this.cards.length));
            return shuffle;
        /* This function will shuffle the deck anytime we start a new level, 
        based on an event listener 'click' on 'new level' */
    }

}

    drawCards() {
        this.shuffleDeck()
        for(let i = 0; i < this.cards.length;i++) {
            
        }
        /* This function will draw our */
    }
}

const newDeck = new Deck();

newDeck.createDeck();

newDeck.shuffleDeck()
console.log(newDeck)

player.draw()
console.log(player)

skeleton1.draw()
console.log(skeleton1)

skeleton2.draw()
console.log(skeleton2)