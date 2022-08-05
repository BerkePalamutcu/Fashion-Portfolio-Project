import styled from 'styled-components';

const SummaryImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;
const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;
const SummaryItem = ({ cardSummaryData }) => {
  return (
    <>
      {cardSummaryData.map((item, i) => (
        <ItemDetailsContainer>
          <SummaryImage src={item.imgURL[0]} />
          <h2 style={{ fontStyle: 'italic' }}>{item.name}</h2>
          <h2>quantity: {item.quantity}</h2>
          <h2>size: {item.selectedSize}</h2>
          <h2>{item.price}$</h2>
        </ItemDetailsContainer>
      ))}
    </>
  );
};

export default SummaryItem;
