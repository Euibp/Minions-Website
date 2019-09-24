
import React, { Component} from "react";
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import Modal from './modal'

class AppNavbar extends Component{

    render(){

        return(
        <Navbar bg="light"  expand="lg"  fixed="top">
            <Navbar.Brand href="#home">Compre seu Minion</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled />
                </Nav>
                <Nav.Link href="#link" disabled>Entrar</Nav.Link>
                <Form inline>
                  <Button variant="outline-success">Enviar Pedido</Button>
                  <Modal/>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default AppNavbar