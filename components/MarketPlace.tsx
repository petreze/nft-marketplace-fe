import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useMarketPlaceContract from "../hooks/useMarketPlaceContract";

type MarketPlace = {
  contractAddress: string;
};

const MarketPlace = ({ contractAddress }: MarketPlace) => {
  //const { account, library } = useWeb3React<Web3Provider>();
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
    <div className='container'>
        <div className='content'>
            {items.map((item, i) =>
                <div key={i}>
                    <p className='id'>
                      {item.id}
                    </p>
                    <p className='seller'>
                      {item.seller}
                    </p>
                    <p className='price'>
                      {item.price}
                    </p>
                </div>
            )}
        </div>
    </div>
);
  
  /* return (
    <div className="results-form">
    <p>
      Items:
    </p>
    <table className="marketplace">
      <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Seller</th>
            <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        
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
  ); */
 
};

export default MarketPlace;
