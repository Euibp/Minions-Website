import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import React,{Component} from 'react'

import {getCookieMinionList, getCookie} from '../util/cookies'


class AppModal extends Component{
    state= {textValue: ''}

    handleChange = this.handleChange.bind(this)
    handleChange(event) {
        console.log(event.target.value)
        var string = event.target.value
        this.setState({textValue: string});
      }

    componentDidMount(){
        var email = getCookie("email")
        this.setState({
            textValue: email
        })
    }

    render(){
        const {textValue} = this.state
        return(
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirmando Pedido
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>Suas Compras</h4>
                {this.props.modalList.map(minion=>{return <li key={minion.id}>{minion.name}</li>})}
                <p>             </p>
                <Form>
                    Adcione um email para confirmar <FormControl onChange={this.handleChange} type="text" placeholder="email" className="mr-sm-2" />
                </Form>
                </Modal.Body>
                <Modal.Footer>
                {(textValue === "")
                    ?<Button variant="secondary" disabled>Enviar Pedido </Button> 
                    :<Button variant="success" onClick={this.props.onHide}>Enviar Pedido </Button>
                }  
                </Modal.Footer>
            </Modal>
        )
    }
}



  export default class modalMolde extends Component {
    state = {
        modalShow: false,
        buyList:[]
    }
  
    setModalShow = this.setModalShow.bind(this)
    setModalShow(bool){
        if(bool === true){
            var newList = getCookieMinionList()
            this.setState({
                modalShow: bool,
                buyList:newList
            })
        }  
        this.setState({
            modalShow: bool,
        })
    }
        

    render(){
        const {modalShow,buyList} = this.state
        return (
        <ButtonToolbar>
            <Button variant="primary" onClick={() => this.setModalShow(true)}>
            Launch vertically centered modal
            </Button>
    
            <AppModal
            modalList={buyList}
            show={modalShow}
            onHide={() => this.setModalShow(false)}
            />
        </ButtonToolbar>
       );  
    }
  }
  