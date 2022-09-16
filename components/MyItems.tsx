import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useMarketPlaceContract from "../hooks/useMarketPlaceContract";
import { useEffect, useState } from "react";

type MyItemsProps = {
    marketPlaceAddress: string;
  };

const MyItems = ({ marketPlaceAddress }: MyItemsProps) => {
    const { account } = useWeb3React<Web3Provider>();

    const marketPlaceContract = useMarketPlaceContract(marketPlaceAddress);
    const [items, setItems] = useState([]);


    useEffect(() => {
        getItemsOf(account);
    },[]);


    const getItemsOf = async (address: string) => {
        const items = await marketPlaceContract.getItemsOf(address);
        items.forEach((item: any) => {
          setItems(items => [...items, item]);
        });
    }

    return (
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
    </div>
    );

};

export default MyItems;