const BN = require("bn.js");
const { sendEther, pow } = require("./util");
const { WETH, DAI, WETH_WHALE, DAI_WHALE } = require("./config");

const IERC20 = artifacts.require("IERC20");
const TestUniswapV2Optimal = artifacts.require("TestUniswapV2Optimal");

contract("TestUniswapV2Optimal", (accounts) => {
    const WHALE = DAI_WHALE;
    const AMOUNT = pow(10, 18).mul(new BN(1000));   // 1,000 DAI

    let contract;
    let fromToken;
    let toToken;
    let pair;

    beforeEach(async() => {
        fromToken = await IERC20.at(DAI);
        toToken = await IERC20.at(WETH);

        contract = await TestUniswapV2Optimal.new();
        pair = await IERC20.at(await contract.getPair(fromToken.address, toToken.address));

        await sendEther(web3, accounts[0], WHALE, 1);
        fromToken.approve(contract.address, AMOUNT, { from: WHALE });
    });

    const snapshot = async () => {
        return {
            lp: await pair.balanceOf(contract.address),
            fromToken: await fromToken.balanceOf(contract.address),
            toToken: await toToken.balanceOf(contract.address)
        }
    }

    it("optimal swap: DAI -> WETH", async () => {
        // const before = await snapshot()
        await contract.optimalSwap(
            fromToken.address,
            toToken.address,
            AMOUNT,
            {
                from: WHALE
            }
        );

        const after = await snapshot();

        console.log("lp:", after.lp.toString());
        console.log("fromToken:", after.fromToken.toString());
        console.log("toToken:", after.toToken.toString());
        /*
        lp 93117251647135739454170
        from 2
        to 0
        */
    });
});