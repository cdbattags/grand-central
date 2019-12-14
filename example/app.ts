import { injectCSS } from 'curriculum-grand-central'
import Angular1Module from './components/angular/module'

import configureGrandCentral from './grand-central-config'
import routes from './routes'
import { ClassroomState } from './store'

// window references needed by curriculum components
import 'curriculum/vendor-dependencies'

const main = async () => {
    const basePath = document.getElementsByTagName('base')[0].href

    injectCSS('styles.bundle.css') // global-type styles
    injectCSS('index.bundle.css') // component styles

    const grandCentral = configureGrandCentral(
        routes,
        {
            initialState: new TestState(),
            basePath,
        },
    )

    await grandCentral.init(
        [
            {
                framework: 'react',
                options: {},
            },
            {
                framework: 'angular1',
                options: {
                    modules: [
                        CurriculumComponents,
                    ],
                },
            },
        ],
    )
}

main()
