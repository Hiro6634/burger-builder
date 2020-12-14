import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from  '../../components/Burger/Burguer';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';


class BurguerBuilder extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }
    
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log(this.props);
    }
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContiueHandler = () => {
        this.props.history.push('/checkout');
    }
    
    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner />;
        
        if( this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContiueHandler}
                                price={this.props.price }/>;
        }
        if( this.state.loading){
            orderSummary = <Spinner/>
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientsAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}) ,
        onIngredientsRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}) 
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));