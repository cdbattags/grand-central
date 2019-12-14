import template from './sample.template.html';

const bindings = {
    title: '<'
};

class SampleController {
    constructor(
        $scope,
        $rootScope
    ) {
        console.log('$rootScope: ', $rootScope)
        console.log('$scope: ', $scope)
        console.log('this ', this)
    }

    $onInit() {
        this.$ctrl = {}
        this.$ctrl.title = 'huh'
        this.title = 'huh'
    }
}

export default {
    bindings,
    // templateUrl: 'sample.template.html',
    template: template,
    // controllerAs: '$ctrl',
    controller: SampleController,
};
