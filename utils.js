import { Status } from "./status.js";
import { ELEMNT } from "./status.js";
import { squares } from "./game.js";

export const utils = {
    resize: function () {
        let size = Math.min(window.innerHeight, window.innerWidth)
        if (size > 100) {
            document.documentElement.style.setProperty('--size-grid', `${size - utils.percentage(20, size)}px`);
        }
    },

    percentage: function (num, per) {
        return Math.round((num / 100) * per)
    },

    remove: function () {
        for (let idx of Status.enemiesInvaders) {
            squares[idx]?.classList.remove('invader')
        }
    },

    iconHelth: function () {
        let inner = ""
        for (let i = 0; i < Status.helthPlayer; i++) {
            inner += '<img class="heart" src="Mini Pixel Pack 3/Icons/HUD_Icons-20.png" alt="">'
        }
        ELEMNT.helthIcon.innerHTML = inner
    },
    draw: function () {
        for (let i = 0; i < Status.enemiesInvaders.length; i++) {
            if (!Status.enemiesRemoved.includes(i)) {
                squares[Status.enemiesInvaders[i]]?.classList.add('invader')
            }
        }
    },

    resetStatus: function () {
        Status.isGoingRight = true
        Status.direction = 1
        Status.enemiesRemoved = []
        // Status.enemiesInvaders= [0, 1, 2]
        Status.enemiesInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
    },

    // ahiti history functions are here hhhhhhh ====================>

    hideStory: function () {
        ELEMNT.storyContainer.classList.add('hidden')
    },
    
}