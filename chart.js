// pag1
// preparo la querystring
let utente = "Gianni";
window.location = "/pag2?currentUser=" + user;

// pag 2
//ricavo il parametro dalla querystring
const urlString = window.location.href;
const url = new URL(urlString);
user = url.searchParams.get("currentUser");
console.log(user);

//faccio la partita
let score = 123;

// creo un nuovo oggetto da caricare su JSON bin
let userSession = {
    'user': user,
    'score': score
};

// scaricare tutto il record da json bin

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

        if (data.leaderboard === undefined) {
            data.leaderboard = [];
        } else {
            data.zxc.push(userSession);
        }

        req_u.send(JSON.stringify(data));
    }
};

req.open("GET", `https://api.jsonbin.io/v3/b/${BIN_ID}`, true);
req.setRequestHeader("X-Master-Key", API_KEY);
req.send();

// pag. 3
BIN_ID = '6385e5b3a3c728450eda7d89';
API_KEY = '$2b$10$KWxVu8aW.YRXOvS0UwlDP.hS6u52PsWX9b69W6JfL6fvdiXoXqqde';

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        function bubbleSort(arr) {
            var len = arr.length;
            for (var i = len - 1; i >= 0; i--) {
                for (var j = 1; j <= i; j++) {
                    if (arr[j - 1] > arr[j]) {
                        var temp = arr[j - 1];
                        arr[j - 1] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
        let data = JSON.parse(req.responseText).record;
        let leaderboard = data.leaderboard;
        leaderboard = bubbleSort(leaderboard);
        console.log(leaderboard);

        /// qui è dove metti su schermo i dati recuperati da JSON bin
        leaderboard.forEach(element => {
            // crei un nodo HTML con user e score
        });
    }
};

req.open("GET", `https://api.jsonbin.io/v3/b/${BIN_ID}`, true);
req.setRequestHeader("X-Master-Key", API_KEY);
req.send();