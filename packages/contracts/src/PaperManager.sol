//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9; 

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//import "@openzeppelin/contracts/utils/Base64.sol";

import "hardhat/console.sol";
import "./Paper.sol";

error PaperManager__RegistrationFee(uint256 required, string message);
error PaperManager__SetRegistrationFee(string message);
error PaperManager__ItemId(string message);

contract PaperManager is ReentrancyGuard {
    event EvPaperItem(
        uint256 indexed itemId,
        address indexed nftContract,
        address owner,
        uint256 createAt,
        bool closed
    );

    using Counters for Counters.Counter;
    Counters.Counter private _paperItemIds;
    Counters.Counter private _itemsClosed;

    // 생성한 관리자 계정
    address payable private _owner;
    // Paper 등록 수수료
    uint256 private _regFree;

    struct PaperItem {
        uint256 itemId;
        address nftContract;
        //Paper paper;
        address payable owner;
        uint256 createAt;
        bool closed;
    }

    mapping(uint256 => PaperItem) private _paperItems;

    constructor() {
        _owner = payable(msg.sender);
        // 등록 수수료 설정 
        // todo MATIC 에서도 이 단위로 쓰나?
        _regFree = 0.001 ether; 
    }

    // 이걸 통해서 생성하지 않은 Paper 는 관리되지 않는다.
    // PaperManager 만 new 할 수 있으면 좋겠는데, 방법이 찾으면 있을 듯?
    function createPaperItem(string memory title,string memory name) public payable nonReentrant {
        if (msg.value < _regFree)
            revert PaperManager__RegistrationFee({
                required: _regFree,
                message: "you must pay registration fee."
            });

        _paperItemIds.increment();
        uint256 itemId = _paperItemIds.current();
        uint256 createAt = block.timestamp;

        // deploy paper contract 
        Paper newPaper = new Paper(title,name);

        address newContractAddr = address(newPaper);

        _paperItems[itemId] = PaperItem({
            itemId: itemId,
            nftContract: newContractAddr,
            //paper : newPaper,
            owner: payable(msg.sender),
            createAt: createAt,
            closed : false
        });

        emit EvPaperItem(
            itemId,
            newContractAddr,
            msg.sender,
            createAt,
            false
        );
    }

    function closePaper(address nftContract, uint256 itemId)
        public
        nonReentrant
    {
        _paperItems[itemId].closed = true;
        _itemsClosed.increment();
        emit EvPaperItem(
            itemId,
            nftContract,
            msg.sender,
            _paperItems[itemId].createAt,
            true
        );
    }

    function getPaperItems() public view returns (PaperItem[] memory) {
        uint256 itemsCount = _paperItemIds.current();
        uint256 unclosedItemsCount = itemsCount - _itemsClosed.current();
        PaperItem[] memory items = new PaperItem[](unclosedItemsCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemsCount; i++) {
            if (!_paperItems[i + 1].closed) {
                uint256 currentItemId = _paperItems[i + 1].itemId;
                PaperItem storage paperItem = _paperItems[currentItemId];
                items[currentIndex] = paperItem;
                currentIndex++;
            }
        }

        return items;
    }

    function getPaperItemsByOwner() public view returns (PaperItem[] memory) {
        uint256 totalItemsCount = _paperItemIds.current();
        uint256 itemCount = countOwnersPaperItems(totalItemsCount);
        uint256 currentIndex = 0;
        PaperItem[] memory items = new PaperItem[](itemCount);
        for (uint256 i = 0; i < totalItemsCount; i++) {
            if (_paperItems[i + 1].owner == msg.sender) {
                uint256 currentId = _paperItems[i + 1].itemId;
                PaperItem storage currentItem = _paperItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function countOwnersPaperItems(uint256 totalItemsCount)
        private
        view
        returns (uint256)
    {
        uint256 itemCount = 0;
        for (uint256 i = 0; i < totalItemsCount; i++) {
            if (_paperItems[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        return itemCount;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function getRegistrationFee() public view returns (uint256) {
        return _regFree;
    }

    function setRegistrationFee(uint256 _price) public {
        if (msg.sender != _owner)
            revert PaperManager__SetRegistrationFee({message: "Premission denied"});
        _regFree = _price;
    }

    function getPaperItemById(uint256 _id) public view returns (PaperItem memory) {
        if (_id < 1 && _id > _paperItemIds.current())
            revert PaperManager__ItemId({message: "Premission denied"});
        return _paperItems[_id];
    }

    function getTotalPaperItems() public view returns (uint256 total) {
        uint256 itemsCount = _paperItemIds.current();
        uint256 unclosedItemsCount = itemsCount - _itemsClosed.current();
        return unclosedItemsCount;
    }

    function fetchPaperItems(
        uint256 offset,
        uint256 limit,
        uint256 close
    )
        public
        view
        returns (
            PaperItem[] memory,
            uint256 nextOffset,
            uint256 totalClosed
        )
    {
        uint256 itemsCount = _paperItemIds.current();
        uint256 unclosedItemsCount = itemsCount - _itemsClosed.current();

        if (limit == 0) {
            limit = 1;
        }

        if (limit > unclosedItemsCount - offset) {
            limit = unclosedItemsCount - offset;
        }

        PaperItem[] memory items = new PaperItem[](limit);

        uint256 currentIndex = 0;
        uint256 index = 0;
        uint256 closed = 0;

        for (uint256 i = 0; i < itemsCount && currentIndex < limit; i++) {
            index = offset + i + close + 1;
            if (index <= itemsCount) {
                if (!_paperItems[index].closed) {
                    uint256 currentItemId = _paperItems[index].itemId;
                    PaperItem storage tempPaperItem = _paperItems[
                        currentItemId
                    ];
                    items[currentIndex] = tempPaperItem;
                    currentIndex++;
                } else {
                    closed++;
                }
            }
        }

        if ((offset + close + 1) > itemsCount) {
            closed = close;
        }

        return (items, offset + limit, closed);
    }

    function fetchPaperItemsByTime(uint256 time, uint256 limit)
        public
        view
        returns (PaperItem[] memory)
    {
        uint256 itemsCount = _paperItemIds.current();
        uint256 unclosedItemsCount = itemsCount - _itemsClosed.current();
        uint256 offset = unclosedItemsCount - 2;
        if (limit == 0) {
            limit = 1;
        }

        if (limit > unclosedItemsCount - offset) {
            limit = unclosedItemsCount - offset;
        }

        PaperItem[] memory items = new PaperItem[](limit);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemsCount && currentIndex < limit; i++) {
            if (!_paperItems[offset + i + 1].closed) {
                uint256 currentItemId = _paperItems[offset + i + 1].itemId;
                PaperItem storage tempPaperItem = _paperItems[currentItemId];
                if (
                    time == 0 ||
                    (tempPaperItem.createAt <= block.timestamp &&
                        tempPaperItem.createAt >= time)
                ) {
                    items[currentIndex] = tempPaperItem;
                    currentIndex++;
                }
            }
        }
        return items;
    }
    
}
