The FGC JavaScript library for Smart Contract development.

See [documentation](https://fantasygoldproject.github.io/fantasygoldjs-doc/).

See [companion tutorial](https://github.com/fantasygoldproject/fantasygoldbook/blob/master/en/part2/erc20-js.md).

# Install

```
npm install fantasygoldjs
```

This is a sample code snippet that transfer FGC20 tokens:

```js
import { FantasyGoldRPC } from "fantasygoldjs"

const repoData = require("./solar.json")
const fantasygold = new FantasyGold("http://fantasygold:test@localhost:57810", repoData)

const myToken = fantasygold.contract(
  "zeppelin-solidity/contracts/token/CappedToken.sol",
)

async function transfer(fromAddr, toAddr, amount) {
  const tx = await myToken.send("transfer", [toAddr, amount], {
    senderAddress: fromAddr,
  })

  console.log("transfer tx:", tx.txid)
  console.log(tx)

  await tx.confirm(3)
  console.log("transfer confirmed")
}
```

The [full source code](https://github.com/fantasygold/fantasygoldbook-mytoken-fantasygoldjs-cli).

> This example uses async/await (supported natively by Node 8+).

# Running Tests

```
docker run -it --rm \
  --name fantasygoldjs \
  -v `pwd`:/dapp \
  -p 57810:57810 \
  fantasygold/fantasygoldportal
```

Configure FGC_RPC for deployment tool:

Enter into container:

```
docker exec -it fantasygoldjs sh
```

Generate initial blocks:

```
fcli importprivkey cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk
fcli generatetoaddress 600 fUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW

fcli getbalance

2000000.00000000
```

Deploy test contracts:

```
export FGC_RPC=http://fantasygold:test@localhost:57810
export FGC_SENDER=fUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW

sh deploy-test-contracts.sh
```

Build and run tests:

```
npm build
npm run test
```
