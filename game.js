import chrono from "./chrono.js"
import { Status } from "./status.js"
import { ELEMNT } from "./status.js"
import { utils } from "./utils.js";

export let squares = []

setInterval(() => {
    let rndm = Math.random() * (11 - 6) + 6;
    document.body.style.opacity = rndm / 10
}, 16)

function build() {
    for (let i = 0; i < Status.width * Status.width; i++) {
        const square = document.createElement('div')
        square.dataset.idx = i
        ELEMNT.grid.appendChild(square)
    }
    squares = Array.from(document.querySelectorAll('.grid div'))
}
build()

function start() {
    utils.remove()
    utils.resetStatus()
    Status.isGameOver = false
    Status.helthPlayer = 3
    Status.scor = 0
    ELEMNT.resultDisplay.innerHTML = Status.scor
    ELEMNT.retroText.textContent = "game over"

    utils.resize()
    utils.draw()
    utils.iconHelth()
    chrono.resetChrono()
    chrono.startChrono()

    squares[Status.playerIndex].classList.add("shooter")
    squares[Status.playerIndex + Status.width].classList.add('firechip')
}

function movePlayer(eve) {
    if (Status.isGameOver || Status.isPaused) return
    if (eve.key !== 'ArrowLeft' && eve.key !== 'ArrowRight' && eve.key !== ' ') return

    squares[Status.playerIndex].classList.remove("shooter", "left", "right")
    squares[Status.playerIndex + Status.width].classList.remove('firechip')

    switch (eve.key) {
        case 'ArrowLeft':
            if (Status.playerIndex % Status.width !== 0) {
                Status.playerIndex -= 1
                squares[Status.playerIndex].classList.add("shooter", "left")
                setTimeout(() => {
                    squares[Status.playerIndex].classList.remove("left")
                }, 150)
            }
            break
        case 'ArrowRight':
            if (Status.playerIndex % Status.width < Status.width - 1) {
                Status.playerIndex += 1
                squares[Status.playerIndex].classList.add("shooter", "right")
                setTimeout(() => {
                    squares[Status.playerIndex].classList.remove("right")
                }, 150)
            }
            break
        case ' ':
            if (Status.laserId === undefined) {
                Status.laserId = Status.playerIndex
            }
            break
    }
    squares[Status.playerIndex].classList.add("shooter")
    squares[Status.playerIndex + Status.width].classList.add('firechip')
}


function moveInvaders(timestamp) {
    if (!Status.lastInvaderMoveTime) Status.lastInvaderMoveTime = timestamp
    const progress = timestamp - Status.lastInvaderMoveTime
    // - helth
    if (squares[Status.playerIndex].classList.contains('invader')) {
        utils.losedLive()
    }
    //game over
    if (Status.helthPlayer === 0) {
        Status.isGameOver = true
        ELEMNT.popup.classList.add('active')
        chrono.stopChrono()
        return
    }

    if (progress >= Status.invaderSpeed) {
        Status.lastInvaderMoveTime = timestamp
        const leftEdge = Status.enemiesInvaders[0] % Status.width === 0
        const rightEdge = Status.enemiesInvaders[Status.enemiesInvaders.length - 1] % Status.width === Status.width - 1

        // next level
        if (Status.enemiesInvaders.length === Status.enemiesRemoved.length) {
            utils.resetStatus()
            Status.invaderSpeed += utils.percentage(10, Status.invaderSpeed)
        }

        utils.remove()
        if (rightEdge && Status.isGoingRight) {
            for (let i = 0; i < Status.enemiesInvaders.length; i++) {
                Status.enemiesInvaders[i] += Status.width + 1
                Status.direction = -1
                Status.isGoingRight = false
            }
        }
        if (leftEdge && !Status.isGoingRight) {
            for (let i = 0; i < Status.enemiesInvaders.length; i++) {
                Status.enemiesInvaders[i] += Status.width - 1
                Status.direction = 1
                Status.isGoingRight = true
            }
        }
        for (let i = 0; i < Status.enemiesInvaders.length; i++) {
            Status.enemiesInvaders[i] += Status.direction
        }
        utils.draw()
    }
}

function moveRocket() {
    if (Status.laserId !== undefined) {
        squares[Status.laserId].classList.remove('laser')
        if (Status.laserId >= Status.width) {
            Status.laserId -= Status.width
            if (Status.laserId > Status.width) squares[Status.laserId].classList.add('laser')
        }
    }

    if (Status.laserId !== undefined && squares[Status.laserId].classList.contains('invader')) {
        squares[Status.laserId].classList.remove('laser')
        squares[Status.laserId].classList.remove('invader')
        Status.explosions.push({ index: Status.laserId, time: performance.now() })
        const enemyDestroyed = Status.enemiesInvaders.indexOf(Status.laserId)
        Status.enemiesRemoved.push(enemyDestroyed)
        Status.scor++
        ELEMNT.resultDisplay.innerHTML = Status.scor
        Status.laserId = undefined
    } else if (Status.laserId !== undefined && Status.laserId < Status.width) {
        Status.laserId = undefined
    }
}

function handleExplosions(timestamp) {
    Status.explosions = Status.explosions.filter(explosion => {
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

ELEMNT.btnPopup.addEventListener("click", () => {
    setTimeout(() => {
        ELEMNT.popup.classList.remove('active')
        Status.storyPhase = 0
        start()
        gameLoop()
    }, 500)
    // ELEMNT.popup.classList.remove('active')
    // Status.storyPhase = 0
    // start()
    // gameLoop()
})

// ahiti menu start here ==================================================================>

ELEMNT.menuButton.addEventListener('click', () => {
    if (ELEMNT.menu.style.display === 'flex') {
        ELEMNT.menu.style.display = 'none'
        Status.isPaused = false
        gameLoop()
    } else {
        ELEMNT.menu.style.display = 'flex'
        Status.isPaused = true
        chrono.stopChrono()
    }
})

ELEMNT.resumeBtn.addEventListener('click', () => {
    Status.isPaused = false
    ELEMNT.menu.style.display = 'none'
    chrono.startChrono()
    gameLoop()
})

ELEMNT.restartBtn.addEventListener('click', () => {
    ELEMNT.menu.style.display = 'none'
    Status.isPaused = false
    start()
    gameLoop()
});

// history from hereee =====================>

function showStory() {
    Status.isPaused = true
    chrono.stopChrono()

    let storyText = Status.storyTexts[Status.storyPhase]

    ELEMNT.storyTextElement.textContent = storyText
    ELEMNT.storyContainer.classList.remove('hidden')
    Status.isStoryActve = true
    ELEMNT.continueButton.onclick = () => {
        ELEMNT.storyContainer.classList.add('hidden')
        Status.isStoryActve = false
        Status.isPaused = false
        chrono.startChrono()

        Status.storyPhase++
        requestAnimationFrame(gameLoop)
    }
}
ELEMNT.continueButton.addEventListener('click', utils.hideStory)

function gameLoop(timestamp) {
    if (Status.isGameOver || Status.isPaused) return

    if (Status.storyPhase === 0 && !Status.isStoryActve) {
        showStory()
    }

    if (Status.storyPhase === 1 && Status.scor === 15 && !Status.isStoryActve) {
        showStory()
    }


    if (Status.storyPhase === 2 && Status.enemiesInvaders.length === Status.enemiesRemoved.length) {
      
        // setTimeout(() => {
        //     showStory()
        // ELEMNT.continueButton.textContent = "restart"

        // ELEMNT.continueButton.onclick = () => {
        //     utils.hideStory()
        //     Status.isPaused = false
        //     Status.storyPhase = 0
        //     start()
        //     gameLoop()
        //     ELEMNT.continueButton.textContent = "Continue"
        //     showStory()
        // }
        // }, 500);

        showStory()
        ELEMNT.continueButton.textContent = "restart"

        ELEMNT.continueButton.onclick = () => {
            utils.hideStory()
            Status.isPaused = false
            Status.storyPhase = 0
            start()
            gameLoop()
            ELEMNT.continueButton.textContent = "Continue"
            showStory()
        }
        return
    }

    moveInvaders(timestamp)
    moveRocket()
    handleExplosions(timestamp)
    requestAnimationFrame(gameLoop)
}




// function gameLoop(timestamp) {
//     if (Status.isGameOver || Status.isPaused) return

//     moveInvaders(timestamp)
//     moveRocket()
//     handleExplosions(timestamp)
//     requestAnimationFrame(gameLoop)
// }

start()
window.addEventListener("resize", utils.resize)
document.addEventListener('keydown', movePlayer)
requestAnimationFrame(gameLoop)