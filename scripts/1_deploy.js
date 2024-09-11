async function main() {
    // We get the contract to deploy
    // grabs info from artifacts/contracts/Token.sol/Token.json
    const Token = await ethers.getContractFactory("Token");

    // Define the constructor arguments
    const name = "Insert Token Name";
    const symbol = "Insert Token Symbol";
    const initialSupply = ethers.utils.parseUnits("Insert Token Supply", 18); // 1 million tokens with 18 decimals

    // Deploy the contract
    const token = await Token.deploy(name, symbol, initialSupply);
    // Gets information about the deployment & load into contract
    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
