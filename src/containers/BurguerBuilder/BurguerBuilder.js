import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliar';
import Burger from  '../../components/Burger/Burguer';

class BurguerBuilder extends Component{
    render() {
        return(
            <Aux>
                <Burger/>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurguerBuilder;