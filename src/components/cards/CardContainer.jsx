import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #102031;

  > * {
    flex: 1;
    margin: 10px 5px 10px 5px;
    min-width: 200px;
  }
`;

export default CardContainer;
