const PAUSE_MENU = document.getElementById('pause');

PAUSE_MENU.addEventListener('click', (event) => {
    const ELEMENT_CLICKED = event.target;

    if (ELEMENT_CLICKED.tagName === 'BUTTON') {
        const ACTION = ELEMENT_CLICKED.getAttribute('data-action');

        if (ACTION === 'resume') {
            hidePauseMenu();
        }
        else if (ACTION === 'exit') {
            // redirect to main menu route
        }
    };
});

export function showPauseMenu() {
    window.GAME_PAUSED = true;

    PAUSE_MENU.classList.remove('hide');
};

export function hidePauseMenu() {
    window.GAME_PAUSED = false;

    PAUSE_MENU.classList.add('hide');
};