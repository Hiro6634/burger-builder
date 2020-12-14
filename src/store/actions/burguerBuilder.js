import * as actionTypes from './actionTypes';

export const addIngedients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: name
    };
}