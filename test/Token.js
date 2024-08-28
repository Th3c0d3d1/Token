const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('Token', () => {
    it('has a name', async () => {
        // Fetch the contract factory
        const Token = await ethers.getContractFactory('Token')
        // Deploy the contract
        let token = await Token.deploy()
        // Read token name
        const name = await token.name()
        // Check the result
        expect(name).to.equal('My Token')
    })
})