import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //asincrono
import { authReducer } from '../reducers/authReducer'
import { modalesReducer } from '../reducers/modalesReducer';
import { uiReducer } from '../reducers/uiReducer'
import { usuariosReducer } from '../reducers/usuariosReducer';

const reducers = combineReducers({

    auth: authReducer,
    ui: uiReducer,
    usuarios: usuariosReducer,
    modales: modalesReducer
})


//funciones asincronas
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    ),
)
