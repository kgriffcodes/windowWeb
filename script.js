var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


var body = document.getElementsByTagName('body')[0];
var lockButton = document.getElementById('lockButton');
var unlockButton = document.getElementById('unlockButton');

var darkModeEnabled = true;

function toggleMode(){
	console.log('--Dark mode enabled before', darkModeEnabled)
	if (darkModeEnabled == true) {
    console.log('Dark mode is enabled');
    lockButton.style.visibility = 'hidden';
    unlockButton.style.visibility = 'visible';
    body.style.background = 'black';
    body.style.color = 'green';
    body.style.fontFamily = "'VT323', monospace";
    darkModeEnabled = false;
    convertHeader();
	} else {
		console.log('Dark mode is disabled');
    lockButton.style.visibility = 'visible';
    unlockButton.style.visibility = 'hidden';
    body.style.background = '#9FA4C4';
    body.style.color = 'white';
    body.style.fontFamily = "Tahoma, Geneva, Verdana, sans-serif";
		darkModeEnabled = true;
	}
	console.log('--Dark mode enabled after', darkModeEnabled)
}

function convertHeader(){
  class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  const phrases = [
    'Window Synder',
    'Cyber Security Guru',
    'Mother',
    'Badass',
  ]
  
  const el = document.querySelector('.name')
  const fx = new TextScramble(el)
  let numberOfPasses = 5
  let counter = 0
  const next = () => {
  if (numberOfPasses > 0) 
  {fx.setText(phrases[counter]).then(() => {
  setTimeout(next, 800)
})
counter = (counter + 1) % phrases.length
numberOfPasses--}
  }
  
  next();
}

lockButton.addEventListener('click', toggleMode);
// lockButton.addEventListener('click', convertHeader);
unlockButton.addEventListener('click', toggleMode);