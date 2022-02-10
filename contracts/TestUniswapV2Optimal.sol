// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IUniswapV2.sol";

contract TestUniswapV2Optimal {
    using SafeMath for uint;

    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    // import "@uniswap/lib/contracts/libraries/Babylonian.sol";
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
        z = y;
        uint x = y / 2 + 1;
        while (x < z) {
            z = x;
            x = (y / x + x) / 2;
        }
        } else if (y != 0) {
        z = 1;
        }
        // else z = 0 (default value)
    }

    /*
    s = optimal swap amount
    r = amount of reserve for token a
    a = amount of token a the user currently has (not added to reserve yet)
    f = swap fee percent
    s = (sqrt(((2 - f)r)^2 + 4(1 - f)ar) - (2 - f)r) / (2(1 - f))
    */
    function getSwapAmount(uint r, uint a) public pure returns (uint) {
        return (sqrt(r.mul(r.mul(3988009) + a.mul(3988000))).sub(r.mul(1997))) / 1994;
    }

    function getPair(address _tokenA, address _tokenB) external view returns (address) {
        return IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);
    }

    function optimalSwap(address _tokenA, address _tokenB, uint _amountA) external {
        // https://www.youtube.com/watch?v=1ivHqueaTVo&list=PLO5VPQH6OWdX-Rh7RonjZhOd9pb9zOnHW&index=5
        require(_tokenA == WETH || _tokenB == WETH, "!WETH");

        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);

        address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);
        (uint reserve0, uint reserve1, ) = IUniswapV2Pair(pair).getReserves();

        // uint swapAmount;
        // if(IUniswapV2Pair(pair).token0() == _tokenA) {
        //     // swap from token0 to token1
        //     swapAmount = getSwapAmount(reserve0, _amountA);
        // } else {
        //     // swap from token1 to token0
        //     swapAmount = getSwapAmount(reserve1, _amountA);
        // }

        // _swap(_tokenA, _tokenB, swapAmount);
        // _addLiquidity(_tokenA, _tokenB);
    }

    function _swap(address _from, address _to, uint _amount) internal {

    }

    function _addLiquidity(address _tokenA, address tokenB) internal {

    }
}