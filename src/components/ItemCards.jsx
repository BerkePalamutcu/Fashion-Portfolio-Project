import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../redux/dataSlice';
import { getCategoriesAndDocuments } from '../firebase/firebaseapp';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//TODO: implement smooth rendering on the component
//STYLING
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  transition: max-height 200ms ease, opacity 200ms ease;
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
const DecorationSpan = styled.span`
  font-family: 'Quintessential', cursive;
  font-size: 22px;
  margin-right: 20px;
  font-style: italic;
  font-weight: 500;
`;
//COMPONENT
const ItemCards = () => {
  let itemsData = []; //The data will be stored here after getting it from redux store
  const [intersection, setIntersection] = useState(false); //state for detecting intersections
  const [fetchedItemCount, setFetchedItemCount] = useState(4); //state for fetched Items
  const [itemsDataState, setItemsDataState] = useState([]); // state for rendered data
  const [filterMenuActive, setFilterMenuActive] = useState(false); //state for filter menu
  const [sortMenuActive, setSortMenuActive] = useState(false); //state for sort menu
  const [filterParameter, setFilterParameter] = useState(''); //state for detecting filter parameters from JSX
  const bottomElementRef = useRef(null); //dummy div reference for intersection
  const items = useSelector((state) => state.getDataReducer.itemData); // main state -> reducer -> inital state object
  const dispatch = useDispatch(); // Redux helper function to dispatch actions.

  //useNavigate hook and redirect to product page logic are handled here
  const redirectToProductPage = useNavigate();

  //HELPER FUNCTION TO SET FILTER PARAMETER
  const handleFilterParameter = (event) => {
    setFilterParameter(event.target.innerHTML.toLowerCase());
  };

  //HELPER FUNCTION TO SET FILTER PARAMETER BY PRICE RANGE
  const handleFilterByPriceRange = (event) => {
    if (event.target.innerHTML === '$0-50') {
      setFilterParameter('$0-50');
    }
    if (event.target.innerHTML === '$50-100') {
      setFilterParameter('$50-100');
    }
    if (event.target.innerHTML === '$100-150') {
      setFilterParameter('$100-150');
    }
  };
  const alphabeticalSortHelper = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  };

  const handleSorting = (event) => {
    if (event.target.innerHTML === 'Low To High') {
      setItemsDataState([...itemsDataState.sort((a, b) => a.price - b.price)]);
    }
    if (event.target.innerHTML === 'High To Low') {
      setItemsDataState([...itemsDataState.sort((a, b) => b.price - a.price)]);
    }
    if (event.target.innerHTML === 'A-Z') {
      setItemsDataState([...itemsDataState.sort(alphabeticalSortHelper)]);
    }

    if (event.target.innerHTML === 'Z-A') {
      setItemsDataState([
        ...itemsDataState.sort(alphabeticalSortHelper).reverse(),
      ]);
    }
  };

  //CALLBACK FUNCTION FOR INTERSECTION OBSERVER
  const observerHelper = (items) => {
    let [item] = items;
    setIntersection(item.isIntersecting);
  };

  //OPTIONS FOR OBSERVER
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    root: null,
    rootMargin: '0px 0px 90px 0px',
    threshold: 0.0,
  };

  const optionsObj = useMemo(() => options, [options]); // Memoization the value of options object

  //Menu click handlers
  const filterClickHandler = () => {
    setFilterMenuActive(!filterMenuActive);
  };
  const sortClickHandler = () => {
    setSortMenuActive(!sortMenuActive);
  };

  //Redux action to get the data from the store
  const getData = async () => {
    const shopData = await getCategoriesAndDocuments('categories');
    dispatch(getDataFromFirestore(shopData));
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Helper function to iterate the data
  const dataCleaner = () => {
    for (let i = 0; i < Object.values(items).length; i++) {
      for (let j = 0; j < Object.values(items)[i].items.length; j++) {
        itemsData.push(Object.values(items)[i].items[j]);
      }
    }
  };
  //useEffect for infinite scrolling and slicing logic
  useEffect(() => {
    console.log('slice effect fired');
    if (filterParameter === '' || filterParameter === 'all') {
      dataCleaner();
      let slicedItems = itemsData.slice(0, fetchedItemCount);
      setFetchedItemCount(fetchedItemCount + 4);
      setItemsDataState(slicedItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  //useEffect for implementing filter
  useEffect(() => {
    console.log('filter parameter effect fired');
    dataCleaner();
    let filteredItemsByPrice;
    if (filterParameter !== '') {
      let allFilteredItems = itemsData.filter(
        (item) => item.category === filterParameter
      );
      setItemsDataState(allFilteredItems);
    }
    if (filterParameter === '$0-50') {
      filteredItemsByPrice = itemsData.filter((item) => item.price < 50);
      setItemsDataState(filteredItemsByPrice);
    }
    if (filterParameter === '$50-100') {
      filteredItemsByPrice = itemsData.filter(
        (item) => item.price > 50 && item.price < 100
      );
      setItemsDataState(filteredItemsByPrice);
    }
    if (filterParameter === '$100-150') {
      filteredItemsByPrice = itemsData.filter(
        (item) => item.price > 100 && item.price < 150
      );
      setItemsDataState(filteredItemsByPrice);
    }
    if (filterParameter === 'all') {
      setItemsDataState(itemsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParameter]);

  //Memoized observer object instance
  const observer = useMemo(
    () => new IntersectionObserver(observerHelper, optionsObj),
    [optionsObj]
  );
  //Function to use memoized observer instance
  const observerMemoized = useCallback(() => {
    console.log('memoized effect fired');
    if (bottomElementRef.current) {
      observer.observe(bottomElementRef.current);
    }
  }, [observer]);
  //Memoized Observer Clean-Up function for useEffect
  const observerCleanUpMemoized = useCallback(() => {
    if (bottomElementRef.current) {
      try {
        observer.unobserve(bottomElementRef.current);
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //useEffect for observers and infinite scrolling
  useEffect(() => {
    console.log('observer effect fired');
    observerMemoized();

    return () => {
      observerCleanUpMemoized();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <FiltersMenuHeaders>
              <DecorationSpan>Filter By</DecorationSpan>Categories
            </FiltersMenuHeaders>
            <FiltersMenuItems>
              <FilterMenuItem onClick={handleFilterParameter}>
                All
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Dresses
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Jackets
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Coats
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                T-Shirts
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Skirts
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Sweaters
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Trousers
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Coats
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Waistcoats
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterParameter}>
                Accessories
              </FilterMenuItem>
            </FiltersMenuItems>
          </FiltersMenuWrapper>
          <FiltersMenuWrapper>
            <FiltersMenuHeaders>
              <DecorationSpan>Filter By</DecorationSpan>Price
            </FiltersMenuHeaders>
            <FiltersMenuItems>
              <FilterMenuItem onClick={handleFilterByPriceRange}>
                $0-50
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterByPriceRange}>
                $50-100
              </FilterMenuItem>
              <FilterMenuItem onClick={handleFilterByPriceRange}>
                $100-150
              </FilterMenuItem>
            </FiltersMenuItems>
          </FiltersMenuWrapper>
        </FiltersMenuContainer>
        <SortItemsContainer
          style={{ display: sortMenuActive === false && 'none' }}
        >
          <SortItemsWrapper>
            <SortItem onClick={handleSorting}>Low To High</SortItem>
            <SortItem onClick={handleSorting}>High To Low</SortItem>
            <SortItem onClick={handleSorting}>A-Z</SortItem>
            <SortItem onClick={handleSorting}>Z-A</SortItem>
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
                onClick={(e) =>
                  redirectToProductPage(`${i}`, { replace: true })
                }
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
