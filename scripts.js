const icons = [
  { id: 1, name: 'loneliness', imgUrl: '/img/loneliness.png'},
  { id: 2, name: 'fist', imgUrl: '/img/fist.jpg'},
  { id: 3, name: 'application', imgUrl: '/img/application.jpg'},
  { id: 4, name: 'doc', imgUrl: '/img/doc.jpg'},
  { id: 5, name: 'newplaces', imgUrl: '/img/newplaces.jpg'},
  { id: 6, name: 'woman_walks', imgUrl: '/img/woman_walks_out_the_door.jpg'},
  { id: 7, name: 'dark', imgUrl: '/img/darkness.jpg'},
  { id: 8, name: 'alone', imgUrl: '/img/alone.png'},
  //{ id: 9, name: 'Icon 9', imgUrl: 'path/to/icon9.png' },
  //{ id: 10, name: 'Icon 10', imgUrl: 'path/to/icon10.png' },
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

  const iconElement = document.createElement('img');
  iconElement.src=icon.imgUrl;
  iconElement.classList.add('icon');
  //iconElement.innerText = icon.name;

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