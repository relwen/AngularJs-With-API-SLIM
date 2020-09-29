var routeApp = angular.module('allRoute', [
	'ngRoute',
	'routeCtrl'
]);

// Le nom d module c'est allRoute à integrer dans le index.htmk au niveay du ng-app="routeAll"

routeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	// route pour la page d'acceuil
		.when('/', {																							//CONNEXION
			templateUrl: 'views/pages/home.html',
			controller:'HomeCtrl'
			
		})
		.when('/home', {																						//CONNEXION
			templateUrl: 'views/pages/home.html',
			controller:'HomeCtrl'
			
		})
		.when('/produits', {																							//CONNEXION
			templateUrl: 'views/pages/produits.html',
			controller:'ProduitsCtrl'
			
		})
		.when('/details/:id/', {																							//CONNEXION
			templateUrl: 'views/pages/product_detail.html',
			controller:'DetailsCtrl'
			
		})

		.when('/categorie/:id/article', {																							//CONNEXION
			templateUrl: 'views/pages/catArticle.html',
			controller:'CatArticleCtrl'
			
		})


        .when('/categories', {																							//CONNEXION
            templateUrl: 'views/pages/categories.html',
            controller:'CategorieCtrl'
            
        })
        .when('/logout', {
			resolve: {
				deadResolve: function($location, user) {
					user.clearData();
					$location.path('/home');
					// $window.location.href = "#!/home";
				}
			},
			// controller:
		})
        .when('/login', {		

    		resolve: {
				check: function($location, user) {
					if(user.isUserLoggedIn()) {
						$location.path('/login');
						$scope.connect=true;
						// $window.location.href = "#!/profil";
					}
				},
			},																					//CONNEXION
            templateUrl: 'views/pages/login.html',
            controller:'LoginCtrl'
            
        })
        .when('/profil', {																							//CONNEXION
            resolve: {
				check: function($location, user) {
					if(!user.isUserLoggedIn()) {
						$location.path('/login');
						$scope.connect=true;
						// $window.location.href = "#!/login";
					}
				},
			},
            templateUrl: 'views/pages/profil.html',
            controller:'ProfilCtrl'
            
        })

        .when('/like/:id',{
        	controller:'LikeCtrl'
        })

		.otherwise({
			redirectTo:'/home'
		});
	}
]);
