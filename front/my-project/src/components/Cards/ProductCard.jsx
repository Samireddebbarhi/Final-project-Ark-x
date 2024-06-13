import { React, useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
import Loader from "../../helper/Loader";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("http://localhost:3001/api/v2/admin/getAllProducts");
      console.log(data.product);
      setData(data.product);
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
        {loading ? <Loader /> : null}
        {data.slice(0, 3).map((value) => (
          <Card value={value} key={value._id} />
        ))}
      </div>
    </>
  );
};

export default ProductCard;
