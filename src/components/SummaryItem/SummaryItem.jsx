import { SummaryImage, ItemDetailsContainer } from './summaryItem.styles';

//COMPONENT
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
