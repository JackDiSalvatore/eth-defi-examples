# README

from: https://www.youtube.com/playlist?list=PLO5VPQH6OWdX-Rh7RonjZhOd9pb9zOnHW

.env

```sh
WE3_INFURA_PROJECT_ID="d0ec29a0058f463ca96ee64c20d1a256"
DAI_WHALE="0x2fEb1512183545f48f6b9C5b4EbfCaF49CfCa6F3"
```

### Test

```bash
source .env

# using infura.io
ganache-cli \
--fork https://mainnet.infura.io/v3/$WE3_INFURA_PROJECT_ID \
--unlock $DAI_WHALE \
--networkId 999
```

In another terminal

```bash
truffle test --network mainnet_fork test/test-uniswapv2.js
```
