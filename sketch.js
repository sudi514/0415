let c = ["#A73E2B", "#EAA020", "#E9DEB0", "#789F8A"];

var balls = [];
var ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background("#57411B");

  let cols = int(6);
  let rows = cols;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;
      let rotate_num = int(random(6)) * 360 / 6;

      ball = new ball_class({
        p: { x: x + cellW / 2, y: y + cellH / 2 },
        r: cellW / 1.2,
        color: random(c),
        mode: random(["happy", "bad"]),
        rotate: rotate_num
      });
      balls.push(ball);
    }
  }
}

function draw() {
  background("#57411B"); // 設置背景色
  for (j = 0; j < balls.length; j = j + 1) {
    ball = balls[j];
    ball.draw();
    ball.update();
  }
}

function mousePressed() {
  // 按下滑鼠時，隨機變換所有球的顏色
  for (let i = 0; i < balls.length; i++) {
    balls[i].changeColor();
  }
}

class ball_class {
  constructor(args) {
    this.p = args.p || { x: width / 2, y: height / 2 };
    this.r = args.r || random(50, 120);
    this.color = args.color || random(c);
    this.mode = args.mode || random(["happy", "bad"]);
    this.rotate = args.rotate || 0;
  }
  draw() {
    push();
    translate(this.p.x, this.p.y); //把圓點(0,0)設定到圓心上
    rotate(this.rotate);
    noStroke();
    fill(this.color);
    circle(0, 0, this.r);

    if (random(100) < 50) {
      if (this.r > 20) {
        let newr = this.r / 2;
        drawCircle(0, newr / 2, newr);
        drawCircle(0, -newr / 2, newr);
      }
    } else {
      if (this.r > 20) {
        let newr = this.r / 2;
        drawCircle(newr / 2, 0, newr);
        drawCircle(-newr / 2, 0, newr);
      }
    }

    pop();
  }
  update() {
    if (this.mode == "happy") {
      this.p.y = this.p.y + sin(frameCount / 10 + this.r / 10) * this.r / 10;
    } else {
      this.p.x = this.p.x + random(-2, 2);
      this.p.y = this.p.y + random(-2, 2);
    }
    if (this.p.x < 0) {
      this.p.x = width;
    }
    if (this.p.x > width) {
      this.p.x = 0;
    }
    if (this.p.y < 0) {
      this.p.y = height;
    }
    if (this.p.y > height) {
      this.p.y = 0;
    }
  }
  
  // 新增的方法：改變顏色
  changeColor() {
    let currentIndex = c.indexOf(this.color);
    let newIndex = (currentIndex + 1) % c.length;
    this.color = c[newIndex];
  }
}

function drawCircle(x, y, d) {
  noStroke();
  fill(random(c));
  circle(x, y, d);

  if (random(100) < 50) {
    if (d > 20) {
      let newd = d / 2;
      drawCircle(x, y + newd / 2, newd);
      drawCircle(x, y - newd / 2, newd);
    }
  } else {

    if (d > 20) {
      let newd = d / 2;
      drawCircle(x + newd / 2, y, newd);
      drawCircle(x - newd / 2, y, newd);
    }
  }
}