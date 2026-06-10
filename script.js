const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsed = 0;
let timerId = null;
let lapCount = 0;

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const tenths = Math.floor((ms % 1000) / 100);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

function tick() {
  const now = Date.now();
  display.textContent = formatTime(elapsed + (now - startTime));
  timerId = requestAnimationFrame(tick);
}

startBtn.addEventListener('click', () => {
  if (timerId === null) {
    startTime = Date.now();
    timerId = requestAnimationFrame(tick);
    startBtn.textContent = 'Pause';
    lapBtn.disabled = false;
  } else {
    cancelAnimationFrame(timerId);
    timerId = null;
    elapsed += Date.now() - startTime;
    startBtn.textContent = 'Start';
  }
});

lapBtn.addEventListener('click', () => {
  const now = Date.now();
  const current = elapsed + (timerId !== null ? now - startTime : 0);
  lapCount += 1;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(current)}</span>`;
  lapsList.prepend(li);
});

resetBtn.addEventListener('click', () => {
  if (timerId !== null) {
    cancelAnimationFrame(timerId);
    timerId = null;
  }
  elapsed = 0;
  startTime = 0;
  lapCount = 0;
  display.textContent = '00:00.0';
  lapsList.innerHTML = '';
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
});
