import sagas from "./sagas";
import reducers from './reducers';
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState, history) {
    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const store = createStore(reducers, initialState, compose(applyMiddleware(...middlewares)));

    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
