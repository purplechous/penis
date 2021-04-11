var canvas = document.getElementById('coords');
var ctx = canvas.getContext('2d');

canvas.width  = window.screen.width * 0.38;
canvas.height = window.screen.width * 0.38;

let dots = [];
let buttons = [];

let dot = {
  x: canvas.width  / 2,
  y: 0,
  width: 16
}

let doScroll = false;
let wantedScrollTop = 0;
let debugMode = false;
let scale = 1;
let clicked = false;
let mouseX = dot.x;
let mouseY = dot.y;
let inObj = false;
let moving = false;
let vx = canvas.width  / 2, vy = canvas.height / 2;
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function update() {


  //console.log(doScroll, wantedScrollTop, document.getElementById('description').scrollTop);

  if (doScroll) {
  if (wantedScrollTop > document.getElementById('description').scrollTop) {

     document.getElementById('description').scrollTop = document.getElementById('description').scrollTop + 3;

  }
  if (wantedScrollTop <= document.getElementById('description').scrollTop + 283) {
    doScroll = false;
  }
}



  if (debugMode == true) {
  console.log('inobj - ' + inObj + ', clicked - ' + clicked + ' ' + vx + ' ' + dot.x);
  if (dots.length > 1) {
    console.log('vx = ' + String(Math.round(vx / (canvas.width / 12))) + ' vy = ' + String(Math.round(vy / (canvas.width / 12))) + ' dots.x = ' + Math.round(dots[1].x / (canvas.width / 12)) + ' dots.y = ' + Math.round(dots[1].y / (canvas.width / 12)) + ' dots.length = ' + dots.length);
  }
  }

  if (vx > dot.x) dot.x = dot.x + 3;
  if (vx < dot.x) dot.x = dot.x - 3;
  if (vy > dot.y) dot.y = dot.y + 3;
  if (vy < dot.y) dot.y = dot.y - 3;

  if (inObj && clicked) {
    moving = true;
    vx = Math.round((mouseX - canvas.getBoundingClientRect().left) / (canvas.width  / 12)) * (canvas.width  / 12);
    vy = Math.round((mouseY - canvas.getBoundingClientRect().top)  / (canvas.height / 12)) * (canvas.height / 12);

  }

  ctx.fillStyle = '#FAF2D1'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.shadowBlur  = 0;

  for(let i = 0; i < 13; i++) {

    ctx.beginPath();

    ctx.strokeStyle = '#15192F';
    ctx.lineWidth = 1;


    ctx.moveTo(i * canvas.width  / 12,  0);
    ctx.lineTo(i * canvas.width / 12,  canvas.height);
    ctx.stroke();
    ctx.closePath();

  }


  for(let i = 0; i < 13; i++) {

    ctx.beginPath();
    if (i == 6) {

      ctx.strokeStyle = '#B11E31'
      ctx.lineWidth   = 4
      ctx.shadowColor = 'red';
      ctx.shadowBlur  = 15;

    }
    else {

      ctx.strokeStyle = '#15192F';
      ctx.lineWidth = 1;

    }

    ctx.moveTo(0,            i * canvas.height / 12);
    ctx.lineTo(canvas.width, i * canvas.height / 12);
    ctx.stroke();
    ctx.closePath();

  }
      ctx.beginPath();
      ctx.strokeStyle = '#B11E31'
      ctx.lineWidth   = 4
      ctx.shadowColor = 'red';
      ctx.shadowBlur  = 15;
      ctx.moveTo(6 * canvas.width / 12, 0            );
      ctx.lineTo(6 * canvas.width / 12, canvas.height);
      ctx.stroke();
      ctx.closePath();

  for (let i = 0; i < dots.length; i++) {
    ctx.beginPath();
    ctx.arc(dots[i].x, dots[i].y, dot.width / 4, 0, 2 * Math.PI)
    ctx.shadowBlur  = 0;
    ctx.fillStyle = '#3A5173';
    ctx.fill()
    ctx.closePath();
  }
 // предпросмотр прямой
  if (dots.length % 2 != 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#3A5173'
      ctx.lineWidth   = 5
      ctx.shadowColor = '#3A5173';
      ctx.shadowBlur  = 15;
      ctx.moveTo(dots[dots.length - 1].x, dots[dots.length - 1].y);
      ctx.lineTo(dot.x, dot.y);
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();    
  }
 // прямые
  for (var i = 1; i < dots.length; i += 2) {
      ctx.beginPath();
      ctx.strokeStyle = '#3A5173'
      ctx.lineWidth   = 5
      ctx.shadowColor = '#3A5173';
      ctx.shadowBlur  = 15;
      ctx.moveTo(dots[i].x, dots[i].y);
      ctx.lineTo(dots[i - 1].x, dots[i - 1].y);
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();      
  }
// зеленый круг
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.width / 2 * 1.5, 0, 2 * Math.PI)
  ctx.fillStyle = '#096344';
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 10;
  ctx.fill()
  ctx.closePath();
// белый круг
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.width / 2, 0, 2 * Math.PI)
  ctx.fillStyle = 'white';
  ctx.fill()
  ctx.closePath();


  for (let i = 0; i < Math.floor(dots.length / 2); i++) {
    if (document.getElementById('img' + (i + 1)).getAttribute('data-phase') == 'false') {
      ctx.beginPath();
      ctx.rect(dots[i * 2].x - 40, dots[i * 2].y - 40, 80, 20);
      ctx.shadowBlur = 5;
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.fillStyle = '#15192F';
      ctx.shadowBlur = 0;
      ctx.font = 'bold italic 15px Consolas'
      ctx.textAlign = 'center';
      ctx.fillText(letter(i * 2 + 1) + '(' + Math.round((dots[i * 2].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[i * 2].y / (canvas.height / 12) - 6)) + ')', dots[i * 2].x, dots[i * 2].y - 25)
      ctx.closePath();
      ctx.beginPath();
      ctx.rect(dots[i * 2 + 1].x - 40, dots[i * 2 + 1].y - 40, 80, 20);
      ctx.shadowBlur = 5;
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.fillStyle = '#15192F';
      ctx.shadowBlur = 0;
      ctx.font = 'bold italic 15px Consolas'
      ctx.textAlign = 'center';
      ctx.fillText(letter(i * 2 + 2) + '(' + Math.round((dots[i * 2 + 1].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[i * 2 + 1].y / (canvas.height / 12) - 6)) + ')', dots[i * 2 + 1].x, dots[i * 2 + 1].y - 25)
      ctx.closePath();

    }
  }



// текст
  ctx.beginPath();
  ctx.fillStyle = '#15192F';
  ctx.shadowBlur = 0;
  ctx.font = 'bold italic 15px Consolas'
  ctx.textAlign = 'center';
  ctx.fillText('(' + Math.round((vx / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((vy / (canvas.height / 12) - 6)) + ')', dot.x, dot.y - canvas.height / 20)
  ctx.closePath();





}

setInterval(update, 1)

document.addEventListener('mousemove', isOnObject);
document.addEventListener('keyup' , isEnter);

function isEnter(e) {
  if (e.keyCode == 13 ) {
    if (dots.length % 2 == 0) {
    dots.push({
      x: Math.round(dot.x / (canvas.width / 12)) * (canvas.width / 12), 
      y: Math.round(dot.y / (canvas.width / 12)) * (canvas.width / 12)
    });
  }
  else if (Math.round(dots[dots.length - 1].x / (canvas.width / 12)) != Math.round(dot.x / (canvas.width / 12)) || Math.round(dots[dots.length - 1].y / (canvas.width / 12)) != Math.round(dot.y / (canvas.width / 12))) {




    if (!theSameLine()) {
    dots.push({
      x: Math.round(dot.x / (canvas.width / 12)) * (canvas.width / 12), 
      y: Math.round(dot.y / (canvas.width / 12)) * (canvas.width / 12)
    }); 



    if (dots.length == 2) {

      document.getElementById('description').innerHTML = '';

    }




    if (dots.length < 27) {
    document.getElementById('description').innerHTML = document.getElementById('description').innerHTML + '<h1>Пряма ' + (dots.length / 2) + ' (' + letter(dots.length - 1) + letter(dots.length) +') <img id = "img' + dots.length / 2 + '" onclick="changePhase(' + dots.length / 2 + ')" data-phase = "true" src="img/eye2.png" width="24px"></h1> <h2> Точки: </h2> <h3> ∙ ' + letter(dots.length - 1) + ' (' + Math.round((dots[dots.length - 2].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[dots.length - 2].y / (canvas.height / 12) - 6)) + ') </h3><h3> ∙ ' + letter(dots.length) + ' (' + Math.round((dots[dots.length - 1].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[dots.length - 1].y / (canvas.height / 12) - 6)) + ') </h3>'
  }
    else {

    if (dots.length % 26 != 0) {
    document.getElementById('description').innerHTML = document.getElementById('description').innerHTML + '<h1>Пряма ' + (dots.length / 2) + ' (' + letter((dots.length % 26) - 1) + '<sub>' + Math.floor(dots.length / 26) + '</sub>' + letter(dots.length % 26) + '<sub>' + Math.floor(dots.length / 26) + '</sub>' + ') <img id = "img' + dots.length / 2 + '" onclick="changePhase(' + dots.length / 2 + ')" data-phase = "true" src="img/eye2.png" width="24px"></h1> <h2> Точки: </h2> <h3> ∙ ' + letter((dots.length % 26) - 1) + '<sub>' + Math.floor(dots.length / 26) + '</sub>' + ' (' + Math.round((dots[dots.length - 2].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[dots.length - 2].y / (canvas.height / 12) - 6)) + ') </h3><h3> ∙ ' + letter(dots.length % 26) + '<sub>' + Math.floor(dots.length / 26) + '</sub>' + ' (' + Math.round((dots[dots.length - 1].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[dots.length - 1].y / (canvas.height / 12) - 6)) + ') </h3>'
    } else {

    document.getElementById('description').innerHTML = document.getElementById('description').innerHTML + '<h1>Пряма ' + (dots.length / 2) + ' (' + letter(25) + '<sub>' + Math.floor(dots.length / 26 - 1) + '</sub>' + letter(26) + '<sub>' + Math.floor(dots.length / 26 - 1) + '</sub>' + ') <img id = "img' + dots.length / 2 + '" onclick="changePhase(' + dots.length / 2 + ')" data-phase = "true" src="img/eye2.png" width="24px"></h1> <h2> Точки: </h2> <h3> ∙ ' + letter(25) + '<sub>' + Math.floor(dots.length / 26 - 1) + '</sub>' + ' (' + Math.round((dots[dots.length - 2].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[dots.length - 2].y / (canvas.height / 12) - 6)) + ') </h3><h3> ∙ ' + letter(26) + '<sub>' + Math.floor(dots.length / 26 - 1) + '</sub>' + ' (' + Math.round((dots[dots.length - 1].x / (canvas.width / 12) - 6)) + '; ' + -1 * Math.round((dots[dots.length - 1].y / (canvas.height / 12) - 6)) + ') </h3>'

    }

    };

    wantedScrollTop =  document.getElementById('description').scrollHeight;
    doScroll = true;


    }
  }
  }
}



function notRepeated() {
  if (dots.length == 0) {return true}
  else {
  for (let i = 0; i < dots.length; i++) {
    if (Math.round(dot.x / (canvas.width / 12))  == Math.round(dots[i].x / (canvas.width / 12)) && Math.round(dot.y / (canvas.width / 12)) == Math.round(dots[i].y / (canvas.width / 12))) {
      return false;
    }
    else if (i == dots.length - 1) return true;
  }
}
}

function isOnObject(evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
  if ((mouseX - canvas.getBoundingClientRect().left) < vx + (canvas.width / 12) && (mouseX - canvas.getBoundingClientRect().left) > vx - (canvas.width / 12) && (mouseY - canvas.getBoundingClientRect().top) < vy + (canvas.width / 12) && (mouseY - canvas.getBoundingClientRect().top) > vy - (canvas.width / 12)) {
  inObj = true;
  }
  else if (!clicked) inObj = false;
}

function setToTable() {
    vx = Math.round(dot.x / (canvas.width / 12)) * (canvas.width / 12) - dot.width / 2;
    vy = Math.round(dot.y / (canvas.width / 12)) * (canvas.width / 12) - dot.width / 2;
}

if (!inObj && !clicked && moving) setToTable();

function scrollToCanvas() {
  document.getElementById('coords').scrollIntoView({behavior: 'smooth', block: 'center'});
}

function debug() {
  debugMode = !debugMode;
} 

function theSameLine() {

  if (dots.length < 2) {return false}
  else {

  for (let i = 0; i < dots.length - 1; i = i + 2) {
    if (Math.round(dots[dots.length - 1].x / (canvas.width / 12)) == Math.round(dots[i].x / (canvas.width / 12)) && Math.round(dots[dots.length - 1].y / (canvas.width / 12)) == Math.round(dots[i].y / (canvas.width / 12))) {


    if (Math.round(dot.x / (canvas.width / 12)) == Math.round(dots[i + 1].x / (canvas.width / 12)) && Math.round(dot.y / (canvas.width / 12)) == Math.round(dots[i + 1].y / (canvas.width / 12))) {

      alert('Не можна будувати однакові прямі!');
      clicked = false;
      dots.pop();
      return true;

    }
    else for (let i = 0; i < dots.length - 1; i = i + 2) {
    if (Math.round(dot.x / (canvas.width / 12)) == Math.round(dots[i].x / (canvas.width / 12)) && Math.round(dot.y / (canvas.width / 12)) == Math.round(dots[i].y / (canvas.width / 12))) {


    if (Math.round(dots[dots.length - 1].x / (canvas.width / 12)) == Math.round(dots[i + 1].x / (canvas.width / 12)) && Math.round(dots[dots.length - 1].y / (canvas.width / 12)) == Math.round(dots[i + 1].y / (canvas.width / 12))) {

      alert('Не можна будувати однакові прямі!');
      clicked = false;
      dots.pop();
      return true;

    }
    else if (i >= dots.length - 1) return false;
    }
    else if (i >= dots.length - 1) return false;
  }
    }
    else for (let i = 0; i < dots.length - 1; i = i + 2) {
    if (Math.round(dot.x / (canvas.width / 12)) == Math.round(dots[i].x / (canvas.width / 12)) && Math.round(dot.y / (canvas.width / 12)) == Math.round(dots[i].y / (canvas.width / 12))) {


    if (Math.round(dots[dots.length - 1].x / (canvas.width / 12)) == Math.round(dots[i + 1].x / (canvas.width / 12)) && Math.round(dots[dots.length - 1].y / (canvas.width / 12)) == Math.round(dots[i + 1].y / (canvas.width / 12))) {

      alert('Не можна будувати однакові прямі!');
      clicked = false;
      dots.pop();
      return true;

    }
    else if (i >= dots.length - 1) return false;
    }
    else if (i >= dots.length - 1) return false;
  }
  }
}
}


function letter(index) {
  return alphabet.charAt(index - 1);
}

function changePhase(id) {
  if (document.getElementById('img' + id).getAttribute('data-phase') == 'false') {
  document.getElementById('img' + id).setAttribute('data-phase',  'true');
  document.getElementById('img' + id).setAttribute('src',  'img/eye2.png');
} else {
  document.getElementById('img' + id).setAttribute('data-phase',  'false');
  document.getElementById('img' + id).setAttribute('src',  'img/eye1.png');
}
}




















// Губенко Дмитро, 10-А, 2020-2021 н.р., проєкт "Math'n'path"