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

let img;

function preload() {
    spritesheet = loadImage('assets/micro.png');
    img = loadImage('assets/qrcode.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    gravity = createVector(0, 0.3);
    for (let x = 0; x < spritesheet.width; x += textureSize) {
        for (let y = 0; y < spritesheet.height; y += textureSize) {
            let img = spritesheet.get(x, y, textureSize, textureSize);
            textures.push(img);
        }
    }

    if (somma >= 10000) {
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


 
    //QR CODE
    image(img, 150, 330, 709.1, 600.6);

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
    text("Until now you produced", 540, 1100);
    pop();

    //Numero micro raccolte sul totale
    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill(198, 35, 132);
    textFont('loos-normal');
    textSize(64);
    textAlign(CENTER);
    textStyle(BOLD);
    text(somma + " /" + " 10.000", 540, 1200);
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
    text("The party is coming", 540, 1690);
    pop();
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
