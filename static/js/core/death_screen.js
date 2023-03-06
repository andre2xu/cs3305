const DEATH_SCREEN = document.getElementById('death-screen');
const TIME_SURVIVED = document.getElementById('time-survived');
const POINTS_EARNED = document.getElementById('points-earned');

DEATH_SCREEN.addEventListener('click', (event) => {
    const ELEMENT_CLICKED = event.target;

    if (ELEMENT_CLICKED.tagName === 'BUTTON') {
        const ACTION = ELEMENT_CLICKED.getAttribute('data-action');

        if (ACTION === 'exit') {
            window.location.assign('/');
        }
    };
});

export function showDeathScreen() {
    window.GAME_PAUSED = true;



    // calculates how long the player survived
    const MS_ELAPSED = new Date() - window.timeGameStarted;
    const HRS = Math.round(MS_ELAPSED / 3.6e+6);
    const MINS = Math.round(MS_ELAPSED / 60000);
    const SECS = Math.round(MS_ELAPSED / 1000);

    let hrs = 0;
    let mins = 0;
    let secs = 0;

    if (HRS > 0.1) {
        hrs = HRS;
    }
    if (MINS > 0.1) {
        mins = MINS;
    }
    if (SECS > 0.1) {
        secs = SECS;
    }

    TIME_SURVIVED.innerText = `${hrs}h:${mins}m:${secs}s`;



    const XHR = new XMLHttpRequest();
    XHR.open('POST', '/store_score');
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify({
        millisecondsSurvived: MS_ELAPSED,
        pointsEarned: 0
    }));



    DEATH_SCREEN.classList.remove('hide');
};