import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import products from "./products";
import reviews from "./reviews";
import payments from "./payments"
// import cart from "./cart"
// import newCartReducer from "./cart";
import users from "./users";

const rootReducer = combineReducers({
	session,
	products,
	reviews,
	payments,
	// cart: newCartReducer
	users,
	payments,
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
