import React from 'react'

import { GrandCentralRoute } from 'grand-central'

const routes: Array<GrandCentralRoute> = [
    {
        name: 'test',
        path: '/test',
        component: () => 'GRAND CENTRAL TEST',
    },
]

export default routes
