const { ethers } = require('hardhat')
const { expect } = require('chai')

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {
    // Declares the variable to store in the deployed contract & makes the token variable scope accessible to every function in describe
    let token

    beforeEach(async () => {
        // Fetch the contract factory
        const Token = await ethers.getContractFactory('Token')
        // Assign the value of the deployed contract to the token variable
        // State variable token is assigned the value of the deployed contract
        token = await Token.deploy('Nex Gen', 'NXG', 1000000)
    })

    it('has correct name', async () => {
        // Read token name & Check the result
        expect(await token.name()).to.equal('Nex Gen')
    })

    it('has correct symbol', async () => {
        // Read token symbol & Check the result
        expect(await token.symbol()).to.equal('NXG')
    })

    it('has correct decimals', async () => {
        // Read token decimals & Check the result
        expect(await token.decimals()).to.equal('18')
    })

    it('has correct total supply', async () => {
        // Read token total supply & Check the result
        expect(await token.totalSupply()).to.equal(tokens(1000000))
    })
})
