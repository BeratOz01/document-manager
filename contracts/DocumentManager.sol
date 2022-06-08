//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Import console.sol for log messages and debug contract
import "hardhat/console.sol";

// Ownable Contract
import "@openzeppelin/contracts/access/Ownable.sol";


contract DocumentManager is Ownable {

    /**
     *  @notice Mapping of document hash to document owner
     *  @dev Hash is the SHA256 hash of the :
        *  @dev Document Name (string)
        *  @dev Document Type (PDF, PNG , TXT) in string format
        *  @dev IPFS hash of the document (string)
        *  @dev Document Owner (address)
        *  @dev Timestamp of the document (uint256)
     */
    mapping(bytes32 => address) private _owners;

    /**
     *  @notice Mapping of address to total amount of documents owned by that address
     *  @dev User Address (address)
     *  @dev Total amount of documents owned by that address (uint256)
     */
    mapping(address => uint256) private _balances;


    /**
      * @notice Nested mappings for see document details
      * @dev Document Hash (bytes32)
      * @dev User address (address)
      * @dev Can access (bool)
     */
    mapping(bytes32 => mapping(address => bool)) private _access;

    /**
     * @dev Mapping for document access from user to document
     * @dev Document Hash (bytes32)
     * @dev User addresses (address[])
    */
    mapping(bytes32 => address[]) private _accessFrom;




    // Constructor
    constructor() Ownable() {
    }


    /**
     * @dev See {IERC721-balanceOf}.
     * @param user The address of the token owner.
     * @return The amount of tokens owned by the given address.
    */
    function balanceOf(address user) public view returns (uint256) {
        require(user != address(0) , "Address zero can not be valid owner");
        return _balances[user];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     * @param hash The hash of the token.
     * @return The address of the token owner.
    */
    function ownerOf(bytes32 hash) public view returns (address) {
        require(hash != bytes32(0) , "Hash zero can not be valid hash");
        require(_owners[hash] != address(0) , "Hash zero can not be valid hash");
        return _owners[hash];
    }

    /**
     * @dev Give view access to a user to a document
     * @param hash The hash of the token.
    */
    function approve(address to, bytes32 hash) public {
        address owner_ = ownerOf(hash);
        require(to != owner_ , "Approval to current owner is not allowed");
        require(_msgSender() == owner_ , "Only owner can approve");

        _access[hash][to] = true;
        _accessFrom[hash].push(to);
    }

    /**
     * @dev View function to check if a user has access to a document
     * @param hash The hash of the token.
    */
    function canAccess(bytes32 hash, address user) public view returns (bool) {
        require(hash != bytes32(0) , "Hash zero can not be valid hash");
        require(_owners[hash] != address(0) , "Hash zero can not be valid hash");
        return _access[hash][user];
    }

    /**
     * @dev Create function for creating a new document
     * @param hash The hash of the token.
     * @dev Currently there is a different flow to create a new document. This is to be changed in future.
     * @dev In ERC721 standard, the NFT metadata is public information and can be accessed by anyone.
     * @dev In this case, the metadata is private information and can be accessed by the owner and users who is allowed by the owner.
     * @dev So we need to keep this document information private.
     * @dev User who is want to create a new document need to log-in from our website with his/her metamask account. After authentication, user can send transaction from website to create a new document.
     * @dev In front-end, client application will hash the document name, document type and IPFS hash. Then, the client application will send the hash to the contract.
     * @dev The contract will store the hash and the user address but not the document name, document type and IPFS hash.
     * @dev These private information will be stored in our backend centralized database.
    */
    function mint(bytes32 hash) public {
        require(_msgSender() == address(0) , "Only owner can mint");
        require(hash != bytes32(0) , "Hash zero can not be valid hash");
        require(_owners[hash] == address(0) , "Hash already exists");

        _owners[hash] = _msgSender();
        _balances[_msgSender()]++;
        _access[hash][_msgSender()] = true;
        _accessFrom[hash].push(_msgSender());
    }

}