# **Dino Quiz Game**

## Abstract

This project is based on creating the Dino Runner game from scratch and reform it into a Quiz Game that uses Voice Recognition with Web Speech API.

The game is developed using HTML, CSS and Vanilla JavaScript. It is designed to quiz the player, given a set time bound for each question and the questions difficulty level will increase as the player progresses. The questions are either General Knowledge or Current Affairs based in context to India.

## Introduction

You all must be aware of the Chrome Dinosaur Game, also known as T-Rex Game and Dino Runner, a built-in browser game in the Google Chrome web browser, accessed when offline on Google Chrome or by typing chrome://dino in the address bar. But if you have never played, then it is your lucky day!

Unlike the Chrome Dinosaur Game which is controlled using keyboard to perform actions such as Jump and Duck, this game uses speech to trigger actions such as Jump and Duck. It cultivates the engagement of the player in a unique and fun way while expanding the knowledge of the player.

## Game Structure

1. HTML Layout: The HTML layout defines the element structure that would be shown on the page.

- Header: This section is placed at the top of the web-page and is used for the following:

  - Title: It displays the title of the game, when the game is loaded for the first time or reloaded.

  - Question Board:It shows the questions for the quiz.

  - Answer Board: It shows the answer to the current question of which the player gave an incorrect answer.

- Game: This section is where the whole game will be executed. It includes :

  - Score Board: This block will display the score player has reached.

  - Game Status: This block is displayed when the game has started or when the game is over.

  - Dino: This block shows the player image and sets the player position in the game.

  - Cactus: This block shows the obstacles(cactus) and sets the obstacle’s position.

  - Ground: This block displays the ground and sets its position in the game.

  - Speech Bubble: This block shows the speech results, which the player will speak through the microphone.

2. CSS Styling: CSS is used to style the different portions in HTML and make it more visually appealing.

   - The CSS Stylesheet is inserted under the <head> tag named as index.css.

   - The game title Dino Quiz, a paragraph element `<p>` created through JavaScript `createElement()` function, has class attribute stripe-text. Pseudo-element ::after and ::before are used to provide text styling and text shadow respectively.

   - The Speech Bubble is a div element with the class attribute oval-thought that provides a bubble-shaped styling to the element. Its child element, `<p>`, text node is updated from the player’s speech result as it speaks in the microphone.

   - Google-Fonts are used to give an arcade look to the game by using “Press Start 2P” font-family to display the player’s scores.

   - -webkit vendor prefix is used in both CSS and JavaScript to provide support for experimental features such as Web Speech API which is currently supported by Chrome and Edge desktop browsers.

3. JavaScript: The heavy lifting behind the scenes is done by JavaScript, such as manipulating DOM elements, integrating Web Speech API, Animation, and much more. The JavaScript code is defined in the Game.js file, inserted in the HTML file just before the </body> tag using <script></script> tags, loading the HTML code first.

## Flowchart

![Flowchat](/images/Flowchart.png)
