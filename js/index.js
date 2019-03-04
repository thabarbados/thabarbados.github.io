//One page scroll

window.onload = () => {
  const Slider = function(pages, pagination) {
    let slideSkills = [],
        btns = [],
        count = 0,
        current = 0,
        touchstart = 0,
        animation_state = false;

    const init = () => {
      slideSkills = pages.children;
      count = slideSkills.length;
      for(let i = 0; i < count; i++) {
        slideSkills[i].style.bottom = -(i * 100) + '%';
        let btn = document.createElement('li');
        btn.dataset.slide = i;
        btn.addEventListener('click', btnClick)
        btns.push(btn);
        pagination.appendChild(btn);
      }
      btns[0].classList.add('active');
    }

    const gotoNum = (index) => {
      if((index != current) && !animation_state) {
        animation_state = true;
        setTimeout(() => animation_state = false, 500);
        btns[current].classList.remove('active');
        current = index;
        btns[current].classList.add('active');
        for(let i = 0; i < count; i++) {
          slideSkills[i].style.bottom = (current - i) * 100 + '%';
        }
      }
    }

    const gotoNext = () => current < count - 1 ? gotoNum(current + 1) : false;
    const gotoPrev = () => current > 0 ? gotoNum(current - 1) : false;
    const btnClick = (e) => gotoNum(parseInt(e.target.dataset.slide));
    pages.ontouchstart = (e) => touchstart = e.touches[0].screenY;
    pages.ontouchend = (e) => touchstart < e.changedTouches[0].screenY ? gotoPrev() : gotoNext();
    pages.onmousewheel = pages.onwheel = (e) => e.deltaY < 0 ? gotoPrev() : gotoNext();

    init();
  }

  let pages = document.querySelector('.pages');
  let pagination = document.querySelector('.pagination');
  let slider = new Slider(pages, pagination)

  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let j;
    let slideSkills = document.getElementsByClassName("mySlides");
    for (j = 0; j < slideSkills.length; j++) {
      slideSkills[j].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slideSkills.length) {slideIndex = 1} 
    slideSkills[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }


let button = document.getElementById('button');
let modal = document.getElementById('modal');
let wrapper = document.getElementById('wrapper');

button.onclick = function () {
	modal.style.display = 'block';
  wrapper.style.display = 'block';
}

wrapper.onclick = function () {
	modal.style.display = 'none';
  wrapper.style.display = 'none';
}
}

//First page animation

const colors = ["#d9d9db", "#d1c559", "#fffad6", "#fcd283", "#fffef4"];
const numBalls = 250;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.querySelector(".first").appendChild(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -20 : 20),
    y: Math.random() * 40
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});


document.querySelector(".dload").click();

