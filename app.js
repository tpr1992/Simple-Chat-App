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
  'The weather is hot and muggy',
  'It\'s raining cats and dogs',
  'It\'s beautiful out today '
]
let jokes = [
  'Police arrested two kids yesterday, one was drinking battery acid, the other was eating fireworks. They charged one - and let the other one off.',
  'I\'m on a whisky diet. I\'ve lost three days already.'
]
let secret = [
  'meow meow meow meow meow meow meow meow meow meow meow meow',
  'meow meow meow meow meow meow meow meow meow meow meow meow'
]
let personal = [
  'A cat.',
  'A black and white one year old kitten. Also known as a tuxedo cat.',
]


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
}

btn.addEventListener('click', () => {
    recognition.start();
})

const readOutLoud = (message) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = 'I don\'t know what you are saying'

    if (message.includes('how are you') || message.includes('hello') || message.includes('hi')) {
      let finalText = greetings[Math.floor(Math.random() * greetings.length)];

    } else if (message.includes('weather')) {
      let finalText = weather[Math.floor(Math.random() * weather.length)]

    } else if (message.includes('joke')) {
      let finalText = jokes[Math.floor(Math.random() * jokes.length)]

    } else if (message.includes('secret')) {
      let finalText = secret[Math.floor(Math.random() * secret.length)]

    } else if (message.includes('ludvig') || message.includes('cat')) {
      let finalText = personal[Math.floor(Math.random() * personal.length)]

    }
  speech.volume = 1;
  speech.pitch = .05;
  speech.rate = 1;
  inputBox.value = speech.text
  // speech.text = message

  window.speechSynthesis.speak(speech);
}
