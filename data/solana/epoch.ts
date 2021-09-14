import { Connection } from '@solana/web3.js';
import { Epoch, EpochError, ApiResponse } from '@/data/types';
import { ChainListInfos as INFO } from '../chaininfo/chain-list-infos';

export const getEpoch = async (chain: string): Promise<ApiResponse> => {
  let epochError: EpochError;
  const URL = INFO['solana'].isMainnet
    ? 'https://api.mainnet-beta.solana.com'
    : 'https://api.devnet.solana.com';
  if (chain) {
    try {
      const SAMPLE_HISTORY_HOURS = 6;
      const connection = new Connection(URL);
      const action = await connection.getRecentPerformanceSamples(60 * SAMPLE_HISTORY_HOURS);
      const samples = action
        .filter((sample: { numSlots: number }) => {
          return sample.numSlots !== 0;
        })
        .map((sample: { samplePeriodSecs: number; numSlots: number }) => {
          return sample.samplePeriodSecs / sample.numSlots;
        })
        .slice(0, 60);
      const samplesInHour = samples.length < 60 ? samples.length : 60;
      const avgSlotTime1h =
        samples.reduce((sum: number, cur: number) => {
          return sum + cur;
        }, 0) / samplesInHour;
      const hourlySlotTime = Math.round(1000 * avgSlotTime1h);

      const epochInfo = await connection.getEpochInfo();
      const epochTimeRemaining = (epochInfo.slotsInEpoch - epochInfo.slotIndex) * hourlySlotTime;
      const currentTime = new Date().getTime();
      const epochEndTime = currentTime + epochTimeRemaining;
      // console.log('Epoch end time (approx.)	- ', epochEndTime);
      const epochTimeTotal = epochInfo.slotsInEpoch * hourlySlotTime;
      const epochStartTime = epochEndTime - epochTimeTotal;
      // console.log('Epoch start time (approx.)	- ', epochStartTime);
      const epoch: Epoch = {
        epochStartTime: epochStartTime,
        epochEndTime: epochEndTime,
      };
      return {
        api: '',
        data: epoch,
        error: EpochError.NO_ERROR,
      };
      // console.log(epoch);
    } catch (error) {
      epochError = EpochError.TIME_ERROR;
    }
  } else {
    epochError = EpochError.NO_ERROR;
  }
  return {
    api: '',
    error: epochError,
  };
};
