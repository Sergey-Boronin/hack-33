if (window.screen.orientation) {
  // Альбомная ориентация
  function setLandscapeOrientation() {
    if (screen.orientation.lock) {
      screen.orientation.lock('landscape');
    }
  }

  // Вызываем функцию для установки альбомной ориентации при загрузке страницы
  setLandscapeOrientation();
}

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

const checkbox_notimer = document.querySelector(".checkbox_notimer");
const checkbox_misses = document.querySelector(".checkbox_misses");
const gameBoard = document.getElementById('game-board');
const timer_elem = document.getElementById('timer');

let score = 0;
let timer;
let gameTime = 10;
let isIconClicked = false;
let misses = false;
let notime = false;
let count_misses = 0;
let randomIndex = 0;

checkbox_misses.addEventListener("change", ()=>{
  misses = checkbox_misses.checked; 
})

checkbox_notimer.addEventListener("change", ()=>{
  notime = checkbox_notimer.checked; 
  if(notime){
    timer_elem.style.display = "none";
  }else{
    timer_elem.style.display = "block";
  }
})

gameBoard.addEventListener("click", function(){
    if(misses){
      count_misses++;
    }

    if(count_misses == 3){
      endGame();
    }
})

function startGame(difficulty) {
  score = 0;
  gameTime = 10;
  isIconClicked = false;
  showNextIcon(difficulty);
  updateTimer();
  if(!notime){
    timer = setInterval(() => {
        gameTime--;
        updateTimer();
        if (gameTime <= 0) {
            endGame();
        }
    }, 1000);
  }
}

function showNextIcon(difficulty) {
  
  gameBoard.innerHTML = '';

  randomIndex = Math.floor(Math.random() * icons.length);
  const icon = icons[randomIndex];

  let iconElement = document.createElement('div');
  iconElement.classList.add('icon');
  gameBoard.appendChild(iconElement);
  iconElement.innerText = icon.name;
  
  iconElement.style.left = Math.random() * (gameBoard.clientWidth - 50) + 'px';
  iconElement.style.top = Math.random() * (gameBoard.clientHeight - 50) + 'px';
  
  let animation_timer;
  
  //сложность: движение
  if (difficulty === 2) {
      animation_timer = setTimeout(()=>moveIcon(iconElement), 500);  
  }

  let hide_elem = setTimeout(() => {
    iconElement.style.display = 'none';
    showNextIcon(difficulty);
    clearTimeout(animation_timer);
  }, 3000);

  iconElement.addEventListener('click', (e) => {
      e.stopPropagation();
      score += 5;
      //iconElement.style.display = 'none'; 
      clearTimeout(hide_elem);
      clearTimeout(animation_timer);
      iconElement.classList.add('hide-icon');
      iconElement.setAttribute("data-after", icons[randomIndex].name);
      setTimeout(()=>showNextIcon(difficulty), 500)
      updateScore();
  });

}

function moveIcon(icon) {
  const gameBoard = document.getElementById('game-board');
  const maxX = gameBoard.clientWidth - 50;
  const maxY = gameBoard.clientHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  icon.style.left = x + 'px';
  icon.style.top = y + 'px';
}

function endGame() {
  clearInterval(timer);

  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<p>Ваш счет: ${score}</p>`;

  if (score > 30) {
      resultElement.innerHTML += '<p>Поздравляем! Вы набрали больше 10 очков!</p>';
  } else {
      resultElement.innerHTML += '<p>Попробуйте еще раз!</p>';
  }

  resultElement.style.display = 'block';
}

function updateTimer() {
  timer_elem.innerText = `Время: ${gameTime}`;
}

function updateScore() {
  document.getElementById('score').innerText = `Очки: ${score}`;
}


//задачи

//disable checkbox 
//выходит анимация за пределы блока +
//в разные стороны менялось движение +
