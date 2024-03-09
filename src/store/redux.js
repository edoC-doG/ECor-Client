import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whiteList: ['isLoggedIn', 'token']
}

const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    user: userConfig
  },
});

export default { store } = persistReducer()