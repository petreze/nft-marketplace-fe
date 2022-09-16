import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { ethers } from "ethers"
import useMarketItemContract from "../hooks/useMarketItemContract";
import useMarketPlaceContract from "../hooks/useMarketPlaceContract";
import { create } from 'ipfs-http-client';


const client = create('https://ipfs.infura.io:5001/api/v0');

type CreatePageParams = {
  marketPlaceAddress: string;
  marketItemAddress: string;
};


const CreatePage = ({ marketPlaceAddress, marketItemAddress }: CreatePageParams) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const marketItemContract = useMarketItemContract(marketItemAddress);
  const marketPlaceContract = useMarketPlaceContract(marketPlaceAddress);
  const [tokenURI, setTokenURI] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [price, setPrice] = useState(null)


  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error){
        console.log("error uploading image to ipfs", error)
      }
    }
  }

  const inputTokenURI = (uri) => {
    setTokenURI(uri.target.value);
  }

  const mint = async () => {
    const result = await client.add(JSON.stringify({ image }));
    const URI = `https://ipfs.infura.io/ipfs/${result.path}`;
    
    await (await marketItemContract.mint(URI)).wait();
    const id = await marketItemContract.tokenCount();
    
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketPlaceContract.listItem(marketItemContract.address, ethers.BigNumber.from(id), listingPrice)).wait()
  }


  return (
    <div className="results-form">
    <p>
      Mint token from {marketItemContract.name} collection
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

export default CreatePage;
