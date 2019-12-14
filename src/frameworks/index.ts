import Angular1Shell, { Angular1ShellOptions } from './angular1'
import ReactShell, { ReactShellOptions } from './react'

import GrandCentral from '../index';

export class FrameworkShells {
    react: ReactShell | null = null
    angular1: Angular1Shell | null = null
}

export interface FrameworkConfig {
    framework: string
    options?: any
}

const bootstrap = (
    grandCentral: GrandCentral,
    shells: FrameworkShells,
    name: string,
    options?: Angular1ShellOptions | ReactShellOptions,
) => {
    const {
        router,
        store,
        storeFactory,
        routes,
        services
    } = grandCentral

    switch (name) {
    case 'react':
        shells.react = new ReactShell(
            {
                router,
                store,
                routes,
                services,
            }
        )
        break
    case 'angular1':
        shells.angular1 = new Angular1Shell(options as Angular1ShellOptions)
        break
    default:
        throw new Error('framework not available')
    }
}

const initFrameworks = async (
    grandCentral: GrandCentral,
    frameworks: Array<FrameworkConfig>,
) => {
    const {
        services,
        shells,
    } = grandCentral

    frameworks.forEach(({
        framework,
        options
    }) => {
        bootstrap(grandCentral, shells, framework, options)
    })
}

export default initFrameworks
