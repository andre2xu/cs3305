const DEATH_SCREEN = document.getElementById('death-screen');

DEATH_SCREEN.addEventListener('click', (event) => {
    const ELEMENT_CLICKED = event.target;

    if (ELEMENT_CLICKED.tagName === 'BUTTON') {
        const ACTION = ELEMENT_CLICKED.getAttribute('data-action');

        if (ACTION === 'exit') {
            // redirect to main menu route
        }
    };
});

export function showDeathScreen() {
    window.GAME_PAUSED = true;

    DEATH_SCREEN.classList.remove('hide');
};