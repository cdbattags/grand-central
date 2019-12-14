import sample from './sample/sample.component'

const components =
    angular
    .module(
        'components',
        []
    )
    .component('sample', sample)

export default components
