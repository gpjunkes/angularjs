angular.module("listaTelefonica").config(function($locationProvider) {
	$locationProvider.hashPrefix('');
	$locationProvider.html5Mode({ enabled: false, requireBase: true });
});

angular.module("listaTelefonica").config(function($routeProvider) {
	$routeProvider.when("/contatos", {
		templateUrl: "view/contatos.html",
		controller: "listaTelefonicaCtrl",
		resolve: {
			contatos: function(contatosAPI) {
				return contatosAPI.getContatos();
			},
			operadoras: function(operadorasAPI) {
				return operadorasAPI.getOperadoras();
			}
		}
	});

	$routeProvider.when("/novoContato", {
		templateUrl: "view/novocontato.html",
		controller: "novoContatoCtrl",
		resolve: {
			operadoras: function(operadorasAPI) {
				return operadorasAPI.getOperadoras();
			}
		}
	});

	$routeProvider.when("/detalhesContato/:id", {
		templateUrl: "view/detalhesContato.html",
		controller: "detalhesContatoCtrl",	
		resolve: {
			contato: function(contatosAPI, $route) {
				return contatosAPI.getContato($route.current.params.id);
			}
		}	
	});

	$routeProvider.when("/error", {
		templateUrl: "view/error.html"			
	});

	$routeProvider.otherwise({redirectTo: "/contatos"});
});