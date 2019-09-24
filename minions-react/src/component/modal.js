import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

//import Nav from 'react-bootstrap/Nav'

import React,{Component} from 'react'

import {getCookieMinionList, getCookie} from '../util/cookies'
import {sendMinionsRequest} from '../util/send_email'


class AppModal extends Component{
    state= {
        emailValue: '',
        invalidemail:false
    }

    handleChange = this.handleChange.bind(this)
    handleChange(event) {
        var string = event.target.value
        this.setState({
            emailValue: string,
            invalidemail:false
        });
      }

    componentDidMount(){
        var email = getCookie("email")
        this.setState({emailValue: email})
    }

    render(){
        const {emailValue,invalidemail} = this.state
        var sendRequest = ()=>{
            sendMinionsRequest(emailValue,"Cliente",this.props.modalList, 
            (result)=>{
                if(result){
                    this.props.onHide()
                }else
                {
                    this.setState({
                        invalidemail:true
                    })
                }
            })
           
           
        }
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
                <Form onSubmit={sendRequest}>
                    <Form.Label>Adicione um email para confirmar</Form.Label>
                    <FormControl  onChange={this.handleChange} type="text" placeholder="email"/>
                    <Form.Text variant="danger" className="text-right">
                        {invalidemail?"email invalido": ""}
                    </Form.Text>
                </Form>
                
                </Modal.Body>
                <Modal.Footer>
                {(emailValue === "" || invalidemail)
                    ?<Button variant="secondary" disabled>Confirmar </Button> 
                    :<Button variant="success" onClick={sendRequest}>Confirmar </Button>
                }  
                </Modal.Footer>
            </Modal>
        )
    }
}



  export default class modalMolde extends Component {
    state = {
        modalShow: false,
        noShopList: false,
        buyList:[]
    }
  
    setModalShow = this.setModalShow.bind(this)
    setModalShow(bool){
        if(bool === true){
            var newList = getCookieMinionList()
            if(Array.isArray(newList) && !newList.length){
                bool = false
            } 
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
            <Button variant="outline-success" onClick={() => this.setModalShow(true)}>
                Confirmar Pedido
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
  