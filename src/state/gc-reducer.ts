import { Action } from 'redux'

export class GrandCentralState {
    title = 'JS Grand Central'
    ampConfig = {}
}

interface GCAction extends Action {
    title?: string
}

export const gcReducer = (
    state = new GrandCentralState(),
    action: GCAction
): {} => {
    switch (action.type) {
    default:
        return state
    }
}
