import {createStore, applyMiddleware} from "redux"
import  rootReducer from'./root-reducer'
import logger from 'redux-logger'
import {persistStore} from "redux-persist"
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./root.saga"


const sagaMiddleWares = createSagaMiddleware()
const middlewares = [sagaMiddleWares]

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleWares.run(rootSaga)

export const persistor = persistStore(store)
export default {store, persistor}
