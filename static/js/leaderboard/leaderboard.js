
let score = 0;
let xhttp = new XMLHttpRequest();   // creating a new request object    
   


function init() {
    // Writing a score - and calling its function.
    // using an if statement for the key presses to increase the score count.
    if (((moveLeft || moveRight) && ! (moveLeft && moveRight) && ! player.in_air) || ((moveUp || moveDown) && ! (moveUp && moveDown))) {
        score = score + 1;
        // calling the function writeScore
        writeScore(score);
    }
    xhttp.onreadystatechange = handle_response;  // setting the function to be called when the request is complete   
    
}



// function to draw a score in html
function writeScore(score) {
    // The code below I adapted from the stop function given in previous lectures
    let score_element = document.querySelector("#count");
    score_element.innerHTML = score;
}


// function to stop the game
function stop(outcome) {
    // creating a variable for score and sending it to the scoreboard
    let data = new FormData();
    data.append("score", score);


    xhttp.open("POST", "store_score", true);  // specify if get or post request + specify URL data must be send to
    xhttp.send(data);           // sending data
}



// function to store the updated score in the database
function handle_response() {
    //Check that the response has fully arrived
    if (xhttp.readyState === 4) {
        //Check the request was successful
        if (xhttp.status === 200) {
            if (xhttp.responseText === "success") {
                // score was sucessfully stored in database
            } else {
                // score was not successfully stored in database
                return "unsuccessful";
            }
        }
    }
}


