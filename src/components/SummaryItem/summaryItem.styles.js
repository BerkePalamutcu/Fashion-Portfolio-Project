import styled from 'styled-components';

export const SummaryImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;
export const ItemDetailsContainer = styled.div`
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
