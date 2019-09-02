var questions = [
  'What\'s your name?',
  'Where are you from?',
  'What\'s your age?',
  'What are you working on?',
  'What\s your guilty pleasure?',
  'It was nice talking to you'
];

document.addEventListener('DOMContentLoaded', (event) => {

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
        output.innerText = `It means you are born in ${2019 - input}.`
        ++num;
        setTimeout(changeQuestion, 1200);
      } else if (num === 3) {
        output.innerText = `${input} sounds very cool. Good luck!`
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
})
