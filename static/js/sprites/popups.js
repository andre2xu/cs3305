const TEXT_STYLE = {
    fontSize: 20,
    fill: 0xffffff,
};

export const AMMO_CACHE_POPUP = new PIXI.Text("Press E to refill ammo.(500)",TEXT_STYLE)
AMMO_CACHE_POPUP.alpha = 0
export const PORTAL_POPUP = new PIXI.Text("Press Q to change rooms.",TEXT_STYLE)
PORTAL_POPUP.alpha = 0
export const UPGRADE_BENCH_POPUP = new PIXI.Text("CHOOSE UPGRADE(1000): E: Ammo and clip size. T: Damage",TEXT_STYLE)
UPGRADE_BENCH_POPUP.alpha = 0


export function managePopUp(popup,player,isClose){
    if (isClose){
        if (popup.alpha < 1.0){

            popup.alpha += 0.01
        }
    }else {
        if (popup.alpha > 0.0){

            popup.alpha -= 0.01
        }
    }

}