
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net"
  };

  // Network chain ids
  //export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337];
  export const supportedMetamaskNetworks = [31337];

  export const MARKET_PLACE_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  export const MARKET_ITEM_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";