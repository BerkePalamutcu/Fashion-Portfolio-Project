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
  const [fetchedItemCount, setFetchedItemCount] = useState(4);
  const [itemsDataState, setItemsDataState] = useState([]);
  const bottomElementRef = useRef(null); //dummy div reference
  const items = useSelector((state) => state.getDataReducer.itemData); // main state -> reducer -> inital state object
  const dispatch = useDispatch();

  //CALLBACK FUNCTION FOR INTERSECTION OBSERVER
  const observerHelper = (items) => {
    let [item] = items;
    setIntersection(item.isIntersecting);
  };

  //OPTIONS FOR OBSERVER
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    root: null,
    rootMargin: '0px 0px 500px 0px',
    threshold: 1.0,
  };

  //Redux action to get the data from the store
  useEffect(() => {
    const getData = async () => {
      const shopData = await getCategoriesAndDocuments('categories');
      dispatch(getDataFromFirestore(shopData));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //infinite scrolling and array slice logic is handled here
  useEffect(() => {
    for (let i = 0; i < Object.values(items).length; i++) {
      for (let j = 0; j < Object.values(items)[i].items.length; j++) {
        itemsData.push(Object.values(items)[i].items[j]);
      }
    }
    let slicedItems = itemsData.slice(0, fetchedItemCount);
    console.log(slicedItems);
    setItemsDataState(slicedItems);
    if (intersection) {
      console.log(fetchedItemCount);
      console.log('intersection');
    } else {
      console.log('no intersection');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection, items]);

  //Dummy div reference and intersection logic handled here
  useEffect(() => {
    let dummyDivRef = bottomElementRef.current;
    const observer = new IntersectionObserver(observerHelper, options);
    if (dummyDivRef) {
      observer.observe(dummyDivRef);
      console.log('im here');
    }

    return () => {
      if (dummyDivRef) {
        try {
          observer.unobserve(dummyDivRef);
          setFetchedItemCount(fetchedItemCount + 4);
        } catch (error) {
          console.log(error);
        }
      }
    };
  }, [bottomElementRef, options, fetchedItemCount]);

  return (
    <>
      <CardsContainer>
        <CardsWrapper>
          {itemsDataState.map((item) => (
            <div key={item.id}>
              <CardImage
                onMouseEnter={(e) =>
                  (e.target.src = item.imgURL[1]
                    ? item.imgURL[1]
                    : item.imgURL[0])
                }
                onMouseLeave={(e) => (e.target.src = item.imgURL[0])}
                alt={item.name}
                src={item.imgURL[0]}
              />
              <ItemCard>{item.name}</ItemCard>
              <div>{item.price}$</div>
            </div>
          ))}
        </CardsWrapper>
      </CardsContainer>
      <div ref={bottomElementRef}></div>
    </>
  );
};

export default ItemCards;
