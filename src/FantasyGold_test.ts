import "mocha"

import { assert } from "chai"

import { rpcURL, repoData } from "./test"
import { FantasyGold } from "./FantasyGold"
import { Contract } from "./Contract"

describe("FantasyGold", () => {
  const fantasygold = new FantasyGold(rpcURL, repoData)

  it("can instantiate a contract", () => {
    const contract = fantasygold.contract("test/contracts/Methods.sol")
    assert.instanceOf(contract, Contract)
  })

  it("throws an error if contract is not known", () => {
    // assertThrow
    assert.throw(() => {
      fantasygold.contract("test/contracts/Unknown.sol")
    })
  })
})
