let body = document.querySelector('body');
let buttonAll = document.querySelectorAll('button');
let pageNumber = 0;
let windowHeight, windowWidth;
let bgColorArray = ['#2192FF', '#ea204f', '#38E54D'];

for (let i = 0; i < buttonAll.length; i++) {
  (function (index) {
    buttonAll[index].onclick = function () {
      pageNumber = index;
      motionSetting();
    }
  })(i);
}

gsap.from('h1', 1, {
  top: -80,
  ease: Power3.easeOut,
})

buttonAll.forEach(function (item, i) {
  gsap.from(item, .4, {
    top: 100,
    ease: Power3.easeInOut,
    delay: i * 0.1 + 1,
  })
})

gsap.set('section', { perspective: 400 });

// create textItem 100
let item;
let section = document.querySelector('section');

// <div class="textItem"></div> 
let totalNumber = 148;
for (let i = 0; i < totalNumber; i++) {
  item = document.createElement('div');
  item.setAttribute('class', 'textItem');
  item.style.top = window.innerHeight / 2 + 'px';
  item.style.left = window.innerWidth / 2 + 'px';
  item.innerHTML = i;
  section.appendChild(item);
}

let textItem = document.querySelectorAll('.textItem');

function motionSetting() {
  // body background color
  body.style.backgroundColor = bgColorArray[pageNumber];

  for (let i = 0; i < buttonAll.length; i++) {
    if (pageNumber == i) {
      buttonAll[pageNumber].classList.add('active');
    } else {
      buttonAll[i].classList.remove('active');
    }
  }

  // Duplicated Twin Kills
  gsap.killTweensOf(textItem);

  if (pageNumber == 0) {
    textItem.forEach(function (item, i) {
      gsap.to(item, 1, {
        top: Math.random() * (windowHeight - 150) + 60,
        left: Math.random() * (windowWidth - 80) + 20,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        autoAlpha: "random(.1,1)", // opacity
        scale: .5,
        ease: Power4.easInOut,
        delay: "random(0,.5)"
      })
    })
  } else if (pageNumber == 1) {
    textItem.forEach(function (item, i) {
      let scaleNumber = Math.random() * 3;
      gsap.to(item, 1, {
        top: Math.random() * (windowHeight - 250) + 100,
        left: Math.random() * (windowWidth - 200) + 80,
        rotationX: "random(-60,60)",
        rotationY: "random(-60,60)",
        rotationZ: "random(-90,90)",
        autoAlpha: scaleNumber / 3,
        scale: scaleNumber,
        ease: Power4.easeInOut,
        delay: "random(0,.5)"
      })
    })
  } else if (pageNumber == 2) {
    textItem.forEach(function (item, i) {
      gsap.to(item, 1, {
        top: windowHeight / 2 + Math.sin(i / 3) * 40,
        left: i * 20, //windowWidth / 2 ,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        autoAlpha: 1,
        scale: .5,
        ease: Power4.easeInOut,
        delay: i * .05 //"random(0,.5)"
      })
    })
  }
}

const WINDOW_RESIZE = () => {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  motionSetting();
}

window.addEventListener('resize', function () {
  WINDOW_RESIZE()
})

WINDOW_RESIZE();