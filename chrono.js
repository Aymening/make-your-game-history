import { Status } from "./status.js";
import { ELEMNT } from "./status.js";
export const chrono = {
    min: document.querySelector('#minutes'),
    sec: document.querySelector('#second'),
    timer: 0,
    interval: null,
    isRunning: false,

    decrementTimer: function () {
        if (this.timer === 0) {
            Status.helthPlayer = 0;
            ELEMNT.retroText.textContent = "time is up";
            this.stopChrono();
            return
        }

        this.timer--;
        const numberMin = Math.floor(this.timer / 60);
        const numberSec = this.timer % 60;

        this.sec.innerText = this.pad(numberSec);
        this.min.innerText = this.pad(numberMin);
    },

    pad: function (number) {
        return (number < 10) ? '0' + number : number;
    },

    startChrono: function () {
        if (this.isRunning) return;

        this.isRunning = true;
        this.interval = setInterval(this.decrementTimer.bind(this), 1000);
    },

    stopChrono: function () {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.interval);
    },

    resetChrono: function () {
        this.stopChrono();
        this.timer = 30;
        this.min.innerText = `${Math.floor(this.timer / 60)}`;
        this.sec.innerText = '30';
    }
};

export default chrono