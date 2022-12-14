let risultati = [];
let i = 0;
let j = 0;

function setup() {
    //risultati = getItem('chart');
    createCanvas(400, 400);
    if (risultati === null) {
        risultati = [];
    }

    // let pippo = sessionStorage.getItem('test-item');
    // console.log(pippo)
    //risultati.push(pippo);
    //storeItem('chart', risultati);
}

function draw() {
    background(255);
    // text(risultati, 100, 100);
    risultati.sort(function (a, b) { return a - b });
}

// function keyPressed() {
//     if (key === "c") {
//         sessionStorage.clear();
//     }
// }

let BIN_ID = '6385e5b3a3c728450eda7d89';
let API_KEY = '$2b$10$KWxVu8aW.YRXOvS0UwlDP.hS6u52PsWX9b69W6JfL6fvdiXoXqqde';

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        let data = JSON.parse(req.responseText).record;
        console.log(data);

        let req_u = new XMLHttpRequest();

        req_u.onreadystatechange = () => {
            if (req_u.readyState == XMLHttpRequest.DONE) {
                //text(req.responseText, 100, 100);
                console.log(req.responseText);
            }
        };

        req_u.open("PUT", `https://api.jsonbin.io/v3/b/${BIN_ID}`, true);
        req_u.setRequestHeader("Content-Type", "application/json");
        req_u.setRequestHeader("X-Master-Key", API_KEY);

        if (data.zxc === undefined) {
            data.zxc = [];
        } else {
            data.zxc.push(risultati);
        }

        req_u.send(JSON.stringify(data));
    }
};

req.open("GET", `https://api.jsonbin.io/v3/b/${BIN_ID}`, true);
req.setRequestHeader("X-Master-Key", API_KEY);
req.send();