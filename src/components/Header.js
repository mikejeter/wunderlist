import React from 'react';
import '../css/header.css'

export default function Header() {

  return (
    <header>
    <nav class="primary_nav">
        <div class="nav_content">
            <logo><a><img src='img/dash-logo@2x.png' /></a></logo>
            <button id="nav_menu_btn" class="nav_menu_btn"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" aria-label="" class="svg-replaced" shape-rendering="geometricPrecision"><path d="M0 0h24v3H0zm0 7h24v3H0zm0 7h24v3H0z" fill-rule="evenodd"></path></svg>
            </button>
        </div>
    </nav> 
    </header>
  );
}

