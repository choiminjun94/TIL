import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { createStore } from "redux"
import { reduce } from "./App"
import { Provider } from "react-redux"

// STEP4
const store = createStore(reduce)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)

serviceWorker.unregister()