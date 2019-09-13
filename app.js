var questions = [
  'What\'s your name?',
  'Where are you from?',
  'What\'s your age?',
  'What are you working on?',
  'What\s your guilty pleasure?',
  'It was nice talking to you!'
];

// document.addEventListener('DOMContentLoaded', (event) => {

  let num = 0;
  let output = document.querySelector('#result')
  output.innerText = questions[0];
  let inputBox = document.querySelector('input')
  let startOver = document.querySelector('#start-over').style.display = 'none'


  const changeQuestion = () => {
    output.innerText = questions[num];
    let startOver = document.querySelector('#start-over')
    if (num === 5) {
      inputBox.style.display = 'none';
      startOver.style.display = 'flex';
      startOver.addEventListener('click', (event) => {
        console.log(num);
        num = 0;
        showResponse();
        changeQuestion();
        inputBox.style.display = 'flex';
        startOver.style.display = 'none';
      })
    }
  }

  const showResponse = () => {
    let input = inputBox.value
    inputBox.value = ""
    console.log(num);
    if (input !== '') {
      if (num === 0) {
        output.innerText = `Hello ${input}, nice meeting you!`
        ++num;
        setTimeout(changeQuestion, 1200);
      } else if (num === 1) {
        output.innerText = `${input} is a beautiful city!`
        ++num;
        setTimeout(changeQuestion, 1200);
      } else if (num === 2) {
        output.innerText = `That means you were born in ${2019 - input}.`
        ++num;
        setTimeout(changeQuestion, 1200);
      } else if (num === 3) {
        output.innerText = `${input} sounds very cool!`
        ++num;
        setTimeout(changeQuestion, 1200);
      } else if (num === 4) {
        output.innerText = `I\'ve been known to enjoy a little ${input} on occasion too. Moderation is key.`
        ++num;
        setTimeout(changeQuestion, 2200);
      }
    }
  }
  inputBox.addEventListener('keypress', (event) => {
    if (event.charCode === 13) {
      console.log('Thanks', event.target.value);
      showResponse();
    }
  })
// });

// #############################################
// Speech Recognition


const btn = document.querySelector('#speech')
const content = document.querySelector('#voice-output')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();
let greetings = [
  'What\'s up dog?',
  'What\'s up?',
  'Good day sir.',
  'Please go away!'
]
let weather = [
  'What is your city?'
]
let jokes = [
  'Police arrested two kids yesterday, one was drinking battery acid, the other was eating fireworks. They charged one - and let the other one off.',
  'I\'m on a whisky diet. I\'ve lost three days already.'
]
let secret = [

]
let personal = [

  'A cat.',
  'A 4 legged animal',
  'A black and white one year old kitten. Also known as a tuxedo cat.',
]
let checkWeatherBinary = 0
let weatherArr = []
let city = ''
let temp = ''


recognition.onstart = function() {
  console.log('voice is activated, you can to microphone');
}

recognition.onresult = function(event) {
  console.log(event)
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript
  output.textContent = transcript
  readOutLoud(transcript)
  console.log(transcript);
}

btn.addEventListener('click', () => {
    recognition.start();
})

const readOutLoud = (message) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = 'I don\'t know what you are saying to me'

    if (message.includes('how are you') || message.includes('hello') || message.includes('hi')) {
      let finalText = greetings[Math.floor(Math.random() * greetings.length)];
      speech.text = finalText
    }
    else if (message.includes('joke')) {
      let finalText = jokes[Math.floor(Math.random() * jokes.length)]
      speech.text = finalText
    } else if (message.includes('ludvig') || message.includes('cat')) {
      let finalText = personal[Math.floor(Math.random() * personal.length)]
      speech.text = finalText
    }

    else if (message.includes('weather')) {
      let finalText = weather[Math.floor(Math.random() * weather.length)]
      speech.text = finalText
      checkWeatherBinary = 1
      console.log(checkWeatherBinary);
    }

    else if (message.includes('Brooklyn') && checkWeatherBinary !== 0) {
      checkWeather('Brooklyn')
      speech.text = weatherArr[0]
    };

  speech.volume = 1;
  speech.pitch = .05;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

function checkWeather(cityName) {
  let key = 'KEY';
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + `${cityName},us`+ '&appid=' + key)
  .then(res => res.json())
  .then(res => {
    let k = Math.round((res.main.temp) * 100 / 100)
    let f = 9/5 * (k - 273) + 32
    let description = res.weather[0].description
    temp = f.toString()
    weatherArr.push(`The weather is currently ${temp} degrees with ${description} and a humidity of ${res.main.humidity} percent`)
    // debugger
    console.log(weatherArr);
  })
}

let weatherBtn = document.querySelector('#check-weather')
weatherBtn.addEventListener('click', () => {
  console.log('checking weather...');
  checkWeather('Brooklyn');
})
