import MARKET_PLACE_ABI from "../contracts/MarketItem.json";
import useContract from "./useContract";

export default function useMarketPlaceContract(contractAddress?: string) {
  return useContract(contractAddress, MARKET_PLACE_ABI);
}
