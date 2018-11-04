
pragma solidity ^0.4.23;

contract setget{
    
    string name;
    
    function set(string n) public{
        name = n;
    }
    function get() public view returns(string){
        return name;
    }
    
}
