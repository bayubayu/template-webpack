import $ from "jquery";
import './styles/style.scss';

let $button = $('#button')
    .on('click',()=>{
        $('h1').css('color','Fuchsia');    
    })
    .css('background','yellow');