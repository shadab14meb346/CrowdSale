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
      $.getJSON('Token.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract.
        var TokenArtifact = data;
        App.contracts.Token = TruffleContract(TokenArtifact);
  
        // Set the provider for our contract.
        App.contracts.Token.setProvider(App.web3Provider);

      
  
        return App.balanceOf();


      });
    },
  

  
    balanceOf: function() {
      console.log('Getting held coins...');
  
      var TokenInstance;
  
      var account = web3.eth.defaultAccount;
      console.log("account", account);

      var walletAddress = "0x3B5db17376ee6d9B5874862381a3e55077E57cCe";

      var balance1 = web3.eth.getBalance(walletAddress, function(err, res){
        
        // balance1 here for the wallet address 
        if(err){
          console.log(err);
        }
        else{
          console.log(res);
          balance1 = res.c[0];
          balance1 = balance1/10000;
          console.log("balance in ethers", balance1);
        }
      }); //Will give value in.

     
      
      
        App.contracts.Token.deployed().then(function(instance) {
        TokenInstance = instance;
        console.log("SaleInstance", TokenInstance);
  
          return TokenInstance.balanceOf(account);
        }).then(function(result) {
          console.log("result", result);
        
          balance = result.c[0];
          
          $("#test").text(balance);
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
  