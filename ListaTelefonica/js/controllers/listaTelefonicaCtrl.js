angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatos, operadoras, serialGenerator, $timeout) {
	
	$scope.app = "Lista telefonica";
	$scope.contatos = contatos.data;
	$scope.operadoras = operadoras.data;

	var init = function() {
		calcularImpostos($scope.contatos);
		generateSerial($scope.contatos);
	};

	var calcularImpostos = function(contatos) {		
		contatos.forEach(function(contato) {			
			contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
		});
	};

	var calcularImposto = function(preco) {
		var imposto = 1.2;
		return preco * imposto;
	};
	
	var generateSerial = function(contatos) {
		contatos.forEach(function(contato) {
			contato.serial = serialGenerator.generate();
		});
	};	
	
	$scope.apagarContatos = function(contatos) {
		$scope.contatos = contatos.filter(function(contato) {
			if (!contato.selecionado) return contato;
		});
		$scope.verificarContatoSelecionado($scope.contatos);
	};
	
	$scope.verificarContatoSelecionado = function(contatos) {	
		$timeout(function() {
			$scope.hasContatoSelecionado = contatos.some(function(contato) {
				return contato.selecionado;
			});
		}, 200);
	};

	$scope.ordenarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	init();	
});