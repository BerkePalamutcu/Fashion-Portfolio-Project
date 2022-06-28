import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../redux/dataSlice';
import { getCategoriesAndDocuments } from '../firebase/firebaseapp';
import styled from 'styled-components';

//STYLING
const CardsContainer = styled.div`
  display: flex;
`;
const CardsWrapper = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-left: 10px;
`;
const ItemCard = styled.div`
  display: flex;
  font-family: 'Quintessential', cursive;
  font-weight: 500;
  font-size: 20px;
`;
const CardImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 450px;
  object-fit: cover;
  cursor: pointer;
`;

//COMPONENT
const ItemCards = () => {
  let itemsData = [];
  const [intersection, setIntersection] = useState(false);
  const [fetchedItemCount, setFetchedItemCount] = useState(12);
  const [itemsDataState, setItemsDataState] = useState([]);
  const bottomElementRef = useRef(null);

  const items = useSelector((state) => state.getDataReducer.itemData);
  const dispatch = useDispatch();

  //CALLBACK FUNCTION FOR INTERSECTION OBSERVER
  const observerHelper = (items) => {
    let [item] = items;
    setIntersection(item.isIntersecting);
  };
  //OPTIONS FOR OBSERVER
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  //Redux action to get the data from the store
  useEffect(() => {
    const getData = async () => {
      const shopData = await getCategoriesAndDocuments('categories');
      dispatch(getDataFromFirestore(shopData));
    };
    getData();
  }, []);

  //TODO:gelen datayi state'e kaydetmeyi dene
  //FIXME: Eger olmazsa bos bir arrayin icine gonderip o arrayi data ile doldurduktan sonra state'te tut

  useEffect(() => {
    for (let i = 0; i < Object.values(items).length; i++) {
      for (let j = 0; j < Object.values(items)[i].items.length; j++) {
        itemsData.push(Object.values(items)[i].items[j]);
        // setItemsDataState(itemsData);
      }
    }
    //TODO:INFINITE SCROLLING WILL BE IMPLEMENTED!
    //FIXME: Slice logic is handled here for now!
    let slicedItems = itemsData.slice(0, fetchedItemCount);
    console.log(slicedItems);
    setItemsDataState(slicedItems);
  }, [items]);
  //
  let dummyDivRef = bottomElementRef.current;
  useEffect(() => {
    const observer = new IntersectionObserver(observerHelper, options);

    if (dummyDivRef) {
      observer.observe(dummyDivRef);
      console.log('im here');
    }

    return () => {
      if (dummyDivRef) {
        try {
          observer.unobserve(dummyDivRef);
          setFetchedItemCount(fetchedItemCount + 8);
          console.log(fetchedItemCount);
        } catch (error) {
          console.log(error);
        }
      }
    };
  }, [dummyDivRef, options, fetchedItemCount]);
  //

  return (
    <>
      <CardsContainer>
        <CardsWrapper>
          {itemsDataState.map((item) => (
            <>
              <div key={item.id}>
                <CardImage alt={item.name} src={item.imgURL[0]} />
                <ItemCard>{item.name}</ItemCard>
                <div>{item.price}$</div>
              </div>
            </>
          ))}
        </CardsWrapper>
      </CardsContainer>
      <div ref={bottomElementRef}></div>
    </>
  );
};

export default ItemCards;
