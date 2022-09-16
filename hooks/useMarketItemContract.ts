import MARKET_ITEM_ABI from "../contracts/MarketItem.json";
import type { MarketItem } from "../contracts/types";
import useContract from "./useContract";

export default function useMarketItemContract(contractAddress?: string) {
  return useContract<MarketItem>(contractAddress, MARKET_ITEM_ABI);
}
