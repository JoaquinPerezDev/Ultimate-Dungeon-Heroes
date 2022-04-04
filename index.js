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
    constructor(name, strength, block, cardNumber, type) {
        this.name = name;
        this.strength = strength;
        this.block = block;
        this.cardNumber = cardNumber;
        this.type = type;
    }

    attack() {
        return this.strength;
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

const player = new Hero({
    x: 250,
    y: 250,
    name: 'player',
    health: 30,
    strength: 5,
    armor: 0,
    energy: 3
})




class Enemy extends Character {
    constructor(name, health, strength, position, armor) {
        super(name, health, strength, position, armor)
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

}

const skeleton1 = new Enemy({
    x: 800,
    y: 300,
    name: 'skeleton',
    health: 22, 
    strength: 3,
    armor: 0,
})

const skeleton2 = new Enemy({
    x: 600,
    y: 300,
    name: 'skeleton',
    health: 22, 
    strength: 3,
    armor: 0,
})

class AttackCard extends Card {
    constructor(name, strength, cardNumber, type) {
        super(name, strength, cardNumber, type)
        this.strength = 6;
    }

    attack() {
        return this.strength;
    }
}

class BlockCard extends Card {
    constructor(name, block, cardNumber, type) {
        super(name, block, cardNumber, type) 
        this.block = 4;
    }

    block() {
        return this.block;
    }
}


const attack1 = new AttackCard ({
    name: 'Slide & dice!',
    strength: 5,
    cardNumber: 1,
    type: 'attack'
})

const attack2 = new AttackCard ({
    name: 'Slide & dice!',
    strength: 5,
    cardNumber: 2,
    type: 'attack'
})

const attack3 = new AttackCard ({
    name: 'Slide & dice!',
    strength: 5,
    cardNumber: 3,
    type: 'attack'
})

const attack4 = new AttackCard ({
    name: 'Slide & dice!',
    strength: 5,
    cardNumber: 4,
    type: 'attack'
})

const attack5 = new AttackCard ({
    name: 'Slide & dice!',
    cardNumber: 5,
    type: 'attack'
})

const attack6 = new AttackCard ({
    name: 'Slide & dice!',
    cardNumber: 6,
    type: 'attack'
})

const block1 = new BlockCard ({
    name: 'Slide & dice!',
    cardNumber: 1,
    type: 'block'
})

const block2 = new BlockCard ({
    name: 'Wise up!',
    cardNumber: 2,
    type: 'block'
})

const block3 = new BlockCard ({
    name: 'Wise up!',
    cardNumber: 3,
    type: 'block'
})

const block4 = new BlockCard ({
    name: 'Wise up!',
    cardNumber: 4,
    type: 'block'
})



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

        /* This function will shuffle the deck anytime we start a new level, 
        based on an event listener 'click' on 'new level' */
    }

    drawCards() {
        /* This function will draw our */
    }
}

const newDeck = new Deck();

newDeck.createDeck();
console.log(newDeck)

player.draw()
console.log(player)

skeleton1.draw()
console.log(skeleton1)

skeleton2.draw()
console.log(skeleton2)