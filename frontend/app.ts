import './sass/app.sass';

import * as angular from 'angular';

// import all components
import componentsModuleName from './components/components';

let app = angular.module('app', [
    'ngMaterial',
    componentsModuleName
]);

angular.bootstrap(document, ['app'], {
    strictDi: true
});
