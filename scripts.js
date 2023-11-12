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

const checkbox_notimer = document.querySelector(".checkbox_notimer");
const checkbox_misses = document.querySelector(".checkbox_misses");
const gameBoard = document.getElementById('game-board');
const timer_elem = document.getElementById('timer');
const menu = document.querySelector(".menu");
const game = document.querySelector(".board")
const resultElement = document.getElementById('result');

let score = 0;
let timer;
let gameTime = 10;
let isIconClicked = false;
let misses = false;
let notime = false;
let count_misses = 0;
let randomIndex = 0;
let difficultyGlobal

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
  difficultyGlobal = difficulty;
  resultElement.style.display = "none"
  menu.style.display = "none";
  game.style.display = "block";
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

  let iconElement = document.createElement('img');
  iconElement.classList.add('icon');
  iconElement.src = icon.imgUrl;
  gameBoard.appendChild(iconElement);
  // iconElement.innerText = icon.name;
  

  iconElement.style.left = Math.random() * (gameBoard.clientWidth -160) + 'px';
  iconElement.style.top = Math.random() * (gameBoard.clientHeight -160) + 'px';
  
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


  resultElement.innerHTML = `<p>Ваш счет: ${score}</p>`;

  if (score > 30) {
      resultElement.innerHTML += '<p>Поздравляем! Вы набрали больше 10 очков!</p> <button onclick="startGame(difficultyGlobal)">Начать заново</button>';
  } else {
      resultElement.innerHTML += '<p>Попробуйте еще раз!</p><button onclick="startGame(difficultyGlobal)">Начать заново</button>';
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
