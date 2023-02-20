// adding collision sound
let impactAudio = new Audio();

// adding background sounds
let forestAudio = new Audio();


// INIT FUNCTION
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    // adding source of impact sound
    // I used the same method applied to the source of image files, as given in lectures here below.
    impactAudio.src = "static/mixkit-fairy-bells-583.mp3";

    // adding source of forest sound
    forestAudio.src = "static/mixkit-forest-with-birds-singing-1235.mp3";


    // adding event listener to play the sound when the game starts
    forestAudio.addEventListener("canplaythrough",function(){
        forestAudio.play();
    }
    );


    
    // if player reaches the edge of the screen, then player will have won
    if (player.y <= 0) {
        forestAudio.pause();
        stop("Player has won!");
        return;
    }
    
    
    // if player collides with a vilaian
    if (player_collides_villains(villains)) {
        // I modified and used some code from https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio to activate the play sound function.
        impactAudio.play();
        // Pause background music
        forestAudio.pause();
            //console.log("The Pirates have won.  Player has lost.")
        stop("The Pirates have won.  Player has lost.");
        console.log(villains)
        return;
    }






}