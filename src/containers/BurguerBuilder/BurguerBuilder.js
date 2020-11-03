import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliar';
import Burger from  '../../components/Burger/Burguer';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurguerBuilder extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }
    
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls/>
            </Aux>
        );
    }
}

export default BurguerBuilder;