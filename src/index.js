import style from './style.scss';
import Game from './game/Game';
import $ from 'jquery';

$(() => {
    try {
        Game.init();
    } catch (e) {
        console.log('EXCEPTION!!!!');
        console.log(e);
    }
});
