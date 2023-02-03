const urlString = window.location.href
let url = new URL(urlString)

let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];
let textureSize = 70;

//sounds
let sound1;
let sound2;
let sound3;
let sound4;
let sound5;
let sound6;
let sound7;
let sound8;
let sound9;
let sound10;
let sound11;
let sound12;
let sottofondo;

function preload() {
    spritesheet = loadImage('assets/micro.png');
    myfont = loadFont("assets/GD-Boing-Bold.ttf");
    sound1 = loadSound("assets/audio/sottofondo/soundtrack1.mp3")
    sound2 = loadSound("assets/audio/sottofondo/soundtrack2.mp3")
    sound3 = loadSound("assets/audio/sottofondo/soundtrack3.mp3")
    sound4 = loadSound("assets/audio/sottofondo/soundtrack4.mp3")
    sound5 = loadSound("assets/audio/sottofondo/soundtrack5.mp3")
    sound6 = loadSound("assets/audio/sottofondo/soundtrack6.mp3")
    sound7 = loadSound("assets/audio/sottofondo/soundtrack7.mp3")
    sound8 = loadSound("assets/audio/sottofondo/soundtrack8.mp3")
    sound9 = loadSound("assets/audio/sottofondo/soundtrack9.mp3")
    sound10 = loadSound("assets/audio/sottofondo/soundtrack10.mp3")
    sound11 = loadSound("assets/audio/sottofondo/soundtrack11.mp3")
    sound12 = loadSound("assets/audio/sottofondo/soundtrack12.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //sounds
    sottofondo = Math.floor(Math.random() * 12);
    if (sottofondo == 1) {
        sound1.play();
        sound1.setVolume(0.5);
    } if (sottofondo == 2) {
        sound2.play();
        sound2.setVolume(0.5);
    } if (sottofondo == 3) {
        sound3.play();
        sound3.setVolume(0.5);
    } if (sottofondo == 4) {
        sound4.play();
        sound4.setVolume(0.5);
    } if (sottofondo == 5) {
        sound5.play();
        sound5.setVolume(0.5);
    } if (sottofondo == 6) {
        sound6.play();
        sound6.setVolume(0.5);
    } if (sottofondo == 7) {
        sound7.play();
        sound7.setVolume(0.5);
    } if (sottofondo == 8) {
        sound8.play();
        sound8.setVolume(0.5);
    } if (sottofondo == 9) {
        sound9.play();
        sound9.setVolume(0.5);
    } if (sottofondo == 10) {
        sound10.play();
        sound10.setVolume(0.5);
    } if (sottofondo == 11) {
        sound11.play();
        sound11.setVolume(0.5);
    } if (sottofondo == 12) {
        sound12.play();
        sound12.setVolume(0.5);
    }

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
        flake.applyForce(gravity); //apply gravity to each snowflake
        flake.applyForce(wind); //it allows snowflakes to move (from left to right or vice versa)
        flake.update();
        flake.render();
    }

    push();
    fill("white");
    textFont(myfont);
    textSize(105);
    textLeading(115);
    textAlign(CENTER);
    text("UNLOCK \n THE ISLAND", windowWidth / 2, windowHeight / 2 - 90);
    pop();

    push();
    fill("white");
    textFont('loos-normal');
    textSize(45);
    textAlign(CENTER);
    text("A game by Mollustic", windowWidth / 2, windowHeight / 2 + 230);
    pop();
}

function keyPressed() {
    if (keyCode === ENTER) {
        window.open('nome.html', '_self');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
