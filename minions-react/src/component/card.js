
import React, {Component} from "react";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import {addCookieMinion, checkCookieMinion, removeCookieMinion} from '../util/cookies'

export class AppCard extends Component{

    state = {
        onShopList: false,
    }

    componentDidMount() {
        if(checkCookieMinion(this.props.minion.id)) 
            this.setState({
                onShopList: true
            })

    }

    removeFromShopList = this.removeFromShopList.bind(this);
    removeFromShopList(){
        removeCookieMinion(this.props.minion.id)
        this.setState({
            onShopList: false
        })
    }

    addToShopList = this.addToShopList.bind(this);
    addToShopList(){
        addCookieMinion(this.props.minion)
        this.setState({
            onShopList: true
        })
        
    }

    render() {
        const { onShopList } = this.state;
        return(
            <Card >
            <Card.Img variant="top" src={this.props.minion.image_url} />
            <Card.Body>
                <Card.Title>{this.props.minion.name}</Card.Title>
                <Card.Text>
                     {this.props.minion.info}
                </Card.Text>
                    R$ {this.props.minion.value}
                {!onShopList 
                    ?<Button onClick={this.addToShopList} variant="primary" className="float-right">Adicionar no Carrinho</Button> 
                    :<ButtonGroup  className="float-right">
                        <Button onClick={this.removeFromShopList} variant="primary" className="btn btn-danger">Remover do Carrinho</Button> 
                    </ButtonGroup>
                }
            </Card.Body>
            </Card>
        )
    }
}

export default AppCard



