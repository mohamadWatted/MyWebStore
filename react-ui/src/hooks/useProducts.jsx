import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../features/product-slice";

const useProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
};

export default useProducts;
