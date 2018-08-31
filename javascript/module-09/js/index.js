'use strict'
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

const clockface = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const lapBtn = document.querySelector('.js-take-lap');
const resetBtn = document.querySelector('.js-reset');
const listOfLaps = document.querySelector('.js-laps');
let isActive = false;
let id = null;
let startTime = 0;
let deltaTime = 0;
resetBtn.setAttribute('disabled', '');
resetBtn.style.opacity = '0.5';
resetBtn.style.cursor = 'no-drop';

function startTimer() {
  if (isActive) return;

  isActive = true;
  startTime = Date.now() - deltaTime;
  id = setInterval(() => {
    const currentTime = Date.now();
    deltaTime = currentTime - startTime;
    updateClockface(deltaTime);
  }, 100);

}

function getFormattedTime(time) {
  const newDate = new Date(time);

  let minutes = newDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = newDate.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;


  const mseconds = String(newDate.getMilliseconds()).slice(0, 1);

  return `${minutes}:${seconds}.${mseconds}`;
}

function updateClockface(time) {
  const formattedTime = getFormattedTime(time);
  clockface.textContent = formattedTime;

}

function handleOnstartTimer() {
  resetBtn['disabled'] = false;
  resetBtn.style.opacity = '1';
  resetBtn.style.cursor = 'auto';
    if (!isActive) {
    startTimer();
    startBtn.textContent = 'Pause';

  } else {
    stopPauseTimer();
    startBtn.textContent = 'Continue';
  }

}

function stopPauseTimer() {
  clearInterval(id);
  isActive = false;
}

function handleOnReset() {
 deleteListOfLaps ();  
  stopPauseTimer();
  deltaTime = 0;
  updateClockface(deltaTime);
  startBtn.textContent = 'Start';
  resetBtn.setAttribute('disabled', '');
  resetBtn.style.opacity = '0.5';
  resetBtn.style.cursor = 'no-drop';
  

}

function handleOnLap(){
  const lap = document.createElement('li');
  lap.textContent = clockface.textContent;
  listOfLaps.append(lap);
}

function deleteListOfLaps (){
  const laps = document.querySelectorAll('li');
  laps.forEach(lap => {
    lap.remove();
  })
}

startBtn.addEventListener('click', handleOnstartTimer);
resetBtn.addEventListener('click', handleOnReset);
lapBtn.addEventListener('click', handleOnLap);