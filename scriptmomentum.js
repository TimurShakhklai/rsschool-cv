// DOM Elements
const time = document.querySelector('.time'),
  day = document.querySelector('.day'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  document.body.style.color = 'white';

  let loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  loader.classList.add('hide');
  setTimeout(() => {
    loader.remove();
  },600)
})

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    if(min == 0 && sec == 0) setTimeout(setBgImage, 1000);
    
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function showDay() {
    let today = new Date(),
      date = today.getDate();
      dayr = today.getDay();
      month = today.getMonth();
  
    var dayr=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    var month=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  
    // Output Time
    day.innerHTML = `${addZero(dayr[today.getDay()])}<span>, </span>${addZero(date)}<span> </span>${addZero(month[today.getMonth()])}`;
  
    setTimeout(showDay, 1000);
  }

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
// функции создания массива фонов
function getRandomImg() {
  let imgNum = Math.floor(Math.random() * 14) + 1;
  return (imgNum =
    imgNum >= 20 ? (imgNum = `${imgNum}.jpg`) : (imgNum = `${imgNum}.jpg`));
}

let imgData = [];
async function createImgData() {
  const base = "back";
  //let imageSrc = '';
  for (let i = 0; i < 24; i++) {
    if (i < 6) imgData[i] = base + "/night/" + getRandomImg();
    else if (i < 12) imgData[i] = base + "/morning/" + getRandomImg();
    else if (i < 18) imgData[i] = base + "/day/" + getRandomImg();
    else imgData[i] = base + "/evening/" + getRandomImg();
  }
}
createImgData();

function setBgImage() {
  let today = new Date(),
    hour = today.getHours();
  let src = imgData[hour];
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };
}

const btnNext = document.querySelector(".btnNext");
const btnPrev = document.querySelector(".btnPrev");
let index = new Date();
let numOfImg = index.getHours();

btnNext.onclick = function () {
  if (numOfImg < imgData.length - 1) {
    numOfImg++;
    let src = imgData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  } else {
    numOfImg = 0;
    numOfImg++;
    let src = imgData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  }
};
btnPrev.onclick = function () {
  if (numOfImg > 0) {
    numOfImg--;
    let src = imgData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
    };
  } else {
    numOfImg = 13;
    numOfImg--;
    let src = imgData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  }
};
}


function setGreet() {
  let today = new Date();
  hour = today.getHours();
  if (hour < 6) {
    greeting.textContent = "Good Night, ";
  } else if (hour < 12) {
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon, ";
  } else {
    greeting.textContent = "Good Evening, ";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('name', e.target.innerText);
          name.blur();
        }
      } else {
        if (name.textContent === '') {
            name.textContent = localStorage.getItem('name');
          }
      }
    }

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
      if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('focus', e.target.innerText);
          focus.blur();
        }
      } else {
        if (focus.textContent === '') {
            focus.textContent = localStorage.getItem('focus');
          }
      }
    }

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn1 = document.querySelector('.btn1');

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn1.addEventListener('click', getQuote);

function enterName() {
    localStorage.setItem('name', name.innerText);
    name.textContent = '';
  }
  
  function enterFocus() {
      localStorage.setItem('focus', focus.innerText);
    focus.textContent = '';
  }

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', enterName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', enterFocus);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.cod == 404) {
    weatherIcon.className = '';
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = 'Error';
  humidity.textContent = '';
  alert("Wrong city name");
  } else{
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.wind.speed}m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  setTimeout(getWeather, 1000);
  }
}
function getCity() {
    if (localStorage.getItem('city') === null) {
      city.textContent = '[Enter City]';
    } else {
      city.textContent = localStorage.getItem('city');
    }
  }
function setCity(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('city', e.target.innerText);
          getWeather();
          city.blur();
        }
      } else {
        if (city.textContent === '') {
            city.textContent = localStorage.getItem('city');
          } 
      }
}
function enterCity() {
    localStorage.setItem('city', city.innerText);
  city.textContent = '';
}

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', enterCity);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// Run
setBgImage();
showDay();
showTime();
setGreet();
getName();
getFocus();
getCity();