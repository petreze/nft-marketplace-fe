import MARKET_PLACE_ABI from "../contracts/MarketItem.json";
import type { MarketPlace } from "../contracts/types";
import useContract from "./useContract";

export default function useMarketPlaceContract(contractAddress?: string) {
  return useContract<MarketPlace>(contractAddress, MARKET_PLACE_ABI);
}
