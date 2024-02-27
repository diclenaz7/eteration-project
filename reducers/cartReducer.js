import * as types from '../screens/HomeScreen/types';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      if (existingItem) {
        // If item already exists, update its count
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === existingItem.id
              ? {...item, count: item.count + 1}
              : item,
          ),
        };
      } else {
        // If item does not exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, {...newItem, count: 1}],
        };
      }
    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems
          .map(item =>
            item.id === action.payload.id
              ? {...item, count: Math.max(0, item.count - 1)}
              : item,
          )
          .filter(item => item.count > 0),
      };

    case types.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case types.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.itemId
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
