const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
let playerIndex = 349
const width = 20
const enemiesRemoved = []
let isGoingRight = true
let direction = 1
let results = 0
let lastInvaderMoveTime = 0
const invaderSpeed = 150
let laserId
let explosions = []
let isGameOver = false
let isStoryActve = false
let isPaused = false

for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.dataset.idx = i
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

let enemiesInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49
]

function draw() {
    for (let i = 0; i < enemiesInvaders.length; i++) {
        if (!enemiesRemoved.includes(i)) {
            squares[enemiesInvaders[i]].classList.add('invader')
        }
    }
}

function resize() {
    let size = Math.min(window.innerHeight, window.innerWidth)
    if (size > 100) {
        // console.log(size, percentage(10, size))
        document.documentElement.style.setProperty('--size-grid', `${size - percentage(20, size)}px`);
    }
}

const percentage = (num, per) => Math.round((num / 100) * per)

function remove() {
    for (let idx of enemiesInvaders) {
        squares[idx].classList.remove('invader')
    }
}

// let paused = false 

function movePlayer(eve) {
    if (isGameOver) return
    if (isPaused) return
    squares[playerIndex].classList.remove("shooter", "left", "right")
    squares[playerIndex + width].classList.remove('firechip')

    switch (eve.key) {
        case 'ArrowLeft':
            if (playerIndex % width !== 0) {
                playerIndex -= 1
                squares[playerIndex].classList.add("shooter", "left")
                setTimeout(() => {
                    squares[playerIndex].classList.remove("left")
                }, 150)
            }
            break
        case 'ArrowRight':
            if (playerIndex % width < width - 1) {
                playerIndex += 1
                squares[playerIndex].classList.add("shooter", "right")
                setTimeout(() => {
                    squares[playerIndex].classList.remove("right")
                }, 150)
            }
            break
    }


    squares[playerIndex].classList.add("shooter")
    squares[playerIndex + width].classList.add('firechip')

}

function stopAnimation(grid) {

    grid.forEach(square => {
        if (square.classList.contains('invader')) {
            square.classList.add('invader-stopped')
        }

    });

}
document.addEventListener('keydown', movePlayer)

function moveInvaders(timestamp) {
    if (!lastInvaderMoveTime) lastInvaderMoveTime = timestamp
    const progress = timestamp - lastInvaderMoveTime

    if (progress >= invaderSpeed) {
        lastInvaderMoveTime = timestamp
        const leftEdge = enemiesInvaders[0] % width === 0
        const rightEdge = enemiesInvaders[enemiesInvaders.length - 1] % width === width - 1

        if (squares[playerIndex].classList.contains('invader')) {
            resultDisplay.innerHTML = 'GAME OVER'
            squares[playerIndex + width].classList.remove('firechip')
            isGameOver = true
            stopAnimation(squares)
            return
        }
        if (enemiesInvaders.length === enemiesRemoved.length) {

            let Bo = document.querySelector('.boom')
            // console.log(Bo);

            Bo.remove()
            resultDisplay.innerHTML = 'YOU WIN'
            isGameOver = true
            // playerWon = true
            // console.log('djkhfdjhk');

            return
        }

        remove()

        if (rightEdge && isGoingRight) {
            for (let i = 0; i < enemiesInvaders.length; i++) {
                enemiesInvaders[i] += width + 1
                direction = -1
                isGoingRight = false
            }
        }
        if (leftEdge && !isGoingRight) {
            for (let i = 0; i < enemiesInvaders.length; i++) {
                enemiesInvaders[i] += width - 1
                direction = 1
                isGoingRight = true
            }
        }
        for (let i = 0; i < enemiesInvaders.length; i++) {
            enemiesInvaders[i] += direction
        }
        draw()
    }
}


function moveRocket() {
    if (laserId !== undefined) {
        squares[laserId].classList.remove('laser')
        if (laserId >= width) {
            laserId -= width
            if (laserId > width) squares[laserId].classList.add('laser')
        }
    }

    if (laserId !== undefined && squares[laserId].classList.contains('invader')) {
        squares[laserId].classList.remove('laser')
        squares[laserId].classList.remove('invader')
        explosions.push({ index: laserId, time: performance.now() })
        const enemyDestroyed = enemiesInvaders.indexOf(laserId)
        enemiesRemoved.push(enemyDestroyed)
        results++
        resultDisplay.innerHTML = results
        laserId = undefined
    } else if (laserId !== undefined && laserId < width) {
        laserId = undefined
    }
}

document.addEventListener('keydown', (eve) => {
    if (eve.key === ' ') {
        if (laserId === undefined) {
            laserId = playerIndex
        }
    }
})

function handleExplosions(timestamp) {
    explosions = explosions.filter(explosion => {
        if (timestamp - explosion.time > 450) {
            squares[explosion.index].classList.remove('boom')
            return false
        } else {
            if (!squares[explosion.index].classList.contains('boom')) {
                squares[explosion.index].classList.add('boom')
            }
            return true
        }
    })
}


const menu = document.getElementById('menu')
const resumeBtn = document.getElementById('resumeBtn')
const restartBtn = document.getElementById('restartBtn')
const menuButton = document.getElementById('menuButton')

function gameLoop(timestamp) {
    if (isGameOver || isPaused) {
        return
    }

    if (storyPhase === 0 && !isStoryActve) {
        // isPaused = true
        showStory()

    }

    // isPaused = false 

    if (storyPhase === 1 && results === 25 && !isStoryActve) {
        // isPaused = true
        showStory()
    }

    // console.log('player won',playerWon);
    // console.log('isgameover',isGameOver);

    if (storyPhase === 2 && enemiesInvaders.length === enemiesRemoved.length) {
        // console.log('11');

        showStory()
    }


    moveInvaders(timestamp)
    moveRocket()
    handleExplosions(timestamp)
    requestAnimationFrame(gameLoop)
}

function toggleMenu() {
    if (menu.style.display === 'flex') {
        menu.style.display = 'none'
        isPaused = false
        requestAnimationFrame(gameLoop)
    } else {
        menu.style.display = 'flex'
        isPaused = true
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        toggleMenu()
    }
})

menuButton.addEventListener('click', () => {
    toggleMenu()
})



resumeBtn.addEventListener('click', () => {
    isPaused = false
    menu.style.display = 'none'
    requestAnimationFrame(gameLoop)
})

// history from here!!! ===================**************************************>



const story = {
    intro: "Welcome! Aliens are invading Earth. As the last hero, it's your job to defend it!",
    development: "Great job! You've cleared the first wave, but more are coming. Keep going!",
    conclusionWin: "Congratulations! You've defeated the alien invaders and saved the planet!",
    conclusionLose: "Game Over. The aliens have conquered Earth. Better luck next time!",
};

let storyContainer = document.getElementById('story-container')
let continueButton = document.getElementById('continue-button')

let storyPhase = 0

function showStory() {
    isPaused = true
    const storyTexts = [
        "Welcome to Space Invaders! Defend the Earth from alien invaders!",
        "Halfway there! Keep fighting, the fate of humanity depends on you!",
        "Congratulations! You have defeated the invaders and saved the Earth!"
    ]
    let storyText = storyTexts[storyPhase]
    let storyTextElement = document.getElementById('story-text')

    storyTextElement.textContent = storyText
    storyContainer.classList.remove('hidden')
    isStoryActve = true

    continueButton.onclick = () => {
        storyContainer.classList.add('hidden')

        isStoryActve = false
        isPaused = false
        // isGoingRight = false

        storyPhase++
        // if(storyPhase === 1) { 
        // console.log('44');        
        requestAnimationFrame(gameLoop)
        // }
    }
}

function hideStory() {
    storyContainer.classList.add('hidden')
}
continueButton.addEventListener('click', hideStory)




//restart mn hnaaaaa===============================>

restartBtn.addEventListener('click', () => {
    enemiesRemoved.length = 0
    results = 0
    isGameOver = false
    playerIndex = 349
    isPaused = false
    lastInvaderMoveTime = 0

    enemiesInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49
    ]

    squares.forEach(square => {
        square.className = ''
    });

    squares[playerIndex].classList.add('shooter')
    squares[playerIndex + width].classList.add('firechip')
    draw()

    menu.style.display = 'none'

    requestAnimationFrame(gameLoop)
});




draw()
resize()
// document.documentElement.style.setProperty('--size-grid', '200px');
// console.log(window.innerHeight, window.innerWidth);
// console.log(window.innerHeight, window.innerWidth);
window.addEventListener("resize", resize)
squares[playerIndex].classList.add("shooter")
squares[playerIndex + width].classList.add('firechip')
requestAnimationFrame(gameLoop)