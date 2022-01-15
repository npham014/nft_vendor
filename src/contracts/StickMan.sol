pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StickMan is ERC721 {
    

    constructor() ERC721("StickMan","STKM") {

    }

    function mint(string memory _dna) public { //gonna let whoever wants one have a stickman, this could be restricted only to a minter address though

    }
    struct Stick {
        uint id;
        uint DNA;
    }

}