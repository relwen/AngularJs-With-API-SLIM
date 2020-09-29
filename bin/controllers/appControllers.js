/*
 *  Définition des contrôleurs
 */
var routeCtrl = angular.module('routeCtrl', []);

// Contrôleur de la page d'accueil




// Home Controlleur

routeCtrl.controller('HomeCtrl', ['$scope','$http','user',function ($scope,$http,user) {
		
		// $scope.title = 'Produits';
		// $scope.categories = true;

		$scope.loader=true;

		if(user.isUserLoggedIn()){
			 	$scope.connect=true;
			 }
			 else
			 	$scope.connect=false;

		$http({
			  method: 'GET',
			  url: 'http://lilas.webvision-sarl.com/recents',
			  headers: { 'Content-type': 'application/json' }
			  
			 }).then(function successCallback(response) {
			  // Store response data
				$scope.loader=false;
			  $scope.recents = response.data;
			 }, function errorCallback(response) {
			 	// console.log();
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  })




			 

}]);


// Controlleur pour les LIKE

routeCtrl.controller('LikeCtrl', ['$scope','$http','user','$routeParams',function ($scope,$http,user,$routeParams) {
		

		var art = $routeParams.art;



		$scope.likes=function(){


			// if(!user.isUserLoggedIn()){
			//  }

			if(!user.isUserLoggedIn()){


			 	$scope.connect=true;

					$http({
						  method: 'POST',
						  url: 'http://lilas.webvision-sarl.com/likes/'+art,
						  headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
						

							data:'userID='+id
						
						  
						 }).then(function successCallback(response) {
						  // Store response data
						  $scope.recents = response.data;
						 }, function errorCallback(response) {
						 	// console.log();
						    // called asynchronously if an error occurs
						    // or server returns response with an error status.
						  });

			 
			 }
		};

		

}]);

// LoginController

routeCtrl.controller('LoginCtrl', ['$scope','$window','$location','$http','user','id', function ($scope,$window,$location,$http,user,id) {
		
		$scope.titre = 'Compte';

		$scope.submit=function(){

			var uname=$scope.userPhone;
			var password=$scope.password;

			$scope.loader=true;
		
			$http({
				url: 'http://lilas.webvision-sarl.com/login',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			

				data:'userPhone='+uname+'&password='+password
			
			}).then(function(response){

				if(response.data.status== 'exist') {
					// alert(response.data.user.name);
					// user.userLoggedIn();
					user.saveData(response.data);
					$scope.connect=true;
					// user.setName(response.data.user.name);
					$window.location.href = "#!/profil";

				} else {
					$scope.loader=false;
					alert('Cet utilisateur n\'existe pas ');
				}

			});

		};

			
		
}]);
// SERVICE CONTROLLEUR

routeCtrl.service('user', function() {
	var username;
	var surname;
	var email;
	var loggedin = false;
	var id;

	this.getName = function() {
		return username;
	};

	this.getSurname=function(){
		return surname;
	};

	this.getEmail=function(){
		return email;
	};

	this.setID = function(userID) {
		id = userID;
	};
	this.getID = function() {
		return id;
	};

	this.isUserLoggedIn = function() {
		if(!!localStorage.getItem('login')) {
			loggedin = true;
			var data = JSON.parse(localStorage.getItem('login'));
			username = data.username.name;
			id = data.username.id;
			// surname=data.username.
			// id = data.id;
		}
		return loggedin;
	};

	this.saveData = function(data) {
		username = data.user;
		id = data.user;
		loggedin = true;
		localStorage.setItem('login', JSON.stringify({
			username: username,
			id: id
		}));
	};

	this.clearData = function() {
		localStorage.removeItem('login');
		username = "";
		id = "";
		loggedin = false;
	}
})


routeCtrl.controller('ProfilCtrl',['$scope','user',function($scope,user){

	$scope.user = user.getName();
	$scope.id = user.getID();


}]);


routeCtrl.controller('ProduitsCtrl', ['$scope','$http',function ($scope,$http) {
		
		$scope.title = 'Produits';
		// $scope.categories = true;

		$http({
			  method: 'GET',
			  url: 'http://lilas.webvision-sarl.com/articles',
			  headers: { 'Content-type': 'application/json' }
			  
			 }).then(function successCallback(response) {
			  // Store response data
			  $scope.articles = response.data;
			 }, function errorCallback(response) {
			 	// console.log();
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });

}]);

// Details du Produit
routeCtrl.controller('DetailsCtrl', ['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
		
		$scope.title = 'Détails';
		// $scope.categories = true;

		var id = $routeParams.id;

		$http({
			  method: 'GET',
			  url: 'http://lilas.webvision-sarl.com/articles/'+id,
			  headers: { 'Content-type': 'application/json' }
			  
			 }).then(function successCallback(response) {
			  // Store response data
			  $scope.articles = response.data;
			  console.log(response.data);
			 }, function errorCallback(response) {
			 	// console.log();
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });

}]);


// Details du Produit
routeCtrl.controller('CatArticleCtrl', ['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
		
		var id = $routeParams.id;
		var categorie = $routeParams.cat;


		$scope.title = categorie;


		$http({
			  method: 'GET',
			  url: 'http://lilas.webvision-sarl.com/categorie/'+id+'/article',
			  headers: { 'Content-type': 'application/json' }
			  
			 }).then(function successCallback(response) {
			  // Store response data
			  $scope.articlesCat = response.data;

			  $scope.title = response.data[0][0].libelle_categorie;
			  console.log(response.data);

			 }, function errorCallback(response) {
			 	// console.log();
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });

}]);



routeCtrl.controller('CategorieCtrl', ['$scope','$http',function ($scope,$http) {
		
		$scope.title = 'Catégories';
		// $scope.categories = true;

		$http({
			  method: 'GET',
			  url: 'http://lilas.webvision-sarl.com/categories',
			  headers: { 'Content-type': 'application/json' }
			  
			 }).then(function successCallback(response) {
			  // Store response data
			  $scope.categories = response.data;
			 }, function errorCallback(response) {
			 	// console.log();
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });

}]);



// TOUTES LES FACTORY


routeCtrl.factory('LoginFactory', function($http, $q){
			
	var factory = {


		url : "http://lilas.webvision-sarl.com/users",

		user : false,

		toLogin : function(dataToPost){

			var deffered = $q.defer();

			$http.post(factory.url, dataToPost)
					.success(function(response){
						
						factory.user = response;
						deffered.resolve(response);
					})
					.error(function(data){

						deffered.reject(data);

					});

			return deffered.promise;

		}

	}

	return factory;

});



