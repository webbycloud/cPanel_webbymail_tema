/**
 * base/unprotected/controllers/puzzleController.js   Copyright(c) 2020 cPanel, L.L.C.
 *                                                              All rights reserved.
 * copyright@cpanel.net                                            http://cpanel.net
 * This code is subject to the cPanel license. Unauthorized copying is prohibited.
 */

/* global define: false */

define(
    'app/controllers/puzzleController',[
        "angular",
        "lodash",
        "cjt/util/locale",
        "cjt/validator/email-validator",
        "cjt/directives/validationItemDirective",
        "cjt/directives/validationContainerDirective"
    ],
    function(angular, _, LOCALE) {

        // Retrieve the current application
        var app = angular.module("App");

        // Setup the controller
        var controller = app.controller(
            "puzzleController", [
                function() {
                    var vm = this;

                    vm.focus = function() {
                        vm.isFocused = true;
                        var inputElem = document.getElementById("puzzle-guess-input");
                        inputElem.focus();
                    };

                    vm.blur = function () {
                        vm.isFocused = false;
                    };

                    return vm;
                }
            ]
        );

        return controller;
    }
);

/**
 * base/unprotected/controllers/setPasswordController.js   Copyright(c) 2020 cPanel, L.L.C.
 *                                                                   All rights reserved.
 * copyright@cpanel.net                                                 http://cpanel.net
 * This code is subject to the cPanel license. Unauthorized copying is prohibited.
 */

/* global define: false */

define(
    'app/controllers/setPasswordController',[
        "angular",
        "lodash",
        "cjt/util/locale",
        "uiBootstrap",
        "cjt/directives/passwordFieldDirective"
    ],
    function(angular, _, LOCALE) {

        // Retrieve the current application
        var app = angular.module("App");

        // Setup the controller
        var controller = app.controller(
            "setPasswordController", [
                "$scope",
                function($scope) {

                    $scope.password = "";
                    $scope.confirmPassword = "";

                }
            ]
        );

        return controller;
    }
);

/**
 * base/unprotected/resetpass.js                      Copyright 2022 cPanel, L.L.C.
 *                                                           All rights reserved.
 * copyright@cpanel.net                                         http://cpanel.net
 * This code is subject to the cPanel license. Unauthorized copying is prohibited
 */

/* global require: false, define: false */

define('app/invitation',[
    "angular",
    "cjt/core",
    "cjt/modules",
    "uiBootstrap"
],
function(angular, CJT) {
    "use strict";

    return function() {

        // First create the application
        angular.module("App", [
            "ngRoute",
            "ui.bootstrap",
            "cjt2.unprotected"
        ]);

        // Then load the application dependencies
        var app = require([

            // Application Modules
            "cjt/views/applicationController",
            "cjt/services/autoTopService",
            "app/controllers/puzzleController",
            "app/controllers/setPasswordController",
        ], function() {

            var app = angular.module("App");

            // routing
            app.config([
                "$compileProvider",
                function(
                    $compileProvider
                ) {

                    if (!CJT.config.debug) {
                        $compileProvider.debugInfoEnabled(false);
                    }
                }
            ]);

            app.run(["autoTopService", function(autoTopService) {
                autoTopService.initialize();
            }]);

            /**
             * Initialize the application
             * @return {ngModule} Main module.
             */
            app.init = function() {

                var appContent = angular.element("#content");

                if (appContent[0] !== null) {

                    // apply the app after requirejs loads everything
                    angular.bootstrap(appContent[0], ["App"]);
                }

                // Chaining
                return app;
            };

            // We can now run the bootstrap for the application
            app.init();

        });

        return app;
    };
});

