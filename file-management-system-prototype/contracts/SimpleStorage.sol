// // SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {

  struct File{
      string name;
      string ipfsHash;
  }
  File[] public files;
  File[] public dummy;
  bool public isGranted = false;

  address public user = 0xcC65489E408640587AAB88c0ec6dD769B6Da9fd7;
  address public uploadAuthority = 0x4251DE2036bFb27D901B94a88916E5CFe8A7bc19;
  address public accessAuthority = 0x93bDac6D6d6f45D70d0659E0b4ad61BF0a2E12CA;

  function set(string memory name, string memory hash) public {
    require(msg.sender==uploadAuthority);
    File memory newFile = File({
        name: name,
        ipfsHash: hash
    });
    files.push(newFile);
  }

  function getForAuthority() public view returns(File[] memory){
    if(msg.sender == accessAuthority && isGranted)
      return files;
    else
      return dummy;
  }

  function get() public view returns (File[] memory) {

    if(msg.sender == user)
      return files;

    else 
      return dummy;
    
  }

  function grant() public {
      require(msg.sender == user);
      isGranted = true;
  }

    function revoke() public {
      require(msg.sender == user);
      isGranted = false;
  }
}
