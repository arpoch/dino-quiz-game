const SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecog) {
  alert("Not Supported");
}
//Session
function getSessionStore() {
  let store = window.sessionStorage;
  return store.getItem("player");
}
//Sound
let soundEffect = {
  hit: new Audio("sounds/hit.mp3"),
  score: new Audio("sounds/score.mp3"),
};

//QUES-ANSW
function questions() {
  ques = [
    {
      id: "1",
      q: "What is the capital of Arunachal Pradesh?",
      ans: "Itanagar",
    },
    { id: "2", q: "Which is the national sport of India?", ans: "Hockey" },
    {
      id: "3",
      q: "What Indian city is the capital of two states?",
      ans: "Chandigarh",
    },
    {
      id: "4",
      q: "What is the capital of Gujarat?",
      ans: "Gandhinagar",
    },
    {
      id: "5",
      q: "Who was the president of India in 2009?",
      ans: "Pratibha Patil",
    },
  ];
  return ques;
}
let answerMatchresult = {
  flag: false,
  set setflagVal(flag) {
    this.flag = flag;
  },
  get getflagVal() {
    return this.flag;
  },
};
let quizQuestionAnswer = {
  index: -1,
  question: questions(),
  board: document.getElementById("question"), //questions to be displayed
  set setQuestion(question) {
    this.index++;
    if (this.index >= this.question.length) {
      this.board.innerText =
        "Well Done! " +
        getSessionStore() +
        String.fromCodePoint(129321, 129395, 127881);
      gameStatus.setGameOver = true;
      document.dispatchEvent(gameReloadEvent);
    } else {
      this.board.innerText = question[this.index].q;
      Cactus(window.innerWidth);
    }
  },
  set indexReset(flag) {
    if (flag) this.index = -1;
  },
  get getQuestion() {
    if (this.index >= this.question.length) {
      return false;
    } else {
      return this.question[this.index].q;
    }
  },
  get getAnswer() {
    if (this.index >= this.question.length) {
      return false;
    } else {
      return this.question[this.index].ans;
    }
  },
};

//SCORE
let currentScore = 0,
  highScore = 0;
let scoreBoard = {
  scoreBoard: document.getElementById("scoreBoard"),
  score: document.getElementsByClassName("score")[0],
  currentScore: currentScore,
  set setScoreBoard(flag) {
    if (this.score.textContent == "" || flag) {
      let text = document.createTextNode("00000");
      this.score.appendChild(text);
    }
  },
  set setScore(currentScore) {
    this.currentScore = currentScore;
    this.score.textContent = "00" + this.currentScore.toString();
    if (this.currentScore % 300 === 0) {
      soundEffect.score.play();
    }
  },
  set hideScoreBoard(flag) {
    if (flag) {
      this.scoreBoard.style.display = "none";
    } else {
      this.scoreBoard.style.display = "block";
    }
  },
};

//Player
////Draw
function drawDino(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  const dinoCanvas = document.getElementsByClassName("dino")[0];
  if (!dinoCanvas.getContext) {
    alert("Unable to get Context!!\nCanvas not supported");
  }
  const dino = dinoCanvas.getContext("2d");
  let positionInfo = dinoCanvas.getBoundingClientRect();
  dino.clearRect(0, 0, positionInfo.width, positionInfo.height);
  let dinoImage = new Image();
  dinoImage.src = "images/dino.png";
  dinoImage.addEventListener("load", function () {
    dino.drawImage(dinoImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  });
}
////Jump
function jumpDino() {
  const dinoCanvas = document.getElementById("dinoDiv");
  drawDino(1675, 0, 200, 200, 0, 0, 100, 100);
  let initialDist = 150;
  dinoPositon.setDinoPosition = false; //not on ground
  let jumpTime = setInterval(() => {
    //console.log("Jumping UP");
    if (initialDist == 100) {
      clearInterval(jumpTime);
      let downTime = setInterval(() => {
        //console.log("Jumping Down");
        if (initialDist == 200) {
          dinoPositon.setDinoPosition = true;
          clearInterval(downTime);
        } else {
          dinoCanvas.style.top = initialDist + "px";
          initialDist++;
        }
      }, 7);
    } else {
      dinoCanvas.style.top = initialDist + "px";
      initialDist--;
    }
  }, 7);
  console.log("Done Jumping");
  return true;
}
////Run
function dinoRun() {
  console.log("OnGround " + dinoPositon.onground);
  let newCoord = 90,
    position = 1940;
  let timeout = setInterval(() => {
    if (dinoPositon.onground && !gameStatus.getGameOver) {
      // console.log(newCoord);
      position = position - newCoord;
      newCoord = newCoord * -1;
      drawDino(position, 0, 200, 200, 0, 0, 100, 100);
    } else if (gameStatus.getGameOver) {
      clearInterval(timeout);
    }
  }, 100);
}
////Postion flag
let dinoPositon = {
  onground: true,
  set setDinoPosition(flag) {
    this.onground = flag;
  },
  get getDinoPosition() {
    return this.onground;
  },
};

//GAME EVENTS
////Status
let gameStatus = {
  gameOver: false,
  gameReset: false,
  set setGameOver(flag) {
    this.gameOver = flag;
  },
  set setResetGame(flag) {
    this.gameOver = flag;
  },
  get getGameOver() {
    return this.gameOver;
  },
  get getResetGame() {
    return this.gameOver;
  },
};
////Text
function initialText() {
  const groundDiv = document.getElementById("game");
  let text = document.createElement("p");
  text.setAttribute("id", "initText");
  if (!gameStatus.getResetGame) {
    const board = document.getElementById("questionBoard");
    let title = document.createElement("p");
    title.classList.add("stripe-text");
    board.appendChild(title);
    text.innerText = "Press space to start";
  } else {
    text.innerText = "Press space to reload";
  }
  groundDiv.appendChild(text);
}
////Entry Point
function initGame() {
  initialText();
  if (!gameStatus.getResetGame) {
    drawDino(74, 0, 200, 200, 0, 0, 100, 100);
  }
  scoreBoard.hideScoreBoard = true;
  scoreBoard.setScoreBoard = true;
  speechBubble.setHideBubble = true;
  let textHolder = document.getElementById("initText");
  document.addEventListener("keypress", function (e) {
    console.log("Key Pressed");
    if (e.key === " ") {
      if (!gameStatus.getResetGame) {
        textHolder.remove();
        let titleHolder = document.getElementsByClassName("stripe-text")[0];
        titleHolder.remove();
        startGame();
        jumpDino();
      } else if (gameStatus.getResetGame) {
        window.location.reload();
        // textHolder.remove();
        // quizQuestionAnswer.indexReset = true;
        // startGame();
        // jumpDino();
      }
    }
  });
}
/////Reload
const gameReloadEvent = new Event("reloadGame");
document.addEventListener("reloadGame", function () {
  console.log("Reload");
  //Location.reload();
  gameStatus.setGameOver = false;
  gameStatus.setResetGame = true;
  initGame();
  // quizQuestionAnswer.indexReset = true;
  // answerMatchresult.setflagVal = false;
});
/////Start
function startGame() {
  quizQuestionAnswer.setQuestion = questions();
  scoreBoard.hideScoreBoard = false;
  Speech();
  dinoRun();
  //drawDino(1675, 0, 200, 200, 0, 0, 100, 100);
  groundMove();
}
////Over
function gameOver() {
  const textStatus = document.getElementById("gameOver");
  const iconStatus = document.getElementById("reloadIcon");
  const correctAns = document.querySelector("#correctAnswer > p");
  const gameOvertext = textStatus.getContext("2d");
  const gameOverIcon = iconStatus.getContext("2d");
  let image = new Image();
  image.src = "images/dino.png";
  drawDino(2120, 0, 200, 200, 0, 0, 100, 100);
  soundEffect.hit.play(); //play hit sound
  gameOvertext.drawImage(image, 1295, 25, 385, 200, 0, 5, 150, 150);
  gameOverIcon.drawImage(image, 0, 0, 200, 200, 0, 0, 100, 100);
  correctAns.innerText = "Correct Answer: " + quizQuestionAnswer.getAnswer;
  sp.stop(); //stop speech recognition
  document.dispatchEvent(gameReloadEvent);
}

//OBSTACLE
let obctacleSpeed = 2;
function Cactus(cactusPosition) {
  var isJumped = false;
  const cactusContainer = document.getElementById("cactusContainer");
  const cactusElement = document.createElement("canvas");
  cactusElement.setAttribute("height", 55);
  cactusElement.setAttribute("width", 25);
  cactusElement.classList.add("cactus");
  cactusElement.style.left = cactusPosition + "px";
  cactusContainer.appendChild(cactusElement);
  if (!cactusElement.getContext) {
    alert("Unable to get Context!!\nCanvas not supported");
  }
  let cactusImage = new Image();
  cactusImage.src = "images/dino.png";
  cactusImage.addEventListener("load", function () {
    cactusElement
      .getContext("2d")
      .drawImage(cactusImage, 652, 0, 200, 200, 0, 0, 100, 100);
  });

  let time = setInterval(function () {
    // console.log(
    //   "Match " + quizQuestionAnswer.getflagVal + "ToJump " + tojump(cactusPosition)
    // );
    // console.log(cactusPosition);
    if (!answerMatchresult.getflagVal && tojump(cactusPosition)) {
      console.log("Interval  Cleared");
      gameStatus.setGameOver = true;
      gameOver();
      clearInterval(time);
    } else if (
      answerMatchresult.getflagVal &&
      tojump(cactusPosition) &&
      !isJumped
    ) {
      console.log("Set Score");
      scoreBoard.setScore = currentScore;
      console.log("Do jump");
      isJumped = jumpDino();
      console.log("Set Question");
      quizQuestionAnswer.setQuestion = questions();
      console.log("Hide Speech Bubble");
      speechBubble.setHideBubble = true;
    }
    if (cactusPosition <= 0) {
      console.log("Reset setFlag");
      answerMatchresult.setflagVal = false; //Correct Answer, Reset for next question
      cactusElement.remove();
      clearInterval(time);
    } else {
      cactusElement.style.left = cactusPosition + "px";
      cactusPosition = cactusPosition - 1;
    }
  }, obctacleSpeed);
  return 0;
}
////When to jump
function tojump(cactusPosition) {
  //console.log("CactusP= " + cactusPosition);
  const dinoPositon = document.getElementsByClassName("dino")[0];
  //height
  //console.log(fun + " " + cactusPosition);
  if (dinoPositon.width - cactusPosition * 1.5 >= -45) {
    //distnace between the obstalce(cactus) and player have reached a specified number
    return true;
  } else return false;
}

//BACKGROUND
function groundMove() {
  const groundDiv = document.getElementById("Dinoground");
  const ground = document.getElementById("ground");
  let positionInfo = groundDiv.getBoundingClientRect();
  groundDiv.appendChild(ground);
  let groundCanvas = ground.getContext("2d");
  let groundImage = new Image();
  groundImage.src = "images/ground.png";
  let canvasWidth = positionInfo.width,
    canvasHeight = positionInfo.height,
    scrollVal = 0,
    speed = 1;
  console.log("Width " + canvasWidth);

  groundImage.addEventListener("load", () => {
    function loadImage() {
      render();
    }
    function render() {
      groundCanvas.clearRect(0, 0, canvasWidth, canvasHeight);
      if (scrollVal >= canvasWidth - speed) {
        scrollVal = 0;
      }
      scrollVal += speed;
      // To go the other way instead
      groundCanvas.drawImage(
        groundImage,
        -scrollVal, //It is minus because we have to go left to right ``canvasWidth + (canvasWidth * 5) / 100
        -100,
        canvasWidth + 0.5,
        130
      );
      groundCanvas.drawImage(
        groundImage,
        canvasWidth - scrollVal,
        -100,
        canvasWidth,
        130
      );
      let groundTimeOut = setTimeout(function () {
        render();
      }, 4);
      if (gameStatus.getGameOver) {
        clearInterval(groundTimeOut);
      }
    }
    loadImage();
  });
}

//__WSA__
let sp = new SpeechRecog();
function Speech() {
  sp.lang = "en-US";
  sp.continuous = false;
  sp.start();
  sp.addEventListener("start", speechStart);
  sp.addEventListener("result", (event) => {
    speechResult(event);
  });
  sp.addEventListener("end", () => {
    if (!gameStatus.getGameOver) sp.start();
  });
}
function speechStart() {
  console.log("WEB Speech API Started");
}
function speechResult(event) {
  let x = event.results[0][0].transcript.toUpperCase().trim();
  //speechBubble.setBubbleResult = x;
  let y = quizQuestionAnswer.getAnswer.toUpperCase();
  if (typeof y === Boolean) {
    console.log("No more Questions");
  }
  if (x == y) {
    speechBubble.setBubbleResult = x;
    console.log("Match");
    currentScore += 100;
    answerMatchresult.setflagVal = true;
  } else if (x != y) {
    speechBubble.setBubbleResult = x;
    answerMatchresult.setflagVal = false;
    console.log("No Match" + x + "" + y);
  }
}

//Speech Display
let speechBubble = {
  bubbleBox: document.getElementsByClassName("oval-thought")[0],
  bubble: document.getElementById("speechBubble"),
  // document.getElementsByClassName("oval-thought").firstElementChild,
  set setBubbleResult(result) {
    this.bubbleBox.style.display = "inline-block";
    this.bubble.innerText = result;
    this.bubble.style.display = "block";
  },
  set setHideBubble(flag) {
    if (flag) {
      this.bubble.style.display = "none";
      this.bubbleBox.style.display = "none";
    }
  },
};
