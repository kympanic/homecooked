import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configuredStore from "./store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from 'redux-persist/integration/react'

const store = configuredStore()
let persistor = persistStore(store);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
