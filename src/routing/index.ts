import React from 'react'

import { GrandCentralRoute } from 'curriculum-grand-central'

import ClassroomContainer from '../components/ClassroomContainer'
import CurriculumActivity from '../components/Interactives/ActivityInteractive'
import PresentationContainer from '../components/PresentationContainer'

export interface RouteComponentMap {
    [s: string]: JSX.Element
}

export interface GrandCentralRoute {
    name: string,
    path: string,
    component: React.SFC
}

const routes: Array<GrandCentralRoute> = [
    {
        name: 'default',
        path: '/',
        component: () => 'Hello! Welcome to Grand Central!',
    },
]

export default routes
