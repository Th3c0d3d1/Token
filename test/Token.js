const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('Token', () => {
    // Declare the variable to store in the deployed contract
    // Make the token variable scope accessible to every function in describe
    let token

    beforeEach(async () => {
        // Fetch the contract factory
        const Token = await ethers.getContractFactory('Token')
        // Assign the value of the deployed contract to the token variable
        token = await Token.deploy()
    })

    it('has correct name', async () => {
        // Read token name & Check the result
        expect(await token.name()).to.equal('Nex Gen')
    })

    it('has correct symbol', async () => {
        // Read token name & Check the result
        expect(await token.symbol()).to.equal('NXG')
    })
})
