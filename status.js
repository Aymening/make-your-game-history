export const Status = {
    width: 20,
    playerIndex: 349,
    enemiesRemoved: [],
    isGoingRight: true,
    direction: 1,
    scor: 0,
    lastInvaderMoveTime: 0,
    invaderSpeed: 100,
    laserId: undefined,
    explosions: [],
    isGameOver: false,
    isPaused: false,
    helthPlayer: 3,
    enemiesInvaders: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49],

         // here is my history variables 'ahiti' ===================>
    storyTexts: [
        "Welcome to Space Invaders! Defend the Earth from alien invaders!",
        "Halfway there! Keep fighting, the fate of humanity depends on you!",
        "Congratulations! You have defeated the invaders and saved the Earth!"
    ],
    storyPhase: 0,
    isStoryActve: false
}

export const ELEMNT = {
    grid: document.querySelector('.grid'),
    resultDisplay: document.querySelector('.result'),
    helthIcon: document.querySelector('.helth'),
    popup: document.querySelector('.container'),
    btnPopup: document.querySelector('.btn-popup'),
    retroText: document.querySelector('.retro-text'),
    menu: document.getElementById('menu'),
    resumeBtn: document.getElementById('resumeBtn'),
    restartBtn: document.getElementById('restartBtn'),
    menuButton: document.getElementById('menuButton'),

     // here is my history variables 'ahiti' ===================>
        storyContainer: document.getElementById('story-container'),
     continueButton: document.getElementById('continue-button'),
     storyTextElement: document.getElementById('story-text'),
     // restbtn: document.getElementById('rest-btn')
}