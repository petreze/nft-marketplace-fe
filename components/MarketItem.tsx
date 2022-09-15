import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useMarketItemContract from "../hooks/useMarketItemContract";

type USContract = {
  contractAddress: string;
};

export enum Leader {
  UNKNOWN,
  BIDEN,
  TRUMP
}

const MarketItem = ({ contractAddress }: USContract) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const marketItemContract = useMarketItemContract(contractAddress);
  const [currentLeader, setCurrentLeader] = useState<string>('Unknown');
  const [name, setName] = useState<string | undefined>();
  const [votesBiden, setVotesBiden] = useState<number | undefined>();
  const [votesTrump, setVotesTrump] = useState<number | undefined>();
  const [stateSeats, setStateSeats] = useState<number | undefined>();


  const [tokenURI, setTokenURI] = useState<string | undefined>();


  const inputTokenURI = (uri) => {
    setTokenURI(uri.target.value);
  }

  const mint = async () => {
    await marketItemContract.mint(tokenURI);
  }



  useEffect(() => {
    getCurrentLeader();
  },[])

  const getCurrentLeader = async () => {
    const currentLeader = await marketItemContract.currentLeader();
    setCurrentLeader(currentLeader == Leader.UNKNOWN ? 'Unknown' : currentLeader == Leader.BIDEN ? 'Biden' : 'Trump')
  }

  const stateInput = (input) => {
    setName(input.target.value)
  }

  const bideVotesInput = (input) => {
    setVotesBiden(input.target.value)
  }

  const trumpVotesInput = (input) => {
    setVotesTrump(input.target.value)
  }

  const seatsInput = (input) => {
    setStateSeats(input.target.value)
  }

  const submitStateResults = async () => {
    const result:any = [name, votesBiden, votesTrump, stateSeats];
    const tx = await marketItemContract.submitStateResult(result);
    await tx.wait();
    resetForm();
  }

  const resetForm = async () => {
    setName('');
    setVotesBiden(0);
    setVotesTrump(0);
    setStateSeats(0);
  }

  return (
    <div className="results-form">
    <p>
      Current Leader is: {currentLeader}
    </p>
    <form>
      <label>
        Token URI:
        <input onChange={inputTokenURI} value={tokenURI} type="text" name="tokenUri" />
      </label>
    </form>
    <div className="button-wrapper">
      <button onClick={mint}>Mint</button>
    </div>
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
        }
        
      `}</style>
    </div>
  );
};

export default MarketItem;
