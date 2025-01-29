# Game Project: JavaScript & DOM-based Game

## Description

This is a browser-based game built with **plain JavaScript**, **HTML**, and **DOM** without any frameworks or canvas elements. The goal of the project is to create a smooth and interactive game that runs at a minimum of **60 FPS** at all times. The game includes a pause menu, scoreboard, and various performance optimizations to ensure that the experience is smooth and responsive.

## Features

- **Smooth Animation (60 FPS)**: The game ensures that animations run at 60 FPS, achieving smooth, consistent motion without interruptions or stuttering.
- **Performance Measurement**: The performance is measured and optimized to avoid frame drops. We use `requestAnimationFrame` to ensure smooth rendering.
- **Pause Menu**:
  - **Continue**: Resumes the game from the paused state.
  - **Restart**: Resets the game state and restarts the game.
- **Scoreboard**: Displays the following metrics during gameplay:
  - **Countdown Timer**: Indicates the amount of time left until the game ends or the amount of time the game has been running.
  - **Score**: Displays the player's current score (XP or points).
  - **Lives**: Shows the number of lives the player has remaining.
- **Minimal Layer Use**: Optimized rendering performance by minimizing unnecessary DOM elements and layers.
- **Keyboard Controls**: The game can be controlled entirely through the keyboard, with smooth, responsive actions that don’t require key spamming. Holding down a key continues the relevant action until released.

## Getting Started

### Prerequisites

To run the game, you only need a web browser since the game is built using basic web technologies:
- JavaScript
- HTML
- CSS

### Running the Game

1. Clone or download the repository.
2. Open the `index.html` file in your preferred web browser.
3. Use the arrow keys or other specified keys (depending on the game) to control the game.
4. To pause the game, press the pause button (or a specific key if implemented).

### Game Controls

- **Arrow keys** or **WASD**: Move the character (or perform game actions).
- **Spacebar**: (Optional) Fire or trigger an action.
- **Esc**: Pause the game and access the pause menu.

### Pause Menu

- **Continue**: Resume the game without any frame drops.
- **Restart**: Reset the game state and restart from the beginning.
- **Pause**: Pause the game without causing any frame drops.

## Design Principles

- **Performance First**: Achieving a minimum of 60 FPS is a key priority. The game ensures smooth, consistent animation without frame drops.
- **Responsive Controls**: Keyboard actions are responsive, and pressing a key will continue triggering the corresponding action until the key is released.
- **Minimal Layering**: The rendering layer of the game is optimized by reducing unnecessary layers in the DOM, ensuring performance remains fast.
- **HTML/DOM-Based**: The game is built entirely with JavaScript and HTML. No external frameworks, libraries, or canvas elements are used.

## Performance Optimization

We carefully use `requestAnimationFrame` to handle smooth animations, minimizing the chances of frame drops or performance lags. We also measure the performance of critical code sections to ensure the game maintains a steady frame rate.

## Contributing

If you would like to contribute to the project, feel free to fork the repository and make your changes. Please submit pull requests with a description of the changes and why they were made.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Good luck, and enjoy playing the game!
