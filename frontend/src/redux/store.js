import { configureStore } from '@reduxjs/toolkit'
import { userReducer, } from './reducers/userReducers'
import { storeReducer } from './reducers/storeReducers'
import { productReducer } from './reducers/productReducers'
import { categoryReducer } from './reducers/categoryReducers'
import { eventReducer } from './reducers/eventReducers'
import { couponReducer } from './reducers/couponReducers'
import { cartReducer } from './reducers/cartReducers'
import { wishListReducer } from './reducers/wishListReducers'
import { orderReducer } from './reducers/orderReducers'


const store = configureStore({
    reducer: {
        auth: userReducer,
        storeLogin: storeReducer,
        products: productReducer,
        categories: categoryReducer,
        events: eventReducer,
        coupons: couponReducer,
        cart: cartReducer,
        wishList: wishListReducer,
        orders: orderReducer,
    }
})

export default store
