const icons = [
  { id: 1, name: 'Icon 1', imgUrl: 'path/to/icon1.png' },
  { id: 2, name: 'Icon 2', imgUrl: 'path/to/icon2.png' },
  { id: 3, name: 'Icon 3', imgUrl: 'path/to/icon3.png' },
  { id: 4, name: 'Icon 4', imgUrl: 'path/to/icon4.png' },
  { id: 5, name: 'Icon 5', imgUrl: 'path/to/icon5.png' },
  { id: 6, name: 'Icon 6', imgUrl: 'path/to/icon6.png' },
  { id: 7, name: 'Icon 7', imgUrl: 'path/to/icon7.png' },
  { id: 8, name: 'Icon 8', imgUrl: 'path/to/icon8.png' },
  { id: 9, name: 'Icon 9', imgUrl: 'path/to/icon9.png' },
  { id: 10, name: 'Icon 10', imgUrl: 'path/to/icon10.png' },
];

let score = 0;
let timer;
let gameTime = 60;
let isIconClicked = false;

function startGame(difficulty) {
  // document.getElementById('difficulty-select').style.display = 'none';

  score = 0;
  gameTime = 60;
  isIconClicked = false;
  showNextIcon(difficulty);
  updateTimer();
  timer = setInterval(() => {
      gameTime--;
      updateTimer();
      if (gameTime <= 0) {
          endGame();
      }
  }, 1000);
}

function showNextIcon(difficulty) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  const randomIndex = Math.floor(Math.random() * icons.length);
  const icon = icons[randomIndex];

  const iconElement = document.createElement('div');
  iconElement.classList.add('icon');
  iconElement.innerText = icon.name;

  iconElement.style.left = Math.random() * (gameBoard.clientWidth - 50) + 'px';
  iconElement.style.top = Math.random() * (gameBoard.clientHeight - 50) + 'px';

  if (difficulty === 2) {
      iconElement.classList.add('move-icon');
  }

  iconElement.addEventListener('click', () => {
      score += 5;
      iconElement.style.display = 'none';
      showNextIcon(difficulty);
      updateScore();
  });

  gameBoard.appendChild(iconElement);

  setTimeout(() => {
      iconElement.style.display = 'none';
      showNextIcon(difficulty);
  }, 3000);
}

function moveIcon(iconElement) {
  const gameBoard = document.getElementById('game-board');
  const maxX = gameBoard.clientWidth - 50;
  const maxY = gameBoard.clientHeight - 50;

  function move() {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      iconElement.style.left = x + 'px';
      iconElement.style.top = y + 'px';

      requestAnimationFrame(move);
  }

  move();
}

function endGame() {
  clearInterval(timer);

  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<p>Ваш счет: ${score}</p>`;

  if (score > 50) {
      resultElement.innerHTML += '<p>Поздравляем! Вы набрали больше 50 очков!</p>';
  } else {
      resultElement.innerHTML += '<p>Попробуйте еще раз!</p>';
  }

  resultElement.style.display = 'block';
}

function updateTimer() {
  document.getElementById('timer').innerText = `Время: ${gameTime}`;
}

function updateScore() {
  document.getElementById('score').innerText = `Очки: ${score}`;
}

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});