pragma solidity ^0.4.24;
import './SafeMath.sol';

contract ERC20 {
  using SafeMath for uint256;
  uint public totalSupply;
  function balanceOf(address who) constant returns (uint);
  function allowance(address owner, address spender) constant returns (uint);
  function transfer(address to, uint value) returns (bool ok);
  function transferFrom(address from, address to, uint value) returns (bool ok);
  function approve(address spender, uint value) returns (bool ok);
  function mintToken(address to, uint256 value) returns (uint256);
  function changeTransfer(bool allowed);
}


contract Sale {
    using SafeMath for uint256;
    
    uint256 public maxMintable;
    uint256 public totalMinted;
    uint public endBlock;
    uint public startBlock;
    uint public exchangeRate;
    bool public isFunding;
    ERC20 public Token;
    address public ETHWallet;
    uint256 public heldTotal;

    bool private configSet;
    address public creator;

    mapping (address => uint256) public heldTokens;
    mapping (address => uint) public heldTimeline;

    event Contribution(address from, uint256 amount);
    event ReleaseTokens(address from, uint256 amount);

    function Sale(address _wallet) {
        startBlock = block.number;
        maxMintable = 4000000000000000000000000; // 3 million max sellable (18 decimals)
        ETHWallet = _wallet;
        isFunding = true;
        creator = msg.sender;
        exchangeRate = 600;
    }

    // setup function to be ran only 1 time
    // setup token address
    // setup end Block number
    function setup(address token_address, uint end_block) {
        require(!configSet);
        Token = ERC20(token_address);
        endBlock = end_block;
        configSet = true;
    }

    function closeSale() external {
      require(msg.sender==creator);
      isFunding = false;
    }

    function () payable {
        require(msg.value>0);
        require(isFunding);
        require(block.number <= endBlock);
        uint256 amount = (msg.value/1000000000000000000) * exchangeRate;
        uint256 total = totalMinted + amount;
        require(total<=maxMintable);
        totalMinted += total;
        ETHWallet.transfer(msg.value);
        Token.mintToken(msg.sender, amount);
        emit Contribution(msg.sender, amount);
    }

    // CONTRIBUTE FUNCTION
    // converts ETH to TOKEN and sends new TOKEN to the sender
    function contribute() external payable {
        require(msg.value>0);
        require(isFunding);
        require(block.number <= endBlock);
        uint256 amount = (msg.value/1000000000000000000) * exchangeRate;
        uint256 total = totalMinted + amount;
        require(total<=maxMintable);
        totalMinted += total;
        ETHWallet.transfer(msg.value);
        Token.mintToken(msg.sender, amount);
        emit Contribution(msg.sender, amount);
    }

    // update the ETH/COIN rate
    function updateRate(uint256 rate) external {
        require(msg.sender==creator);
        require(isFunding);
        exchangeRate = rate;
    }
    // change creator address		
    function changeCreator(address _creator) external {		
	   require(msg.sender==creator);		
	   creator = _creator;		
	}

    // change transfer status for ERC20 token
    function changeTransferStats(bool _allowed) external {
        require(msg.sender==creator);
        Token.changeTransfer(_allowed);
    }
    

}
