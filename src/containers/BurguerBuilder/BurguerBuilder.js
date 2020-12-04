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
import * as actionTypes from '../../store/actions';

const INGRIDENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurguerBuilder extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }
    
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // console.log(this.props);
        // axios.get('https://react-my-burger-d86b9.firebaseio.com/ingredients.json')
        //     .then( response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }
 
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIgredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGRIDENT_PRICES[type]     
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});   
        this.updatePurchaseState(updateIngredients);
    }   

    removeIgredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGRIDENT_PRICES[type]     
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});   
        this.updatePurchaseState(updateIngredients);
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContiueHandler = () => {
        const queryParams = [];
        for( let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push(
            {
                pathname: '/checkout',
                search: '?' + queryString
            });
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
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContiueHandler}
                                price={this.state.totalPrice}/>;
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
        ings: state.ingredients
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientsAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}) ,
        onIngredientsRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}) 
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));