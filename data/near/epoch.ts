import { EpochError, ApiResponse } from '@/data/types';
import { providers } from 'near-api-js';

export const getEpoch = async (chain: string): Promise<ApiResponse> => {
  let epochError: EpochError;
  if (chain) {
    try {
      const RPC = 'https://rpc.mainnet.near.org';
      const provider = new providers.JsonRpcProvider(RPC);
      const finalBlock = await provider.block({ finality: 'final' });
      const firstBlock = await provider.block({ blockId: finalBlock.header.next_epoch_id });
      const prevBlock = await provider.block({ blockId: finalBlock.header.epoch_id });
      const epochStartTime = Math.round(firstBlock.header.timestamp / 1000000);
      const epochBlockHeight = firstBlock.header.height; // 이번 에폭의 첫번째 블록 높이
      const prevEpochBlockHeight = prevBlock.header.height; // 이전 에폭의 마지막 블록 높이
      const blockHeight = finalBlock.header.height; // 현재 블록 높이
      const epochProgress =
        (blockHeight - epochBlockHeight) / (epochBlockHeight - prevEpochBlockHeight); // 이번 에폭 퍼센트
      const timeStamp = Date.now(); // 현재 시간
      const epochTimeStamp = firstBlock.header.timestamp; // 이번 에폭의 첫번째 블록 시간
      const epochProgressTimeStamp = (timeStamp * 1000000 - epochTimeStamp) / 1000000; // 이번 에폭 남은 시간
      const epochTime = epochProgressTimeStamp / epochProgress; // 이번 에폭 총 시간
      const epochEndTime = Math.round(epochStartTime + epochTime);
      const epoch: ApiResponse = {
        api: 'v1/epoch/near',
        data: {
          epochStartTime: epochStartTime,
          epochEndTime: epochEndTime,
        },
        error: EpochError.NO_ERROR,
      };
      // console.log(epoch);
      return epoch;
    } catch (error) {
      epochError = EpochError.TIME_ERROR;
    }
  } else {
    epochError = EpochError.NO_ERROR;
  }
  const epoch: ApiResponse = {
    api: 'v1/epoch/near',
    error: epochError,
  };
  return epoch;
};
