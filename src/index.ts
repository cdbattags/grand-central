import _ from 'lodash'
import { Router, Route } from 'router5'
import { Store, Middleware } from 'redux'

// lifecycle management
import GrandCentralServiceRegistry from './services/registry'

// framework specific
import initFrameworks, {
    FrameworkConfig,
    FrameworkShells,
} from './frameworks'

// state
import GrandCentralStoreFactory, { NamedReducer } from './state/store-factory'
import { GrandCentralState } from './state/gc-reducer'

// routing
import { GrandCentralRoute } from './routing/index'
import configureRouter from './routing/configure-router'

// react context binding externally
export { GCServiceContext } from './frameworks/react'

// re-exports
export { injectHTML, injectCSS, injectJS } from './utils/dom-additions'


declare global {
    interface Window {
        gc: GrandCentral
    }
}

export class GrandCentralOptions {
    initialState: object = {}
    basePath: string = ''
}

export default class GrandCentral {
    //options
    options: GrandCentralOptions

    // router
    router: Router

    // routes + JSX component webpack DAG
    routes: Array<GrandCentralRoute>

    // services
    services: GrandCentralRegistry

    // shells
    shells: FrameworkShells

    // store
    storeFactory: GrandCentralStoreFactory
    store: Store

    constructor(
        routes: Array<GrandCentralRoute> = [],
        reducers: Array<NamedReducer> = [],
        middleware: Array<Middleware> = [],
        options?: GrandCentralOptions,
    ) {
        super()

        this.services = new GrandCentralRegistry()

        this.options = Object.assign(
            new GrandCentralOptions(),
            options
        )

        this.router = configureRouter(
            routes.map(
                ({ name, path }) => ({ name, path })
            )
        )

        this.storeFactory = new GrandCentralStoreFactory(
            this.router,
            reducers,
            middleware,
        )
        this.store = this.storeFactory.createEmptyStore()

        this.routes = routes

        this.shells = new FrameworkShells()

        window.gc = this
    }

    async init(
        frameworks: Array<FrameworkConfig>
    ) {
        const start = new Date()

        await this.services.init(this.options)

        this.store = await this.storeFactory.init({
            ...this.options.initialState,
            grandCentral: {
                ...GrandCentralState,
                registry: this.services,
            },
        })

        this.services.bindStore(this.store)

        await initFrameworks(this, frameworks)

        const end = new Date()

        const loadTime = (end.getTime() - start.getTime()) / 1000

        console.log(`time to load grand central: ${loadTime}`)
    }
}
