import {React,useState,useEffect} from "react";
import Card from "./Card";
import axios from 'axios';
import Loader from "../../helper/Loader";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true)
      const product = await axios.get("https://ecommerceserver-ten.vercel.app/api/data/getProductByKeyword?keyword=recommended");
      console.log(product.data.data.data);
      setData(product.data.data.data);
      setLoading(false)
    } catch {
      console.log("Problem");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div className="flex flex-row overflow-x-auto  flex-wrap justify-center">
        {loading ? <Loader/> : null}
      {data.map((value) => (
        <Card value={value} key={value.id}/>
      ))}
    </div>
    </>
  );
};

export default ProductCard;
