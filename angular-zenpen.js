/* angular-zenpen.js / v0.1.0 / (c) 2014 Oleg Meleshko <qu1ze34@gmail.com> / MIT Licence */

(function () {
	'use strict';

	angular.module('angularZenpen', [])   
		.directive('zEditor', ['$rootScope', '$timeout', '$window', function ($rootScope, $timeout, $window) {
      
      var baseUrl = '/bower_components/'
        , template = '<div class="{{zId}} section yin">' + 
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
        template : template,
        scope : {
          ngModel : '=',
          baseUrl : '@',
          zId : '@'
        },
        link : function(scope, element, attrs) {
          scope.baseUrl = scope.baseUrl || baseUrl;          
          
          if ($window.zeditor) {
            $timeout(function() {
              new $window.zeditor({
                wrapperField : document.querySelector('.' + scope.zId),
                onKeyUp : function(html) {                
                  scope.ngModel = html;
                  $rootScope.safeApply();                
                }
              });  
            }, 0);
          }
                   
        }
      };
		}]);

})();
