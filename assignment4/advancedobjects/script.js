// setup canvas
// create reference to <p> in HTML
const paragraph = document.querySelector("p");
// variable to keep count of balls
let ballCount = 0;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// creating shape class
class Shape {
    // constructor with x, y, velx & vely
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// updating ball to inherit from shape
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        // take x, y, velX and velY from Shape
        super(x, y, velX, velY);
        // set color and size
        this.color = color;
        this.size = size;
        // value to track object existance
        this.exists = true;
    }

    // creating method to draw balls
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    // creating function for moving balls
    update() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }

        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }

        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }

        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// creating evilcircle class
class EvilCircle extends Shape {
    // constructor only needs x & y passed in
    constructor(x, y) {
        // inherit x, y from Shape (20 for velX & velY)
        super(x, y, 20, 20);
        // white color, size 10
        this.color = "white";
        this.size = 10;

        // add keyboard movement capability to evilcircle (copied from MDN)
        window.addEventListener("keydown", (event) => {
            // using if statements because using 'breaks' is a bad practice
            if (event.key === "a") {
                this.x -= this.velX;
            }
            if (event.key === "d") {
                this.x += this.velX;
            }
            if (event.key === "w") {
                this.y -= this.velY;
            }
            if (event.key === "s") {
                this.y += this.velY;
            }
        })
    }

    // functions for EvilCircle
    draw() {
        ctx.beginPath();
        // set lineWidth to 3
        ctx.lineWidth = 3;
        // update fillStyle to strokeStyle
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        // update .fill() to .stroke()
        ctx.stroke();
    }

    // function to prevent EvilCircle from leaving canvas
    checkBounds() {
        if (this.x + this.size >= width) {
            // changing x & y instead of vel, using size
            this.x -= this.size;
        }

        if (this.x - this.size <= 0) {
            this.x += this.size;
        }

        if (this.y + this.size >= height) {
            this.y -= this.size;
        }

        if (this.y - this.size <= 0) {
            this.y += this.size;
        }
    }

    // evilCircle collision detection
    collisionDetect() {
        for (const ball of balls) {
            // check if ball at collision exists
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    // stop collided balls from existing
                    ball.exists = false;
                    // decrement ballCount for each succesful collision
                    ballCount--;
                    // update text on screen
                    paragraph.textContent = "Ball count: " + ballCount;
                }
            }
        }
    }
}

// adding balls to canvas
const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );

    balls.push(ball);

    // increment ballCounter for each ball created
    ballCount++;
    // update counter on page
    paragraph.textContent = "Ball count: " + ballCount;
}

// creating ONE instance of EvilCircle (should spawn in center of screen)
const evilCircle = new EvilCircle(width / 2, height / 2);

// drawing created ball objects
function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        // only perform IF ball exists
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    // call EvilCircle functions in every iteration
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}

loop();