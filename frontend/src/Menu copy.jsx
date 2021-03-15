import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

let linkCorrente = {
    color : "#027399"
};


const Menu = () => (
    <ul>
        <li>
            <NavLink exact activeStyle={linkCorrente} to="/">Home</NavLink>
        </li>
        <li>            
            <NavLink exact activeStyle={linkCorrente} to="/estados">Estados</NavLink>
        </li>     
        <li>            
            <NavLink exact activeStyle={linkCorrente} to="/cidades">Cidades</NavLink>
        </li>                  
    </ul>
)


export default Menu;
