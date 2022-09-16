import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected, walletConnect } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { shortenHex } from "../util";


const Account = () => {
  const { active, error, activate, deactivate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <button
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
          
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
        {(<button
            disabled={connecting}
            onClick={async () => {
              try {
                await activate(walletConnect(), undefined, true)
              } catch (e) {
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              }
            }}>
            Wallet Connect
          </button>)
        }
      </div>
    );
  }

  return (
    <>
    <a>
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
    <button
          onClick={async () => {
            try {
              await deactivate()
            } catch (e) { 
              setError(error);
            }
          }}>
          Disconnect
        </button>
    </>
   
    
  );
};

export default Account;