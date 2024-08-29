const { ethers } = require('hardhat')
const { expect } = require('chai')

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {
    // Declares the variable to store in the deployed contract & makes the token variable scope accessible to every function in describe
    // Variables stored on blockchain cost more gas than variables stored in memory
    let token, 
        accounts, 
        deployer,
        receiver

    beforeEach(async () => {
        // Fetch the contract factory
        const Token = await ethers.getContractFactory('Token')
        // Assign the value of the deployed contract to the token variable
        // State variable token is assigned the value of the deployed contract
        token = await Token.deploy('Nex Gen', 'NXG', 1000000)

        // Get the account(s) from ethers
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]
    })

    // Declare the variables
    const name = 'Nex Gen'
    const symbol = 'NXG'
    const decimals = '18'
    const totalSupply = tokens('1000000')

    // Nested deployment block
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

    describe('Sending Token', () => {
        let amount, 
        transaction, 
        result

        describe('Success', () => {
            // Before each test, transfer tokens from deployer to receiver
            beforeEach(async () => {
                amount = tokens(100)
                transaction = await token.connect(deployer).transfer(receiver.address, amount)
                result = await transaction.wait()
            })

            it('transfers token balances', async () => {
                // Transfer tokens from deployer to another account
                // Connects the token contract to the deployer wallet
                // neccessary to sign the transaction
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
                expect(await token.balanceOf(receiver.address)).to.equal(amount)
            })

            it('emits Transfer event', async () => {
                // Check the events of the transaction
                const event = result.events[0]
                expect(event.event).to.equal('Transfer')

                // Check the arguments of the event
                const args = event.args
                expect(args.from).to.equal(deployer.address)
                expect(args.to).to.equal(receiver.address)
                expect(args.value).to.equal(amount)
            })
        })

        describe('Failure', () => {
            it('rejects insufficient balances', async () => {
                // Transfer more tokens than the deployer has - 100M
                const invalidAmount = tokens(100000000)
                await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
            })

            it('rejects invalid recipients', async () => {
                // Transfer tokens to the zero address
                const amount = tokens(100)
                await expect(token.connect(deployer).transfer(ethers.constants.AddressZero, amount)).to.be.reverted
            })
        })
    })
})
