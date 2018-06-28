# Ethereum ICO Crowdsale Contract  [![Build Status](https://travis-ci.org/hunterlong/ethereum-ico-contract.svg?branch=master)](https://travis-ci.org/hunterlong/ethereum-ico-contract)

This is a basic example of a crowdsale with a brand new ERC20 token. First deploy the Sale contract, and then the ERC20 token contract. The ERC20 contract will require the Sale Contract etheruem address.

## Contract Details
- Creates/Mints 5 million Tokens and holds them inside contract.
- ERC20 and Sale Contract both reference eachother
- Converts payable ETH to TOKEN's directly to user
- ETH payed to contract is forwarded to a different wallet (holds ICO funds)
- Updateable ETH/TOKEN rate
- Ability to turn on/off transfer of coins. (via sale contract)
- Crowdsale ends on a specific block number
- Token contrbutions will be removed from the Mint and transfered to the purchaser. 

# Deploy Instructions

1. You must deploy the Sale contract first. **Be sure to change the token sale details in contract**. Include a wallet address for ETH to be sent to for each contribution. Example: `Sale("0x004F3E7fFA2F06EA78e14ED2B13E87d710e8013F")` creating contract [0x7248ecef2785dcc7f68ae99b76f7adb1391e72fc](https://ropsten.etherscan.io/address/0x7248ecef2785dcc7f68ae99b76f7adb1391e72fc)

2. Once you have the Sale contract, deploy the Token contract. **Be sure to change the token details** and `createTokens` intial minted amount. When you deploy the Token contract, you must include the Sale contract address when you deploy the contract. Example: `Token("0x7248ecef2785dcc7f68ae99b76f7adb1391e72fc")` creating token contract [0x49c29316db536e17169996843f45d404b919a5de](https://ropsten.etherscan.io/token/https://ropsten.etherscan.io/address/0x49c29316db536e17169996843f45d404b919a5de)

3. Now you can finalize the process by running the `setup` function to the Sale contract. The setup function requires the token contract address and then ending block number of when the ICO should end. The owner of the contract can also end at any time. Example: `setup("0x49c29316db536e17169996843f45d404b919a5de", 7000000)`
My ICO sale will end and expire on block #7000000.

4. **Your ICO has begun!** You can now send ETH to the Sale contract address to receive your new tokens! I sent 1 ETH with data: `0xd7bb99ba` to my Sale contract address. The user must send ETH or the transaction will fail! Example: 1 ETH  This transaction sent 1 ETH to the ETH wallet address and also sent me 600 A20T tokens. 

5. Once you received your required funds for the ICO you can close it at anytime with the `closeSale` function. Example: `closeSale()` creating transaction [0xae7608515185bfeb3aa185890edb733bc5c0031f392ece5366179463bd27e430](https://ropsten.etherscan.io/tx/0xae7608515185bfeb3aa185890edb733bc5c0031f392ece5366179463bd27e430). The ICO Sale is over!

This ICO-sale contract will allow you to change owners, change token rate per ETH.

### Crowdsale Contract
`function contribute() external payable` is the function for the purchaser to mint new tokens.

### ERC20 Additions
The ERC20 contract has a couple additions to be reviewed by you. When the token contract is deployed, it will require the Sale Contract address and will be set 1 and only 1 time. If you set an incorrect address when you deploy the ERC20 you'll have to re-deploy the sale and ERC20 again. This is for security, 1 time set functions.

#### Minting Tokens
Minting Tokens call comes from the Sale contract, when the ERC20 is deployed it will force the Sale contract.
`function mintToken(address to, uint256 amount) external returns (bool success);`

Change "transfer" method from the Sale Contract. 
`function changeTransfer(bool allowed);
