import React, { Component} from "react";

import AppNavbar from '../component/navbar'
import AppCardGroup from '../component/cardsgroup'
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button'


class Home extends Component{
    render(){
        // TODO: Trocar o Bottão inutil por um padding
        return(
            <div>
                <AppNavbar />
                <Navbar><Button variant="outline-success">Inutil</Button></Navbar> 
                <AppCardGroup></AppCardGroup>
            </div>
        );
    }
}


export default Home