const { ethers } = require('hardhat')
const { expect } = require('chai')

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {
    // Declares the variable to store in the deployed contract & makes the token variable scope accessible to every function in describe
    let token, 
        accounts, 
        deployer

    beforeEach(async () => {
        // Fetch the contract factory
        const Token = await ethers.getContractFactory('Token')
        // Assign the value of the deployed contract to the token variable
        // State variable token is assigned the value of the deployed contract
        token = await Token.deploy('Nex Gen', 'NXG', 1000000)

        // Get the account(s) from ethers
        accounts = await ethers.getSigners()
        deployer = accounts[0]
    })

    // Declare the variables
    const name = 'Nex Gen'
    const symbol = 'NXG'
    const decimals = '18'
    const totalSupply = tokens('1000000')

    // nested describe block
    describe('Deployment', () => {

        it('has correct name', async () => {
        // Read token name & Check the result
        expect(await token.name()).to.equal(name)
        })

        it('has correct symbol', async () => {
            // Read token symbol & Check the result
            expect(await token.symbol()).to.equal(symbol)
        })

        it('has correct decimals', async () => {
            // Read token decimals & Check the result
            expect(await token.decimals()).to.equal(decimals)
        })

        it('has correct total supply', async () => {
            // Read token total supply & Check the result
            expect(await token.totalSupply()).to.equal(totalSupply)
        })

        it('assigns the total supply to the deployer', async () => {
            // Read token balance of deployer & Check the result
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
        })
    })
})
