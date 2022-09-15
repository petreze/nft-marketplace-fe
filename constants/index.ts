
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337];

  export const MARKET_PLACE_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
  export const MARKET_ITEM_ADDRESS = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";