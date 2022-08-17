import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../../redux/dataSlice';
import { getCategoriesAndDocuments } from '../../firebase/firebaseapp';
import { useNavigate } from 'react-router-dom';
import { getProductData } from '../../redux/productDataSlice';
import autoAnimate from '@formkit/auto-animate';

import {
  CardsContainer,
  CardsWrapper,
  ItemCard,
  CardImage,
  FilterContainer,
  FilterWrapper,
  FilterTag,
  Header,
  FiltersMenuContainer,
  FiltersMenuWrapper,
  FiltersMenuHeaders,
  FiltersMenuItems,
  FilterMenuItem,
  SortItemsContainer,
  SortItemsWrapper,
  SortItem,
  DecorationSpan,
  SearchInput,
} from './itemCards.styles';

//TODO:CUSTOM HOOKS ARE NEEDED
const ItemCards = () => {
  let itemsData = []; //The data will be stored here after getting it from redux store
  const [intersection, setIntersection] = useState(false); //state for detecting intersections
  const [fetchedItemCount, setFetchedItemCount] = useState(16); //state for fetched Items
  const [itemsDataState, setItemsDataState] = useState([]); // state for rendered data
  const [filterMenuActive, setFilterMenuActive] = useState(false); //state for filter menu
  const [sortMenuActive, setSortMenuActive] = useState(false); //state for sort menu
  const [filterParameter, setFilterParameter] = useState(''); //state for detecting filter parameters from JSX
  const [clickAnimation, setClickAnimation] = useState(false);
  const [inputvalue, setInputValue] = useState('');
  const bottomElementRef = useRef(null); //dummy div reference for intersection
  const cards = useRef(null);
  const categoriesRef = useRef(null);
  const pricesRef = useRef(null);
  const sortRef = useRef(null);
  const inputRef = useRef(null);
  const items = useSelector((state) => state.getDataReducer.itemData); // main state -> reducer -> inital state object
  const dispatch = useDispatch(); // Redux helper function to dispatch actions.

  //useNavigate hook and redirect to product page logic are handled here
  const redirectToProductPage = useNavigate();

  //HELPER FUNCTION FOR ADDING BORDER TO DIVS
  const addBorder = (event) => {
    if (event.target.style.borderBottom === '') {
      event.target.style.borderBottom = '1px solid black';
    } else {
      event.target.style.borderBottom = '';
    }
  };

  //HELPER FUNCTION FOR THE INPUT VALUE CHANGE
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  //HELPER FUNCTION FOR CHECKING CLASSNAMES AND ADDING DIVS
  const classNameChecker = (event) => {
    event.preventDefault();
    const mergedFilters = [
      ...categoriesRef.current.children,
      ...pricesRef.current.children,
      ...sortRef.current.children,
    ];
    const sortArray = sortRef.current.children;

    if (event.target.classList.contains('filters') === false) {
      for (let i = 0; i < mergedFilters.length; i++) {
        if (event.target.classList.contains('sort')) {
          for (let j = 0; j < sortArray.length; j++) {
            if (sortArray[j].style.borderBottom === '1px solid black') {
              sortArray[j].style.borderBottom = 'none';
            }
          }
          event.target.style.borderBottom = '1px solid black';
        } else {
          mergedFilters[i].style.borderBottom = 'none';
          event.target.style.borderBottom = '1px solid black';
        }
      }
    }
  };
  //HELPER FUNCTION FOR ANIMATING INPUT
  const animateInput = () => {
    setClickAnimation(!clickAnimation);
  };

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
  //There is a better sorting method even including all UTF-8 characters! this is ordinary.
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
  //TODO: OBSERVER WILL BE TURNED TO A HOOK!
  //TODO:BUNU HOOKA CEVIRCEM
  //OPTIONS FOR OBSERVER
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    root: null,
    rootMargin: '0px 0px 1px 0px',
    threshold: 0,
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
    if (filterParameter === '' && intersection) {
      dataCleaner();
      let slicedItems = itemsData.slice(0, fetchedItemCount);
      setFetchedItemCount(fetchedItemCount + 8);
      setItemsDataState(slicedItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  //useEffect for implementing filter
  useEffect(() => {
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
    if (inputvalue !== '') {
      setFilterParameter('all');
      setItemsDataState(
        itemsData.filter((item) =>
          item.name.toLowerCase().includes(inputvalue.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParameter, inputvalue]);

  //Memoized observer object instance
  const observer = useMemo(
    () => new IntersectionObserver(observerHelper, optionsObj),
    [optionsObj]
  );
  //Function to use memoized observer instance
  const observerMemoized = useCallback(() => {
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
    observerMemoized();

    return () => {
      observerCleanUpMemoized();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cards.current &&
      autoAnimate(cards.current, {
        duration: 700,
      });
  }, [cards]);

  return (
    <>
      <CardsContainer>
        <FilterContainer>
          <Header>All Products</Header>
          <FilterWrapper>
            <SearchInput
              clickAnimation={clickAnimation}
              placeholder="search products"
              value={inputvalue}
              onChange={(event) => handleChange(event)}
              ref={inputRef}
            />
            <FilterTag
              className="search"
              onClick={(event) => {
                animateInput();
                addBorder(event);
              }}
            >
              Search
            </FilterTag>
            <FilterTag
              style={{ borderBottom: '1px solid black' }}
              onClick={(event) => {
                filterClickHandler();
                addBorder(event);
              }}
            >
              Filters
            </FilterTag>
            <FilterTag
              style={{ borderBottom: '1px solid black' }}
              onClick={(event) => {
                sortClickHandler();
                addBorder(event);
              }}
            >
              Sort
            </FilterTag>
          </FilterWrapper>
        </FilterContainer>
        <FiltersMenuContainer
          style={{
            opacity: filterMenuActive === false && '1',
          }}
        >
          <FiltersMenuWrapper>
            <FiltersMenuHeaders>
              <DecorationSpan>Filter By</DecorationSpan>Categories
            </FiltersMenuHeaders>
            <FiltersMenuItems
              onClick={(event) => classNameChecker(event)}
              className="filters"
              ref={categoriesRef}
            >
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                All
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Dresses
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Jackets
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Coats
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                T-Shirts
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Skirts
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Sweaters
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Trousers
              </FilterMenuItem>

              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Waistcoats
              </FilterMenuItem>
              <FilterMenuItem
                className="child category"
                onClick={handleFilterParameter}
              >
                Accessories
              </FilterMenuItem>
            </FiltersMenuItems>
          </FiltersMenuWrapper>
          <FiltersMenuWrapper>
            <FiltersMenuHeaders>
              <DecorationSpan>Filter By</DecorationSpan>Price
            </FiltersMenuHeaders>
            <FiltersMenuItems
              ref={pricesRef}
              onClick={(event) => classNameChecker(event)}
              className="filters"
            >
              <FilterMenuItem
                className="child price"
                onClick={handleFilterByPriceRange}
              >
                $0-50
              </FilterMenuItem>
              <FilterMenuItem
                className="child price"
                onClick={handleFilterByPriceRange}
              >
                $50-100
              </FilterMenuItem>
              <FilterMenuItem
                className="child price"
                onClick={handleFilterByPriceRange}
              >
                $100-150
              </FilterMenuItem>
            </FiltersMenuItems>
          </FiltersMenuWrapper>
        </FiltersMenuContainer>
        <SortItemsContainer
          style={{ opacity: sortMenuActive === false && '1' }}
        >
          <SortItemsWrapper
            ref={sortRef}
            onClick={(event) => classNameChecker(event)}
            className="filters"
          >
            <SortItem className="child sort" onClick={handleSorting}>
              Low To High
            </SortItem>
            <SortItem className="child sort" onClick={handleSorting}>
              High To Low
            </SortItem>
            <SortItem className="child sort" onClick={handleSorting}>
              A-Z
            </SortItem>
            <SortItem className="child sort" onClick={handleSorting}>
              Z-A
            </SortItem>
          </SortItemsWrapper>
        </SortItemsContainer>
        <CardsWrapper
          style={{
            transform:
              sortMenuActive === false || filterMenuActive === false
                ? 'translateY(0px)'
                : undefined,
          }}
          ref={cards}
        >
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
                onClick={() => {
                  redirectToProductPage(`${itemsDataState[i].id}`, {
                    replace: true,
                  }); //semicolons are important!
                  dispatch(getProductData(itemsDataState[i]));
                }}
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
