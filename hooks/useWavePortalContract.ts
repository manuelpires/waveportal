import useContract from "./useContract";
import type { WavePortal } from "../typechain";
import CONTRACT from "../artifacts/contracts/WavePortal.sol/WavePortal.json";

const useWavePortalContract = () =>
  useContract<WavePortal>(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    CONTRACT.abi
  );

export default useWavePortalContract;
