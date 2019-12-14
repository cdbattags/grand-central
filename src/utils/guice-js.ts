const isClass = (v: any) => {
    const test = (
        typeof v === 'function' ||
        /^\s*class\s+/.test(v.toString())
    )

    // console.log(`isClass: ${test}`)

    return test
}

export default class GuiceJS {
    modules = {}

    resolve(name: string) {
        const module = this.modules[name]

        return this.getInjector()(module)
    }

    addModule(
        name: string,
        module: any
    ) {
        this.modules[name] = module
    }

    getInjector() {
        const container = this

        return (
            (member: any) => {
                if (isClass(member)) {
                    const paramParser = new Proxy({}, {
                        // The `get` handler is invoked whenever a get-call for
                        // `injector.*` is made. We make a call to an external service
                        // to actually hand back in the configured service. The proxy
                        // allows us to bypass parsing the function params using
                        // taditional regex or even the newer parser.
                        get: (target, name) => container.resolve(name),

                        // You shouldn't be able to set values on the injector.
                        set: (target, name, value) => {
                            throw new Error(`Don't try to set ${name}! 😑`)
                        }
                    })

                    return new member(paramParser)
                } else {
                    return member
                }
            }
        )
    }
}
