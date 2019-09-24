
import React, { Component} from "react";

import CardColumns from 'react-bootstrap/CardColumns'
import MinionCard from "./card";


export default class AppCardGroup extends Component{
    state = {
        isLoading: true,
        cardlist: [],
      }
    
    
    fetchUsers = this.fetchUsers.bind(this);
    fetchUsers() {
        var myInit = { method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default' };

        //var request = "https://ghibliapi.herokuapp.com/films"
        var request = "https://nl9x48put6.execute-api.us-east-1.amazonaws.com/dev/minion"
            // Where we're fetching data from
        fetch(request,myInit)
            .then(response => response.json())
            .then(data =>
            this.setState({
                cardlist: data,
                isLoading: false,
            })
            )
            .catch(function(err) {
                    console.log('Fetch Error :-S', err);
            });
    }

    componentDidMount() {
        this.fetchUsers();

    }


    
    render(){
        const { isLoading, cardlist } = this.state;
        return(
            <CardColumns>
                {!isLoading ? (
                    cardlist.map(card => {
                        const {id} = card;
                        return(                     
                        <MinionCard 
                        key={id.toString()}
                        minion = {card}
                        />
                        );
                    })
                    ) : (<h1>Loading</h1>)
                }
            </CardColumns>
        )
    }

}