import angular, { IModule } from 'angular'
import angularSanitize from 'angular-sanitize'
import FrameworkShell from '../shell'
import 'angular-hotkeys';

export interface Angular1ShellOptions {
    modules: Array<IModule>,
    values: Array<{ key: string, value: any }>
}

export default class Angular1Shell extends FrameworkShell {
    app: IModule

    constructor(
        options: Angular1ShellOptions = {
            modules: [],
            values: []
        }
    ) {
        super()

        this.app = this.init()

        if (options.modules.length > 0) options.modules.forEach(module => {
            this.addModule(module.name)
        })

        if (options.values.length > 0) options.values.forEach(({key, value}) => {
            this.addValue(key, value)
        })

        this.bootstrap()
    }

    init() {
        const app = angular.module(
            'grand-central',
            [
                // 'ui.router',
                'cfp.hotkeys',
                angularSanitize,
            ]
        )

        app.run([
            '$rootScope',
            ($rootScope: any) => {
                $rootScope.viewTitle = 'Grand Central'
            },
        ])

        return app
    }

    bootstrap() {
        angular.bootstrap(
            document,
            [
                'grand-central'
            ]
        )
    }

    addValue(key: string, value: any) {
        this.app.value(key, value)
    }

    addModule(moduleName: string) {
        this.app.requires.push(moduleName)

        // angular.module(
        //     'grand-central',
        //     [
        //         module.name
        //     ]
        // )

        // const $document = angular.element(document)
        // const $rootScope = $document.injector().get('$rootScope')
        // $rootScope.$destroy()
        // angular.element(document).empty()

        // this.bootstrap()
    }

    inject(element: any, state: { [s: string]: any }, template: string) {
        const el: ng.IAugmentedJQuery = angular.element(element)

        let scope

        const injected = el.injector()

        let unwatch = () => {}

        if (injected) {
            injected.invoke([
                '$compile',
                '$rootScope',
                (
                    $compile,
                    $rootScope,
                ) => {
                    scope = angular.extend(
                        $rootScope.$new(),
                        {
                            $ctrl: state,
                        },
                    )

                    const component = $compile(template)(scope)

                    el.html(component)

                    // scope.$apply()
                }
            ])

            unwatch = () => {
                scope.$destroy()
            }

        } else {
            element.innerHTML = template
        }

        return unwatch
    }
}
