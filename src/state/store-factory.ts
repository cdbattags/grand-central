import {
    createStore,
    applyMiddleware,
    combineReducers,
    Action,
    Middleware,
    ReducersMapObject,
    StoreEnhancerStoreCreator,
    Store
} from 'redux'
import {
    router5Middleware,
    router5Reducer
} from 'redux-router5'
import { gcReducer } from './gc-reducer'
import { gcNavReducer } from '../services/navigation'
import { createLogger } from 'redux-logger'

import { Router } from 'router5'
import { Reducer } from 'react'

export interface NamedReducer {
    key: string
    reducer: Reducer<{}, Action>
}

export default class GrandCentralStoreFactory {
    reducers: ReducersMapObject
    createStoreWithMiddleware: StoreEnhancerStoreCreator

    constructor(
        externalRouter: Router,
        externalReducers: Array<NamedReducer> = [],
        externalMiddleware: Array<Middleware> = [],
    ) {
        const middleware = [
            router5Middleware(externalRouter) as Middleware,
            createLogger() as Middleware,
            ...externalMiddleware
        ]

        this.createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

        this.reducers = {
            router: router5Reducer,
            grandCentral: gcReducer,
            nav: gcNavReducer,
        }

        externalReducers.forEach((namedReducer: NamedReducer) => {
            this.reducers[namedReducer.key] = namedReducer.reducer
        })
    }

    async init(
        initialState = {},
    ): Promise<Store> {
        return this.createStoreWithMiddleware(
            combineReducers(this.reducers),
            initialState
        )
    }

    createEmptyStore() {
        return createStore(
            (state = {}, action: Action) => state
        )
    }
}
