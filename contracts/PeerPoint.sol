pragma solidity ^0.4.23;

contract ERC20Interface {
    function totalSupply() public view returns (uint256 totalSupply_);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b > 0);
        c = a / b;
    }
}


contract PeerPoint is ERC20Interface {
    using SafeMath for uint256;
    mapping (address => uint256) public balances;
    mapping (address => uint256) public points;
    mapping (address => uint256) public sent;
    uint256 public redeemableAmount;

    address public owner;
    string public symbol;
    string public name;

    event SentPoint(address indexed _from, address indexed _to, uint256 _value, bytes32 _message);

    constructor () public {
        symbol = "LPBP";
        name = "Loom Peer Bonus Point";
        redeemableAmount = 400;
        owner = msg.sender;
    }

    function totalSupply() public view returns (uint256) {}

    function sentPoints(address _owner) public view returns (uint256) {
        return sent[_owner];
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function pointOf(address _owner) public view returns (uint256) {
        return points[_owner];
    }

    function sendPoint(address _to, uint256 _value, bytes32 _message)
        public
        returns (bool success)
    {
        require(_to != address(0));
        require(_to != msg.sender);
        require(_value <= points[msg.sender]);
        points[msg.sender] = points[msg.sender].sub(_value);
        sent[msg.sender] = sent[msg.sender].add(_value);
        balances[_to] = balances[_to].add(_value);
        emit SentPoint(msg.sender, _to, _value, _message);
        return true;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        _to;
        _value;
        return false;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        _from;
        _to;
        _value;
        return false;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        _spender;
        _value;
        return false;
    }
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        _owner;
        _spender;
        return 0;
    }

    function redeem() public {
        points[msg.sender] = redeemableAmount;
    }
}
