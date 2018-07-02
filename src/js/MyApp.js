App = {
    web3Provider: null,
    contracts: {},
  
    init: function() {
      return App.initWeb3();
    },
  
    initWeb3: function() {
      // Initialize web3 and set the provider to the injected provider.
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
        web3 = new Web3(App.web3Provider);
      }
  
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON('Sale.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract.
        var SaleArtifact = data;
        App.contracts.Sale = TruffleContract(SaleArtifact);
  
        // Set the provider for our contract.
        App.contracts.Sale.setProvider(App.web3Provider);
  
        return App.getHeldCoin();
      });
    },
  

  
    getHeldCoin: function() {
      console.log('Getting held coins...');
  
      var SaleInstance;
  
      var account = web3.eth.defaultAccount;
      console.log("account", account);
      
  
        App.contracts.Sale.deployed().then(function(instance) {
        SaleInstance = instance;
        console.log("SaleInstance", SaleInstance);
  
          return SaleInstance.getHeldCoin(account);
        }).then(function(result) {
          balance = result.c[0];
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    contribute: function() {
      console.log(contributing);

    
    }
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  