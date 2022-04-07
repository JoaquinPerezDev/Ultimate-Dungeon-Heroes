const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

        canvas.width = 1024
        canvas.height = 576

//Create character class, which will then extend to hero and enemies. 
const background = new Sprite({
    position:{
    x: 0, 
    y: 0
    },
    imageSrc: '../assets-ProjectUDH/Environment/ gothicvania patreon collection/Old-dark-Castle-tileset-Files/PNG/old-dark-castle-interior-background.png'
})
//create extra new Sprite to add extra layers with animations in the background.


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

// function animate(){
//     window.requestAnimationFrame(animate);
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     background.update();
//     player.update();
//     skeleton.update();

// }

// animate()
//Battle sequence function invoking and event listeners below here

const startGameButton = document.getElementById('start-game-button');
// const endTurnButton = document.getElementById('end-turn-button');

if (startGameButton) {
    startGameButton.addEventListener('click', event => {

        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        // ctx.fillStyle = 'white';
        // ctx.fillText('UI PLACEMENT LEGEND', 50, 50)
        // ctx.fillText('ULTIMATE DUNGEON HERO ATTEMPT #1', 415, 50)
        // ctx.fillText('battle screen', 450, 100)
        // ctx.fillText('Hero', 250, 325)
        // ctx.fillText('hero health bar', 250, 375)
        // ctx.fillText('hero energy', 50, 425)
        // ctx.fillText('enemies', 800, 350)
        // ctx.fillText('enemy 1 turn intention', 750, 125)
        // ctx.fillText('enemy 1 health bar', 750, 375)
        // ctx.fillText('deck pile icon', 50, 475)
        // ctx.fillText('card1', 250, 500)
        // ctx.fillText('card2', 375, 500)
        // ctx.fillText('card3', 500, 500)
        // ctx.fillText('card4', 625, 500)
        // ctx.fillText('card5', 750, 500)
        // ctx.fillText('discard pile icon', 50, 525)
        // ctx.fillText('end turn button', 900, 525)



        const player = new Hero({x: 250, y: 200}, 30, 6, 0, 3, new Deck(), 0);
        //our skeleton baddies
        const skeleton1 = new Enemy({x: 750, y: 150}, 22, 5, 0, new Deck(), 4);
        let newBattle = new Battle(player, skeleton1);
        player.draw();
        skeleton1.draw();
        newBattle.beginBattle();
        // animate()
        console.log(`prepare yourself for battle, Hero!`)
        // player.deck.shuffleDeck();
        // player.draw();
        // skeleton1.draw();
        // newBattle.activateHeroTurn();
        // newBattle.beginBattle();
    });
  }
//2. for the game loop, first draw cards on screen, draw enemy and player on screen.
//3. add eventlistener attached to mouse click relative to it's position on canvas. 
//3A. check if eventlistener clicks on another card or end turn button, skipping 
//when clicked it plays cards' effect on enemy and subtracts hero energy, then deletes card from hand.
//4. create a separate event listener on end turn button, that triggers enemy to randomly select a card of its own and play it. 
//5. After enemy plays 1 card, end enemy turn. Draw new card from player deck and re-draw all player cards on screen.
//6. translate canvas dimensions relative to browser dimensions because mouse events are based on browser dimensions.



