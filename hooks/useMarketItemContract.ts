import MARKET_ITEM_ABI from "../contracts/MarketItem.json";
import useContract from "./useContract";

export default function useMarketItemContract(contractAddress?: string) {
  return useContract(contractAddress, MARKET_ITEM_ABI);
}
