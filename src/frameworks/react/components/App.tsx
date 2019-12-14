import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GrandCentralRoute } from '../../../index'
import { find } from 'lodash'

interface MyProps {
    router: any
    routes: Array<GrandCentralRoute>
}

class App extends Component<MyProps> {
    title: string

    constructor(props: any) {
        super(props)

        this.title = this.props.router.route.name
    }

    render() {
        const routeName = this.props.router.route.name

        const route = find(
            this.props.routes,
            (route) => route.name === routeName
        )

        if (route && route.component) {
            // @ts-ignore
            return <route.component store={this.props.store}></route.component>
        } else {
            return (
                <div>
                    component not found!
                </div>
            )
        }
    }
}

const mapStateToProps = (state: any) => ({
    router: state.router
})

export default connect(
    mapStateToProps
)(App)
