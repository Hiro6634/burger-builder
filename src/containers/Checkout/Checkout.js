import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContiunedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary  = <Redirect to="/" />;
        if( this.props.ings){
            summary = ( 
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContiunedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </div>
            );
        }
        return(
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);  