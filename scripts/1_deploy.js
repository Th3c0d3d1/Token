async function main() {
    // We get the contract to deploy
    // grabs info from artifacts/contracts/Token.sol/Token.json
    const Token = await ethers.getContractFactory("Token");

    // Deploy the contract
    const token = await Token.deploy();
    // Gets information about the deployment & load into contract
    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
