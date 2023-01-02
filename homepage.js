//when you click on the homepage you can go the the drawing page
const urlString = window.location.href
let url = new URL(urlString)

let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];
let textureSize = 70;

function preload() {
    spritesheet = loadImage('assets/micro.png');
    myfont = loadFont("assets/GD-Boing-Bold.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight)


    gravity = createVector(0, 0.3);
    for (let x = 0; x < spritesheet.width; x += textureSize) {
        for (let y = 0; y < spritesheet.height; y += textureSize) {
            let img = spritesheet.get(x, y, textureSize, textureSize);
            textures.push(img);
        }
    }

    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(textures);
        snow.push(new Snowflake(x, y, design));
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
        //the wind is smaller than gravity so that snowflakes drop down and don't go up
        //every snowflake has a different wind

        flake.applyForce(gravity); //apply gravity to each snowflake
        flake.applyForce(wind); //it allows snowflakes to move (from left to right or vice versa)
        flake.update();
        flake.render();
    }

    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill("white");
    textFont(myfont);
    textSize(135);
    textLeading(130);
    textAlign(CENTER);
    text("UNLOCK \n THE ISLAND", windowWidth / 2, windowHeight / 2 - 90);
    pop();

    // push();
    // drawingContext.shadowOffsetX = 6;
    // drawingContext.shadowOffsetY = -6;
    // drawingContext.shadowBlur = 10;
    // drawingContext.shadowColor = 'black';
    // fill("white");
    // textFont('loos-normal');
    // textSize(50);
    // textAlign(CENTER);
    // textStyle(BOLD);
    // text("A Game by Mollustic", windowWidth / 2, windowHeight / 2 + 100);
    // pop();


    push();
    drawingContext.shadowOffsetX = 6;
    drawingContext.shadowOffsetY = -6;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    fill("white");
    textFont('loos-normal');
    textSize(40);
    textAlign(CENTER);
    text("CLICK TO START", windowWidth / 2, windowHeight / 2 + 230);
    pop();
}

function mouseClicked() {
    window.open('nome.html', '_self')
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
