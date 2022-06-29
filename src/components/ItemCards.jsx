import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../redux/dataSlice';
import { getCategoriesAndDocuments } from '../firebase/firebaseapp';
import styled from 'styled-components';

//STYLING
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardsWrapper = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 30px 50px 30px;
`;
const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
const FilterTag = styled.span`
  font-family: 'Quintessential', cursive;
  font-size: 22px;
  cursor: pointer;
`;

const Header = styled.h1`
  font-family: 'Quintessential', cursive;
  font-size: 55px;
  font-weight: 500;
  // margin: 40px 0 50px 50px;
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
        <FilterContainer>
          <Header>All Products</Header>
          <FilterWrapper>
            <FilterTag>Filters</FilterTag>
            <FilterTag>Sort</FilterTag>
            <FilterTag>4 column</FilterTag>
            <FilterTag>2 column</FilterTag>
          </FilterWrapper>
        </FilterContainer>

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
