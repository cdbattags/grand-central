import { Component } from 'react'

export default abstract class FrameworkShell {
    abstract app: any
    protected abstract init(options?: any): any
    protected abstract bootstrap(options?: any): any
    abstract inject(
        element: any,
        state: { [s: string]: any },
        template: Component | string
    ): any
}
