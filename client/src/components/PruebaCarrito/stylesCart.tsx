import styled from "styled-components";

export const Container = styled.div`
  width: 1024px;
  height: auto;
  display: flex;
  margin: 25px auto 25px auto;
  flex-direction: column;
  margin-top: 12px;
  border: 1px solid #d0d2d1;
  border-radius: 5px;
  background-color: white;
  padding: 35px;
`;

// export const Panel= styled.div`
//  display: grid;
//   grid-template-columns: 67fr 33fr;
// `;

export const Column = styled.div``;

export const DivTitulo = styled.div`
  border-bottom: 1px solid black;
  padding: 25px;
`;

export const DivProduct = styled.div`
  border-bottom: 1px solid #d0d2d1;
  padding: 25px;
`;

export const DivUnidad= styled.div`
 display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 200px;
grid-row-gap: 0px;
justify-content: center;
align-items: center;
`;

export const Cantidad = styled.input`
  font-size: 16px;
  font-weight: 400;
  border-radius: 4px;
  overflow: hidden;
  vertical-align: top;
  display: inline-block;
  padding: 10px;
  border: 1px solid #e6e6e6;
  width: 30px;
`;

export const Unidad= styled.div`

`;

export const Decision = styled.div`
  display: flex;
  /* justify-content: space-between; */
  margin-right: 10px;
`;

export const DivResumen = styled.div`
  width: 500px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0px 0px 600px;
`;

export const ButtonComprar = styled.button`
  border: none;
  background: inherit;
  margin: 25px 100px 0px 0px;
`;

export const ButtonCompra = styled.button`
  margin: 40px 0px 0px 800px;
  text-align: right;
  border: none;
`;

export const Button = styled.button`
  display: inline-block;
  width: auto;
  min-width: 142px;
  color: #fff;
  background: #3483fa;
  padding: 13px 32px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
  font-size: 26px;
`;

export const Precio = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;

  font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto,
    Arial, sans-serif;
  font-size: 26px;
`;
