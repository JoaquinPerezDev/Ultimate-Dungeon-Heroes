const canvas = document.querySelector('canvas');

canvas.width = 576
canvas.height = 288

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


const beginBattleLine = document.getElementById('beginBattle');
const gameOverLine = document.getElementById('gameOverLine');
const heroTakesDamageLine = document.getElementById('heroTakesDamage');
const heroHealsLine = document.getElementById('heroHeals');
const heroGainsBlockLine = document.getElementById('heroGainsBlock');
const heroBecomesHeroLine = document.getElementById('heroBecomesHero');
const heroAttacksLine = document.getElementById('heroAttacksLine');
const skeletonHealsLine = document.getElementById('skeletonHeals');
const skeletonGainsBlockLine = document.getElementById('skeletonGainsBlock');
const heroTurnLine = document.getElementById('heroTurn');
const enemyTurnLine = document.getElementById('enemyTurn');
const hiddenDialogueBox = document.getElementById('hiddenDialogueBox');
const healthBars = document.getElementsByClassName('health-bar');
const splitsElement = document.getElementById('splits');
const rulesElement = document.getElementById('rulesText');

//Create character class, which will then extend to hero and enemies. 
const background = new Sprite(
{
    x: 0, 
    y: 0
    },
'./Images/Background/old-dark-castle-interior-background.png',
 .88,
 1,
 1,
 ctx
)
//add 
//create extra new Sprite to add extra layers with animations in the background.

//the cards that comprise our deck! I have included multiples of each to account
//for every single card included in the starting deck. This may change once
//I can figure out how to create more efficient code.

const attack1 = new AttackCard ('Slice & dice!', {x:0, y:0}, 6, './Images/Cards/ATTACK! V2.png', ctx)

const attack2 = new AttackCard ('Slice & dice!', {x:0, y:0}, 6, './Images/Cards/ATTACK! V2.png', ctx)

const attack3 = new AttackCard ('Slice & dice!', {x:0, y:0}, 6, './Images/Cards/ATTACK! V2.png', ctx)

const attack4 = new AttackCard ('Slice & dice!', {x:0, y:0}, 6, './Images/Cards/ATTACK! V2.png', ctx)

const attack5 = new AttackCard ('Slice & dice!', {x:0, y:0}, 6, './Images/Cards/ATTACK! V2.png', ctx)

const attack6 = new AttackCard ('Slice & dice!', {x:0, y:0}, 6, './Images/Cards/ATTACK! V2.png', ctx)

const block1 = new BlockCard ('Suit up!', {x:0, y:0}, 4, './Images/Cards/BLOCK V2.png', ctx)

const block2 = new BlockCard ('Suit up!', {x:0, y:0}, 4, './Images/Cards/BLOCK V2.png', ctx)

const block3 = new BlockCard ('Suit up!', {x:0, y:0}, 4, './Images/Cards/BLOCK V2.png', ctx)

const block4 = new BlockCard ('Suit up!', {x:0, y:0}, 4, './Images/Cards/BLOCK V2.png', ctx)

//Battle sequence function invoking and event listeners below here

const startGameButton = document.getElementById('start-game-button');
// const endTurnButton = document.getElementById('end-turn-button');
const endGameAlert = document.getElementById('start-game-button');

if (startGameButton) {
    startGameButton.addEventListener('click', event => {
        //our hero
        const player = new Hero(
            {x: 105, y: 170}, 
            30, 
            6, 
            0, 
            3, 
            new Deck(), 
            0, 
            './Images/Knight spritesheets/Knight idle spritesheet.png',
            1.7, 
            1.7, 
            8, 
            ctx
        );

        //our enemy
        const skeleton1 = new Enemy(
            {x: 285, y: 115}, 
            22, 
            5, 
            0, 
            new Deck(), 
            4,
            './Images/skeleton spritesheets/skeleton idle spritesheet.png',
            1.5, 
            1.5, 
            8, 
            ctx
        );

        function animate(){
            background.update();
            player.update();
            skeleton1.update();
            player.hand.forEach((element, index) => { 
                element.setPosition({x:135 + index * 65, y:-37});
                element.update();
            })
            window.requestAnimationFrame(animate);
        }
        rulesElement.classList.add('hidden');
        let newBattle = new Battle(player, skeleton1);
        background.draw();
        newBattle.beginBattle();
        animate();
    });
  }



