import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import products from "./products";
import reviews from "./reviews";
import payments from "./payments";
import users from "./users";
import orders from "./orders";
import { cartReducer } from "./session";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
	session,
	products,
	reviews,
	users,
	payments,
	cart: cartReducer,
	orders,
});

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configuredStore = (preloadedState) => {
	return createStore(persistedReducer, preloadedState, enhancer);
};

export default configuredStore;

