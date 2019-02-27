//One page scroll

window.onload = () => {
  const Slider = function(pages, pagination) {
    let slides = [],
        btns = [],
        count = 0,
        current = 0,
        touchstart = 0,
        animation_state = false;

    const init = () => {
      slides = pages.children;
      count = slides.length;
      for(let i = 0; i < count; i++) {
        slides[i].style.bottom = -(i * 100) + '%';
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
          slides[i].style.bottom = (current - i) * 100 + '%';
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
}

//First page animation

const colors = ["#d9d9db", "#d1c559", "#fffad6", "#fcd283", "#fffef4"];
const numBalls = 500;
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