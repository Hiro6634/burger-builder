import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode:  {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },  
            email: {
                elementtype: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod:  {
                elementtype: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        }

        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
                console.log(error)});
    }

    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="text" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if( this.state.loading) {
            form = <Spinner />;
        }   
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form   }
            </div>
        );
    }

}

export default ContactData;