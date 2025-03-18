function getCss(gridSize, is3d) {
  var doodl = `:doodle {
  @grid:${gridSize}/ 100%;
  width:100vw;
  height:200vh;
  }
  :container {
    transform-style:${is3d ? "preserve-3d" : "flat"};
  }
  :after {
    content:@p(🦋);
    font-size: 24px;
  } 
  @random(.15) {
    filter:hue-rotate(@r(-180deg, 180deg));
  }
  
  animation: fly @r(10s, 15s) infinite linear;
  will-change:transform;
  position:absolute;
  left:@r(100%);
  bottom:@r(0px, 180vh);
 
  @keyframes fly {
    0% {
      transform:
      translateX(@r(-20px, 20px))
      translateY(@r(-20px, 20px))
      scale(1.5);
    }
    33% {
      transform:
      translateX(calc(@p(-1,1)*@r(20)*@p(1vmax)))
      translateY(calc(-1*@r(80)*1vmax))
      rotateY(@r(15turn, 25turn))
      rotateZ(@r(-.05turn, .05turn))
      scale(1.5);
    }
    66% {
      transform:
      translateX(calc(@p(-1,1)*@r(20)*@p(1vmax)))
      translateY(calc(-1*@r(120,160)*1vmax))
      rotateY(@r(35turn, 45turn))
      rotateZ(@r(-.05turn, .05turn))
      scale(1.5);
    }
    100% {
      transform:
      translateX(calc(@p(-1,1,1)*@r(40)*1vmax))
      translateY(calc(-180*1vmax))
      rotateY(@r(55turn, 70turn))
      rotateZ(@r(-.05turn, .05turn))
      scale(1.5);
    }
  }
`;
  return doodl;
}

/*INIT*/
var body = document.querySelector("body");
var dood = document.getElementById("dood");
var forest = document.querySelector("div#forest");
body.onload = init;
window.addEventListener("resize", init, false);

/*HELPERS*/
function init() {
  const isMobile = window.innerWidth <= 480;
  const gridSize = isMobile ? 5 : 15;
  dood.update(getCss(gridSize, false));

  let wid = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  let density = Math.floor(wid / (isMobile ? 40 : 10));
  forest.innerHTML = "";
  let min = -20; /*x-axis coords*/
  let max = 120;
  for (let i = 0; i < density; i++) {
    let pos = Math.random() * (max - min + 1) + min;
    let hei = getRandomIntInclusive(5, isMobile ? 150 : 250);
    forest.appendChild(generateTree(hei, pos));
  }
}
function generateTree(height, position) {
  let template = `
      <div class="tree__5"></div>
      <div class="tree__1"></div>
      <div class="tree__2"></div>
      <div class="tree__3"></div>
      <div class="tree__4" style="height:${height}px"></div>
    `;
  let el = document.createElement("div");
  el.setAttribute("class", "tree");
  el.style.left = `${position}%`;
  el.innerHTML = template;
  el.style.zIndex = Math.random() > 0.5 ? -10 : 10;
  return el;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
