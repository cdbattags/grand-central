import React, { ReactInstance, PureComponent, Component, createElement, Context} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import { Store } from 'redux'
import { Router } from 'router5'

import App from './components/App'
import FrameworkShell from '../shell'
import { GrandCentralRoute } from '../../index'
import GrandCentralServiceRegistry from '../../services/registry'

const DumbComponent = (props: { [s: string]: any}, template: Component) => createElement('div', props, template)

export const GCServiceContext = React.createContext(new GrandCentralServiceRegistry())

export interface ReactShellOptions {
    router: Router
    store: Store
    routes: Array<GrandCentralRoute>
    services: GrandCentralServiceRegistry
}

export default class ReactShell extends FrameworkShell {
    app: JSX.Element

    constructor(
        options: ReactShellOptions
    ) {
        super()
        this.app = this.bootstrap(options)
    }

    init(options: ReactShellOptions) {
        let wrapped

        wrapped = (
            <GCServiceContext.Provider value={options.services}>
                <Provider store={options.store}>
                    <RouterProvider router={options.router}>
                        <App routes={options.routes} store={options.store}/>
                    </RouterProvider>
                </Provider>
            </GCServiceContext.Provider>
        )

        return {
            router: options.router,
            wrapped,
        }

    }

    bootstrap(options: ReactShellOptions) {
        const { router, wrapped } = this.init(options)

        router.start((err: any, state: any) => {
            ReactDOM.render(wrapped, document.getElementById('root'))
        })

        return wrapped
    }

    inject(element: any, state: { [s: string]: any }, template: Component) {
        ReactDOM.render(
            DumbComponent(state, template),
            element
        )
    }
}
