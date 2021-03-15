import React from 'react';
import ReactDOM from 'react-dom';
//import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';


const Menu = (props) => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Manutenções
                </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink exact href="/estados">Estados</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink exact href="/cidades">Cidades</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink exact href="/pessoas">Pessoas</NavLink>
                                </DropdownItem>                                
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;
