import angular from 'angular'
import { cloneDeep } from 'lodash'

import components from './components/angular/module'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const setupAngularApp = () => {
    const app = angular.module(
        'shell',
        [
            components.name,
        ]
    )

    app.run([
        '$rootScope',
        ($rootScope) => {
            $rootScope.title = 'Curriculum Grand Central'
        },
    ])

    return app
}

const bootstrapAngular = () => {
    setupAngularApp()
    return angular.bootstrap(document, ['shell'])
}

const setupReactApp = () => {}

const bootstrapReact = () => {}

const inject = (element, state, template) => {
    const el = angular.element(element)

    let scope

    const injected = el.injector()

    if (injected) {
        console.log('injected exists')

        injected.invoke([
            '$compile',
            '$rootScope',
            (
                $compile,
                $rootScope
            ) => {

                console.log($compile)

                console.log($rootScope.title)

                const clonedState = cloneDeep(state)

                scope = angular.extend(
                    $rootScope.$new(),
                    {
                        ...state,
                        $ctrl: clonedState,
                    },
                )

                console.log(scope)
                console.log(template)

                const component = $compile(template)(scope)

                console.log('component: ', component)

                el.replaceWith(component)

                scope.$apply()
            }
        ])
    } else {
        element.innerHTML = template
    }

    return element
}

const runSetup = async () => {
    const start = new Date()

    console.log(bootstrapAngular())

    inject(
        document.getElementById('sample'),
        {
            title: 'on $ctrl'
        },
        `<sample
            title="$ctrl.title">
    	</sample>`
    )

    const end = new Date()

    const loadTime = (end.getTime() - start.getTime()) / 1000

    console.log(
        'time to load grand central: ',
        loadTime
    )
}

runSetup()
