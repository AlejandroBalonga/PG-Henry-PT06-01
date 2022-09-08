import { log } from "console";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

import {
Container,
Column,
ButtonComprar,
Button,
DivProduct,
DivResumen,
DivTitulo,
Decision,
ButtonCompra,
Total,
Precio,
Cantidad,
Unidad,
DivUnidad,

} from "./stylesCart";

export default function ShoppingCart () {
//   const { id } = useParams();
//   let detail = useSelector((state: ReduxState) => state.detailsProduct);
//   const dispatch = useDispatch<any>();

//   console.log(detail + "hola" + id);

//   useEffect(() => {
//     dispatch(detailsProduct(id));
//   }, [dispatch]);

let productosCarrito = JSON.parse(localStorage.getItem('carrito'));
let preciofinal= 0;

preciofinal= productosCarrito.reduce((sum,b)=> (sum + Number(b.price)),0)








  return (
    <>
      <NavBar />
      <Container>
        
          <Column>
            <DivTitulo>
                <h3>Mi CARRITO ({productosCarrito.length})</h3>
            </DivTitulo>

            {productosCarrito.map((p,i) => 
            
            <DivProduct key={i}>
            <DivUnidad>
            <img src={p.img} alt="img" width="80px"/>
                <h3>{p.name}</h3>
                <Cantidad type="number" min="1" value="1"></Cantidad>
                <Unidad>${p.price.toFixed(2)}</Unidad>
                </DivUnidad>
                <Decision>
                    <ButtonComprar>Delete</ButtonComprar>
                    
                    <ButtonComprar>Comprar ahora</ButtonComprar>
                
                </Decision>
                
            </DivProduct>

)}
            <DivResumen>
                <Total>Total</Total>
                <Precio>${preciofinal.toFixed(2)}</Precio>
            </DivResumen>
            <ButtonCompra>
                <Button ><Link to="/PruebaCarrito">Continuar compra</Link></Button>
              </ButtonCompra>
              
            </Column>
          
            </Container>
            </>
            );
            }
