// 开始游戏
// 配置参数
let config = {
    SPEED: 6,     // 速度
    TIMER: null
};
// 按钮触发游戏
// 获取button
let btn = document.querySelector(".start").querySelector("button");
btn.addEventListener("click", function () {
    this.parentNode.style.display = "none";
    init();
})
// 游戏初始化
function init() {
    for (let i = 0; i < 4; i++) {
        createrow();
    }
    // 增加点击事件
    let game = document.querySelector(".game");
    game.addEventListener("click", function (e) {
        clickblack(e);
    })

    clearInterval(config.TIMER);
    config.TIMER = window.setInterval(move, 30);
}
// 创建行
function createrow() {
    // 获取游戏栏
    let game = document.querySelector(".game");
    let divRow = document.createElement("div");
    divRow.className = "row";
    // game.appendChild(divRow);
    // 给行内添加cell
    let temp = createcell();
    for (let i = 0; i < 4; i++) {
        let divCell = document.createElement("div");

        divCell.className = temp[i];
        divRow.appendChild(divCell);
    }

    if (game.firstChild == null) {
        game.appendChild(divRow);
    } else {
        //insertBefore(newElement,targetElement);
        game.insertBefore(divRow, game.firstChild);
    }
}
// 删除行
function delrow() {
    let game = document.querySelector(".game");
    if (game.childNodes.length == 6) {
        game.removeChild(game.lastChild);
    }
}
// 创建cell
function createcell() {
    const temp = ["cell", "cell", "cell", "cell"];
    let i = Math.floor(Math.random() * 4);
    temp[i] = "cell black";
    return temp;
}

// 让方块移动
function move() {
    // 获取游戏栏
    let game = document.querySelector(".game");
    let gameTop = game.offsetTop;
    game.style.top = gameTop + config.SPEED + "px";
    if (config.SPEED + gameTop > 0) {
        gameTop = 0;
    } else {
        gameTop += config.SPEED;
    }
    game.style.top = gameTop + 'px'; //不断移动top值，使它动起来
    if (gameTop == 0) {
        createrow();
        if (game.lastChild.childNodes[0]) {
            for (let i = 0; i < 4; i++) {
                if (game.lastChild.children[i].className === "cell black") {
                    gameover();
                }
            }
        }
        game.style.top = '-200px';
        delrow();
    }
}
// 判断点击黑块触底
function clickblack(e) {
    if (e.target.className === "cell") {
        gameover();
        // console.log("white block");
    } else {
        e.target.className = "gray";
        score();
        // console.log("black block");
    }
}
// 游戏结束
function gameover() {
    clearInterval(config.TIMER);
    fail();
}
// 游戏结束弹窗
function fail() {
    let result = document.querySelector(".result");
    result.style.display = "block";
    let score = document.querySelector(".score");
    let ctx = score.innerText;
    result.querySelector("i").innerText = ctx;
}
// 计分函数
function score() {
    let score = document.querySelector(".score");
    let newScore = (score.innerHTML | 0) + 1;
    if (newScore % 10 === 0) {
        config.SPEED += 3;
    }
    score.innerHTML = newScore;
}
