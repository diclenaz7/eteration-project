import * as types from './types';

export const addToCart = item => ({
  type: types.ADD_TO_CART,
  payload: item,
});

export const removeFromCart = itemId => ({
  type: types.REMOVE_FROM_CART,
  payload: itemId,
});
