// const BN = require("bn.js");
// const { sendEther, pow } = require("./util");
// const { WETH, DAI, WETH_WHALE, DAI_WHALE } = require("./config");

const IERC20 = artifacts.require("IERC20");
const TestUniswapV2Liquidity = artifacts.require("TestUniswapV2Liquidity");

contract("TestUniswapV2Liquidity", (accounts) => {
    const CALLER = accounts[0];


    let contract;
    let tokenA;
    let tokenB;

    beforeEach(async() => {
        // tokenA = await IERC20.at(TOKEN_A);
    })
});