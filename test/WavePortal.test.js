const { expect } = require("chai");

describe("WavePortal contract", () => {
  it("should receive a wave successfully", async () => {
    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy();
    await wavePortal.deployed();

    const waveTx = await wavePortal.wave("This is a wave!");
    await waveTx.wait();

    const waves = await wavePortal.getAllWaves();
    expect(waves[0].message).to.equal("This is a wave!");

    const wavesCount = await wavePortal.wavesCount();
    expect(wavesCount.toNumber()).to.equal(1);
  });
});
