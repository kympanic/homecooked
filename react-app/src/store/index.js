import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import products from "./products";
<<<<<<< HEAD
import reviews from "./reviews";
import payments from "./payments"

const rootReducer = combineReducers({
	session,
	products,
	reviews,
	payments
=======
import users from "./users";
import reviews from "./reviews";
const rootReducer = combineReducers({
	session,
	products,
	users,
	reviews,
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
