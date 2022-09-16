import useMarketPlaceContract from "../hooks/useMarketPlaceContract";
import { useEffect, useState } from "react";

type UserPageProps = {
    marketPlaceAddress: string;
    userAddress: string;
  };

const UserPage = ({ marketPlaceAddress, userAddress }: UserPageProps) => {

    const marketPlaceContract = useMarketPlaceContract(marketPlaceAddress);
    const [items, setItems] = useState([]);


    useEffect(() => {
        getItemsOf(userAddress);
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
