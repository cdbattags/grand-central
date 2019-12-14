import createRouter, { Route } from 'router5'
import browserPlugin from 'router5-plugin-browser';
import { union } from 'lodash'

import defaultRoutes from '.'

export default function configureRouter(routes: Array<Route> = []) {
    const mergedRoutes = union(defaultRoutes, routes)

    const router = createRouter()
        .setDependency('context', {})
        .add(mergedRoutes)
        .setOption(
            'defaultRoute',
            'default'
        )

    // Plugins
    router.usePlugin(
        browserPlugin({
            useHash: true
        })
    )

    return router
}
