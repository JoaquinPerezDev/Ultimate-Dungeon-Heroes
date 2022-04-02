//Create character class, which will then extend to hero and enemies. 

class Character {
    constructor(health, strength, armor) {
        this.health = health;
        this.strength = strength;
        this.armor = armor;
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
    }


}

class Card {
    constructor(name, strength, block) {
        this.name = name;
        this.strength = strength;
        this.block = block;


    attack() {
        return this.strength;
    }

    block() {
        return this.block;
    }

    }
}

class Deck {
    constructor() {
        this.cards = [];
    }

    createDeck() {
        
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

class Hero extends Character {
    constructor(name, health, strength, armor, energy) {
        super(health, strength, armor)
        this.name = name;
        this.energy = energy;
        health: 30;
        strength: 5;
        armor: 0;
        energy: 3;
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

class Enemy extends Character {
    constructor(name, health, strength) {
        super(name, health, strength)
        this.name = name;
        health: 22;
        strength: 6;
        armor: 0;
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

class AttackCard extends Card {
    constructor(name, strength) {
        super(name, strength)
    }

    attack() {
        return this.strength;
    }
}

class BlockCard extends Card {
    constructor(name, block) {
        super(name, block) 
    }

    block() {
        return this.block;
    }
}

