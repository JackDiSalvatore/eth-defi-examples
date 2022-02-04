const BN = require("bn.js");

const IERC20 = artifacts.require("IERC20");
const TestUniswapV2 = artifacts.require("TestUniswapV2");

contract("TestUniswapV2", (accounts) => {
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0x2fEb1512183545f48f6b9C5b4EbfCaF49CfCa6F3";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

    const WHALE = DAI_WHALE;
    const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN(1000000));  // 1,000,000 DAI
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAI;
    const TOKEN_OUT = WBTC;
    const TO = accounts[0];

    it("should swap", async () => {
        const tokenIn = await IERC20.at(TOKEN_IN);
        const tokenOut = await IERC20.at(TOKEN_OUT);
        const testUniswap = await TestUniswapV2.new();

        await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });

        await testUniswap.swap(
            tokenIn.address,
            tokenOut.address,
            AMOUNT_IN,
            AMOUNT_OUT_MIN,
            TO,
            {
                from: WHALE,
            }
        );

        console.log(`out ${await tokenOut.balanceOf(TO)}`);
        // WETH has 8 decimal places, so the result would be
        /// balanceOf() / 10 ** 8
    })
});