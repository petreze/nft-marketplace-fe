import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState, Component } from "react";
import useMarketPlaceContract from "../hooks/useMarketPlaceContract";

type MarketPlace = {
  contractAddress: string;
};

export enum Leader {
  UNKNOWN,
  BIDEN,
  TRUMP
}

const MarketPlace = ({ contractAddress }: MarketPlace) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const marketPlaceContract = useMarketPlaceContract(contractAddress);


  const [items, setItems] = useState([]);

  
  useEffect(() => {
    getAllItems();
  },[])

  const getAllItems = async () => {
    const items = await marketPlaceContract.getAllItems();
    items.forEach((item: any) => {
      setItems(items => [...items, item]);
    });
  }


  return (
    <div className="results-form">
    <p>
      Items:
    </p>
    <table className="nfts">
      <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Seller</th>
            <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody data="items">
        <tr>
            <th scope="row">Donuts</th>
            <td>3,000</td>
        </tr>
        <tr>
            <th scope="row">Stationery</th>
            <td>18,000</td>
        </tr>
        <tr>
            <th scope="row">Stationery</th>
            <td>18,000</td>
        </tr>
      </tbody>
    </table>
    
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .nfts {
          width: 500
        }
      `}</style>
    </div>
  );
 
};

export default MarketPlace;
