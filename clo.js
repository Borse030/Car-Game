const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");



startScreen.addEventListener("click", start);

let player = { speed: 7, score: 0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;


}
function keyUp(e) {
    e.preventDefault()
    keys[e.key] = false;

}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();


    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) || (aRect.left > bRect.right))

}


function moveLines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML = "Game Over <br> Your final score is "+ player.score + "<br> Press here to restart the game..."

}

function moveEnemy(car) {
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            console.log("Collision")
            endGame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";

        }

        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}



function gamePlay() {

    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveEnemy(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }

        if (keys.ArrowDown && player.y < (road.bottom - 130)) { player.y += player.speed }

        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }

        if (keys.ArrowRight && player.x < (road.width - 80)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);

        player.score++;
     let ps = player.score-1
     score.innerText = "score : " + ps;
    }

}




function start() {

    startScreen.classList.add("hide");
    gameArea.innerHTML = "";


    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (let x = 0; x < 5; x++) {


        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = (x * 150)
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let y = 0; y < 3; y++) {


        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = ((y + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = "red";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
   

}

