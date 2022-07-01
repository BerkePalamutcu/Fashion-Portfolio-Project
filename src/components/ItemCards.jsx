import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../redux/dataSlice';
import { getCategoriesAndDocuments } from '../firebase/firebaseapp';
import styled from 'styled-components';

//STYLING
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  transition: ease-in-out 1s;
`;
const CardsWrapper = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
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
  user-select: none;
`;

const Header = styled.h1`
  font-family: 'Quintessential', cursive;
  font-size: 55px;
  font-weight: 500;
`;

const FiltersMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;
const FiltersMenuWrapper = styled.div`
  display: flex;

  margin: 20px 30px 20px 30px;
`;
const FiltersMenuHeaders = styled.span`
  display: flex;
  font-size: 22px;
  font-weight: 600;
  font-family: 'Quintessential', cursive;
`;
const FiltersMenuItems = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: 50px;
  font-size: 18px;
  font-family: 'Baskervville', serif;
  font-weight: 400;
`;
const FilterMenuItem = styled.span`
  display: flex;
  cursor: pointer;
  font-style: italic;
  user-select: none;
`;

const SortItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px 30px 50px 30px;
`;
const SortItemsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const SortItem = styled.span`
  font-family: 'Baskervville', serif;
  user-select: none;
  cursor: pointer;
`;

//COMPONENT
const ItemCards = () => {
  let itemsData = [];
  const [intersection, setIntersection] = useState(false);
  const [fetchedItemCount, setFetchedItemCount] = useState(4);
  const [itemsDataState, setItemsDataState] = useState([]);
  const [filterMenuActive, setFilterMenuActive] = useState(false);
  const [sortMenuActive, setSortMenuActive] = useState(false);
  const [filterParameter, setFilterParameter] = useState('');
  const bottomElementRef = useRef(null); //dummy div reference
  const items = useSelector((state) => state.getDataReducer.itemData); // main state -> reducer -> inital state object
  const dispatch = useDispatch();

  //HELPER FUNCTION TO SET FILTER PARAMETER
  const handleFilterParameter = (event) => {
    setFilterParameter(event.target.innerHTML.toLowerCase());
  };

  //CALLBACK FUNCTION FOR INTERSECTION OBSERVER
  const observerHelper = (items) => {
    let [item] = items;
    console.log(item);
    setIntersection(item.isIntersecting);
  };

  //OPTIONS FOR OBSERVER
  const options = {
    root: null,
    rootMargin: '0px 0px 90px 0px',
    threshold: 0.0,
  };

  const optionsObj = useMemo(() => options, []);
  const filterClickHandler = () => {
    setFilterMenuActive(!filterMenuActive);
  };
  const sortClickHandler = () => {
    setSortMenuActive(!sortMenuActive);
  };
  //Redux action to get the data from the store
  useEffect(() => {
    console.log('getdata fired first');
    const getData = async () => {
      const shopData = await getCategoriesAndDocuments('categories');
      dispatch(getDataFromFirestore(shopData));
    };
    getData();
    console.log('getdata fired second');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //infinite scrolling and array slice logic is handled here
  useEffect(() => {
    console.log('datapush effect fired first');
    for (let i = 0; i < Object.values(items).length; i++) {
      for (let j = 0; j < Object.values(items)[i].items.length; j++) {
        itemsData.push(Object.values(items)[i].items[j]);
      }
    }
    let slicedItems = itemsData.slice(0, fetchedItemCount);
    setItemsDataState(slicedItems);
    setFetchedItemCount(fetchedItemCount + 4);
    console.log('datapush effect fired second');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  //Sets new parameter for filter without extra rendering
  const filteredItems = useMemo(
    () => itemsDataState.filter((item) => item.category === filterParameter),
    [filterParameter, itemsDataState]
  );

  // const observer = new IntersectionObserver(observerHelper, options);
  const observer = useMemo(
    () => new IntersectionObserver(observerHelper, optionsObj),
    [optionsObj]
  );

  const observerMemoized = useCallback(() => {
    // let dummyDivRef = bottomElementRef.current;
    console.log('dummydiv effect fired');
    if (bottomElementRef.current) {
      observer.observe(bottomElementRef.current);
    }
  }, [observer]);

  const observerCleanUpMemoized = useCallback(() => {
    if (bottomElementRef.current) {
      try {
        observer.unobserve(bottomElementRef.current);
        console.log('dummydiv cleanup fired');
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  //Dummy div reference and intersection logic are handled here
  useEffect(() => {
    observerMemoized();
  }, []);

  return (
    <>
      <CardsContainer>
        <FilterContainer>
          <Header>All Products</Header>
          <FilterWrapper>
            <FilterTag onClick={filterClickHandler}>Filters</FilterTag>
            <FilterTag onClick={sortClickHandler}>Sort</FilterTag>
            <FilterTag>4 column</FilterTag>
            <FilterTag>2 column</FilterTag>
          </FilterWrapper>
        </FilterContainer>
        <FiltersMenuContainer
          style={{ display: filterMenuActive === false && 'none' }}
        >
          <FiltersMenuWrapper>
            <FiltersMenuHeaders>Categories</FiltersMenuHeaders>
            <FiltersMenuItems onClick={handleFilterParameter}>
              <FilterMenuItem>Dresses</FilterMenuItem>
              <FilterMenuItem>Jackets</FilterMenuItem>
              <FilterMenuItem>Coats</FilterMenuItem>
              <FilterMenuItem>T-Shirts</FilterMenuItem>
              <FilterMenuItem>Skirts</FilterMenuItem>
              <FilterMenuItem>Sweaters</FilterMenuItem>
              <FilterMenuItem>Trousers</FilterMenuItem>
              <FilterMenuItem>Coats</FilterMenuItem>
              <FilterMenuItem>Waistcoats</FilterMenuItem>
              <FilterMenuItem>Accessories</FilterMenuItem>
            </FiltersMenuItems>
          </FiltersMenuWrapper>
          <FiltersMenuWrapper>
            <FiltersMenuHeaders>Price</FiltersMenuHeaders>
            <FiltersMenuItems>
              <FilterMenuItem>$0-50</FilterMenuItem>
              <FilterMenuItem>$50-100</FilterMenuItem>
              <FilterMenuItem>$100-150</FilterMenuItem>
            </FiltersMenuItems>
          </FiltersMenuWrapper>
        </FiltersMenuContainer>
        <SortItemsContainer
          style={{ display: sortMenuActive === false && 'none' }}
        >
          <SortItemsWrapper>
            <SortItem>Low To High</SortItem>
            <SortItem>High To Low</SortItem>
            <SortItem>A-Z</SortItem>
            <SortItem>Z-A</SortItem>
            <SortItem>Featured</SortItem>
          </SortItemsWrapper>
        </SortItemsContainer>
        <CardsWrapper>
          {itemsDataState.map((item, i) => (
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
                onClick={(e) => console.log(i)}
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
