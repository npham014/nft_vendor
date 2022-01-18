pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract StickMan is ERC721Enumerable {

    uint[] public StickMans;
    mapping(uint => bool) _stickExists;

    constructor() ERC721("StickMan","STKM") {
        
    }

    function mint(uint _dna) public { //gonna let whoever wants one have a stickman, this could be restricted only to a minter address though
        require(!_stickExists[_dna]);
        StickMans.push(_dna);
        uint _id = StickMans.length - 1;
        _mint(msg.sender, _id);
        _stickExists[_dna] = true;
    }

}