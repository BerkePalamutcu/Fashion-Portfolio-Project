import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../redux/dataSlice';
import { getCategoriesAndDocuments } from '../firebase/firebaseapp';

const ItemCards = () => {
  const items = useSelector((state) => state.getDataReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const shopData = await getCategoriesAndDocuments('categories');
      dispatch(getDataFromFirestore(shopData));
    };
    getData();
    console.log(items);
  }, []);

  return <div></div>;
};

export default ItemCards;
