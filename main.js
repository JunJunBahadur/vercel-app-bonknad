const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const speedMeter = document.querySelector('.level span');
const HighScoreEl = document.querySelector('.highscore span');
const playButton = document.querySelector('.play');
const board = document.querySelector('.board');
const bg = document.querySelector('.bg');
const itemSet = (localStorage.getItem('hscore') !== null);
if(!itemSet) {
    localStorage.setItem("hscore", 0);
}
setScore();

playButton.style.visibility = 'visible';
board.style.visibility = 'hidden';
bg.style.visibility = 'visible';
bg.style.backgroundImage="url(sprites/level5.png)";

let score = 0;
let speed = 2000;
let pause = false;

let nads = 'sprites/benads.jpg';
speedMeter.textContent = '0';

const sound = new Audio("sprites/smash.mp3");

function setScore() {
    HighScoreEl.textContent=localStorage.getItem('hscore');
}



function start(){
    playButton.style.visibility = 'hidden';
    board.style.visibility = 'visible';
    bg.style.visibility = 'hidden';
    scoreEl.textContent = score;
    run();
}

function run(){
    
    const i = Math.floor(Math.random()*holes.length);
    const hole = holes[i];
    let timer = null;
    
    const img = document.createElement('img');
    img.classList.add('mole');
    img.setAttribute("draggable", false);
    img.src = 'sprites/benads.jpg';
    hole.appendChild(img);
    


    if(score == 60){
        speed = 1000;
        speedMeter.textContent = 'MAX';
        bg.style.backgroundImage="url(sprites/level5.png)";
        hole.removeChild(img);
        gamepause();
    } else if(score == 40){
        speed = 1200;

        speedMeter.textContent = '4';
        bg.style.backgroundImage="url(sprites/level4.png)";
        hole.removeChild(img);
        gamepause();
    } else if(score == 25){
        speed = 1350;

        speedMeter.textContent = '3';
        bg.style.backgroundImage="url(sprites/level3.png)";
        hole.removeChild(img);
        gamepause();
    }else if(score == 15){
        speed = 1500;

        speedMeter.textContent = '2';
        bg.style.backgroundImage="url(sprites/level2.png)";
        hole.removeChild(img);
        gamepause();
    }else if(score == 5){
        speed = 1800;
        speedMeter.textContent = '1';  
        bg.style.backgroundImage="url(sprites/level1.png)";
        hole.removeChild(img);
        gamepause();
    }
    img.style.animationDuration = speed/1000+'s';
    

    img.addEventListener('click', ()=> {
        score++;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'sprites/benadshit.jpg';
        clearTimeout(timer);
        if(!pause){
            setTimeout(() => {
                hole.removeChild(img);
                run();
            }, 100);
        }
    })

    
    if(!pause){
        timer = setTimeout(() => {
            hole.removeChild(img);
            gameover();
        },speed);
    }
    
}

function gamepause(){
    board.style.visibility = 'hidden';
    bg.style.visibility = 'visible';
    pause = false;
    score++;
    setTimeout(()=>{
        board.style.background = '';
        start();
    },4000)
}

function gameover(){
    playButton.style.visibility = 'visible';
    board.style.visibility = 'hidden';
    bg.style.visibility = 'visible';
    bg.style.backgroundImage="url(sprites/over.png)";

    speedMeter.textContent = '0';
    curHS = HighScoreEl.textContent;
    if(curHS<score){
        HighScoreEl.textContent = score;
        localStorage.setItem("hscore", score);
    }
    score = 0;
    
    speed = 2000;
}

window.addEventListener('mousemove', e=> {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown',()=>{
    cursor.classList.add('active');
});
window.addEventListener('mouseup',()=>{
    cursor.classList.remove('active');
});