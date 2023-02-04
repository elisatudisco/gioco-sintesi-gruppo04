const urlString = window.location.href
let url = new URL(urlString)

let somma = localStorage.getItem('somma');
var message = somma;
let myText;

function keyPressed() {
    if (keyCode === ENTER) {
        window.open('./homepage.html', '_self');
        localStorage.clear();
    }
}

let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];
let textureSize = 70;

let angle;
let angleV = 0;
let angleA = 0;
let bob;
let len;
let origin;
let gravity1 = 0.5;

let img;

function preload() {
    spritesheet = loadImage('assets/micro.png');
    img = loadImage('assets/qrcode.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(RADIANS);

    origin = createVector(429, 0);
    angle = PI / 30;
    bob = createVector();
    len = 330;

    gravity = createVector(0, 0.3);
    for (let x = 0; x < spritesheet.width; x += textureSize) {
        for (let y = 0; y < spritesheet.height; y += textureSize) {
            let img = spritesheet.get(x, y, textureSize, textureSize);
            textures.push(img);
        }
    }

    if (somma >= 2000) {
        for (let i = 0; i < 100; i++) {
            let x = random(width);
            let y = random(height);
            let design = random(textures);
            snow.push(new Snowflake(x, y, design));
        }
    }
}

function draw() {
    background("black");

    let force = gravity1 * sin(angle);
    angleA = (-1 * force) / len;
    angleV += angleA;
    angle += angleV;

    bob.x = len * sin(angle) + origin.x;
    bob.y = len * cos(angle) + origin.y;

    zOff += 0.1; //changes the perlin noise value over time
    for (flake of snow) {
        //for every element of the array
        //it is used to avoid that snowflakes drop straight
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle); //wind angle
        wind.mult(0.01); //force of the wind which moves the snowflakes
        flake.applyForce(gravity); //apply gravity to each snowflake
        flake.applyForce(wind); //it allows snowflakes to move (from left to right or vice versa)
        flake.update();
        flake.render();
    }

    //Titolo "Stay tuned"
    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill("white");
    textFont('GD-Boing-Bold');
    textSize(96);
    textAlign(CENTER);
    text("Stay tuned", 540, 160);
    pop();

    //Congrats! You produced
    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill("white");
    textFont('loos-normal');
    textSize(64);
    textAlign(CENTER);
    text("Until now you have produced", 540, 1100);
    pop();

    //Numero micro raccolte sul totale
    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill(232, 74, 17);
    textFont('GD-Boing-Bold');
    textSize(64);
    textAlign(CENTER);
    textStyle(BOLD);
    text(somma + " /" + " 2000", 540, 1200);
    pop();

    //microplastics
    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill("white");
    textFont('loos-normal');
    textSize(64);
    textAlign(CENTER);
    text("microplastics", 540, 1300);
    pop();

    //The party is coming
    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill("white");
    textFont('loos-normal');
    textSize(64);
    textAlign(CENTER);
    textStyle(BOLD);

    if (somma < 2000){
    text("Do not give up", 540, 1690);
    } else {
        text("Soon we will party", 540, 1690);
    }
    pop();

    //QR CODE
    image(img, bob.x - 250, bob.y, 709.1, 600.6);
}

function keyPressed() {
    if (keyCode === ENTER) {
        window.open('./homepage.html', '_self');
        localStorage.clear();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
