import _ from 'lodash'
import { fetchAmpConfig } from '@amplify/amp-api'

import GuiceJS from '../utils/guice-js'

type Register = any

interface ToRegister {
    [s: string]: Register
}

export default class GrandCentralServiceRegistry {
    constructor(
        private toRegister: ToRegister
    ) {
        const di = new GuiceJS()

        _.each(
            this.toRegister,
            (
                register: Register,
                name: string,
            ) => {
                di.addModule(name, register)
            },
        )

        _.each(
            this.toRegister,
            (
                register: Register,
                name: string,
            ) => {
                this[name] = di.resolve(name)
            },
        )
    }
}

/**
 * experiment below
 */

export class Service {
    config

    constructor(
        options: {
            config,
        }
    ) {
        this.config = options.config
    }
}

export const main = async () => {
    const registry = new Registry({
        amp: Service,
        config: await fetchAmpConfig(),
    })

    console.log(registry)
}

