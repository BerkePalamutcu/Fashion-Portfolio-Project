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
  user-select: none;
  border: 1px solid black;
  width: 89%;
  padding: 20px;
  margin-left: 30px;
`;

const SummaryItem = ({ cardSummaryData }) => {
  return (
    <div
      style={{
        paddingBottom: '40px',
        display: 'flex',
        gap: '30px',
        flexDirection: 'column',
      }}
    >
      {cardSummaryData.map((item, i) => (
        <>
          <ItemDetailsContainer>
            <SummaryImage src={item.imgURL[0]} />
            <h2 style={{ fontStyle: 'italic' }}>{item.name}</h2>
            <h2>quantity: {item.quantity}</h2>
            <h2>size: {item.selectedSize}</h2>
            <h2>{item.price}$</h2>
          </ItemDetailsContainer>
        </>
      ))}
    </div>
  );
};

export default SummaryItem;
