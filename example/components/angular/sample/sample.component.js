import template from './sample.template.html';

const bindings = {
    title: '<'
};

class SampleController {
    constructor(
        $scope,
        $rootScope,
    ) {
        console.log('this ', this)

        console.log('$scope: ', $scope)

        console.log('$rootScope: ', $rootScope)
    }
}

export default {
    bindings,
    template,
    controller: SampleController,
};
