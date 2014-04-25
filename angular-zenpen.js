/* angular-zenpen.js / v0.1.0 / (c) 2014 Oleg Meleshko <qu1ze34@gmail.com> / MIT Licence */

(function () {
	'use strict';

	angular.module('angularZenpen', ['angular.css.injector'])   
		.directive('zEditor', ['$rootScope', '$timeout', '$window', 'cssInjector', function ($rootScope, $timeout, $window, cssInjector) {
      
      var baseUrl = '/bower_components/'
        , template = '<div class="section yin">' + 
                      '<div class="ui">' +
                        '<div class="wrapper">' +
                          '<div class="top editing">' + 
                            '<button class="color-flip useicons" title="Invert colors">&#xe002;</button>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +	
                      '<div class="text-options">' +
                        '<div class="options">' +
                          '<span class="no-overflow">' +
                            '<span class="lengthen ui-inputs">' +
                              '<button class="url useicons">&#xe005;</button>' +
                              '<input class="url-input" type="text" placeholder="Type or Paste URL here"/>' +
                              '<button class="bold">b</button>' +
                              '<button class="italic">i</button>' +
                              '<button class="quote">&rdquo;</button>' +
                            '</span>' +
                          '</span>' +
                        '</div>' +
                      '</div>' +
                      '<article contenteditable="true" class="content"></article>' +
                      '<div class="word-counter">' +
                        '<span class="progress complete"></span>' +
                      '</div>' +
                    '</div>';
      
      return {
        restrict : 'ACE',
        replace : true,
        template : template,
        scope : {
          ngModel : '=',
          baseUrl : '@'
        },
        link : function(scope, element, attrs) {
          scope.baseUrl = scope.baseUrl || baseUrl;
          
          cssInjector.add('http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic');
          cssInjector.add(scope.baseUrl + 'zenpen/css/style.css');
          cssInjector.add(scope.baseUrl + 'zenpen/css/fonts.css');
      
          if ($window.zeditor) {
            $window.zeditor({
              onKeyUp : function(html) {                
                scope.ngModel = html;
                $rootScope.safeApply();                
              }
            });              
          }
          
          scope.$on('$destroy', function(){
            cssInjector.removeAll();
          });
        }
      };
		}]);

})();
