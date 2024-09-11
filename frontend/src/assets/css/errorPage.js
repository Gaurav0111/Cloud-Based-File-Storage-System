import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 500px;
  }

  div {
    text-align: center;
  }

/* Responsive Media Queries */
  @media (max-width: 800px) {
    img {
      width: 250px; 
    }
  }
`;

export default Wrapper;
