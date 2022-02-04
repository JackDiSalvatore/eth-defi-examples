// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// https://uniswap.org/docs/v2/smart-contracts

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}