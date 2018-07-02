var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "cCSn0LOLZ8M1LgcyDnjv";
var mnemonic = "rally siren fine future cup limit lazy champion joy brand someone guess";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/cCSn0LOLZ8M1LgcyDnjv"),
      network_id: 3
    }
  }
};