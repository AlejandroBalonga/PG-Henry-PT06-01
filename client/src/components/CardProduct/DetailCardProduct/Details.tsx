import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { detailsProduct, Articulo, ArticuloCarrito } from "../../../actions/index";
import { ReduxState } from "../../../reducer";
import StartRating from "../../StarRating/StarRating";
import NavBar from "../../NavBar/NavBar";
import metodo from "../../../img/metodopago.png";
import logo from "../../../img/Logo.png";

import {
  Container,
  Panel,
  Column,
  Galeria,
  Description,
  Section,
  Producto,
  Estado,
  Name,
  Price,
  CardEnvio,
  CheckIcon,
  Stock,
  ButtonComprar,
  ButtonCarrito,
  Button,
  MetodoPago,
  Categoria,
  Parrafo,
  Img,


  /*  ProductoVenta,
  InfoVendedor
 */
} from "./styles";

export default function Details() {
  const { id } = useParams();
  let detail = useSelector((state: ReduxState) => state.detailsProduct);
  const dispatch = useDispatch<any>();
  const history = useNavigate();


   const detalle : ArticuloCarrito =   {
    id: detail?.id,
    name:detail?.name ,
    brand:detail?.brand ,
    stock:detail?.stock ,
    price:detail?.price ,
    img:detail?.img ,
    state:detail?.state ,
    categoryId:detail?.categoryId ,
    category:detail?.category ,
    totalCount: 1,
    precioTotal: detail?.price,
   }





  let carrito = JSON.parse(localStorage.getItem('carrito'));
  if (!carrito) {
    carrito = [];
  }



  const [articulo, setArticulo] = useState([carrito])
  // const [articulo, setArticulo] = useState([{
  //   id: carrito.id,
  //   name: carrito.name,
  //   brand: carrito.brand,
  //   stock: carrito.stock,
  //   price: carrito.price,
  //   img: carrito.img,
  //   state: carrito.state,
  //   categoryId: carrito.categoryId,
  //   category: carrito.category,
  //   totalCount: 1}
  // ])

  useEffect(() => {
    dispatch(detailsProduct(id));

  }, [dispatch, articulo]);



  function handlerAgregarCarrito(detalle, accion: string) {

    setArticulo(detalle)
    // if (carrito) {
    const index = carrito.findIndex((art) => art.id === detalle.id)
    if (index === -1) {
      //agrego
      localStorage.setItem('item', JSON.stringify(detalle))
      carrito.push(JSON.parse(localStorage.getItem('item')))
      localStorage.setItem('carrito', JSON.stringify(carrito))
      localStorage.setItem('item', JSON.stringify(""))

      accion === "comprar"?  history('/ShoppingCart') : history('/home')

    }
    else{
      //no agrego sumo. 
      //detalle.totalCount = detalle.totalCount + 1;
      let carritoAux = JSON.parse(localStorage.getItem('carrito'));
      carritoAux[index].totalCount = carritoAux[index].totalCount + 1;
      carritoAux[index].precioTotal = carritoAux[index].price * carritoAux[index].totalCount;
      localStorage.setItem('carrito', JSON.stringify(carritoAux))
      //console.log(carrito)
      accion === "comprar"?  history('/ShoppingCart') : history('/home')
      
    }
    //console.log(articulo)

  }

  return (
    <>
      <NavBar />
      <Container>
        <Panel>
          <Column>
            <Galeria>
              <img
                src={detail?.img}
                //src="https://http2.mlstatic.com/D_NQ_NP_2X_611808-MCO45374942353_032021-F.webp"
                alt="img"
              />
            </Galeria>

            <Info />
          </Column>
          <Column>
            {/*  <InfoProducto/> */}
            <Producto>
              <Estado> Nuevo | vendidos 10 </Estado>
              <Name>
                <h1>{detail?.name}</h1>
                {/* <h1> Bolso Mochila Morral Antirobo Con Puerto Usb Carga Q23</h1>  */}
              </Name>
              <Price>
                <h4>{detail?.price}</h4>
              </Price>
              <MetodoPago>
                <h1>Metodo de Pago</h1>
                <img src={metodo} alt="Mtodo de Pago" />
              </MetodoPago>

              <StartRating />

              <CardEnvio>
                <CheckIcon />
                <div>
                  <span className="title">Envío a nivel nacional</span>
                  <span className="detalle">
                    <p> Devolución gratis </p>
                    <p> Tienes 30 días desde que lo recibes. </p>
                  </span>
                </div>
              </CardEnvio>
              <Stock>
                <p>Stock disponible:</p>
                <strong>{`${detail?.stock} unidades`}</strong>
              </Stock>
              <Categoria>
                <h5>{`categoria: ${detail?.category.name}`}</h5>
              </Categoria>
              {/* <Link to="/buy">
                {" "} */}
              <ButtonComprar>
                <Button className="comprar" onClick={()=>handlerAgregarCarrito(detalle, "comprar")}>Comprar ahora</Button>
              </ButtonComprar>
              {/* </Link> */}

              <ButtonCarrito>
                <Button className="carrito" onClick={()=>handlerAgregarCarrito(detalle, "agregar")}>Agregar al Carrito</Button>
              </ButtonCarrito>
            </Producto>
            <Garantia />
            {/*  <ProductoVenta/>
          <InfoVendedor/>
           </Section>
         */}
          </Column>
        </Panel>
      </Container>
    </>
  );
}

const Info = () => {
  return (

    <Description>
      <Img id="logo" src={logo} alt="" />
      <Parrafo>
        La evolución no para. Por eso CompuStore es experto en tecnología de
        la más avanzada. En www.compustore.com te ofrecemos un sitio web
        renovado para que encuentres la mayor variedad de electrodomésticos,
        tecno y entretenimiento en tu hogar. Nuestro equipo de expertos está
        preparado para asesorarte y brindarte todos los días una experiencia
        de compra personalizada que se adapte a lo que buscás. También
        contamos con un servicio técnico especializado, con asistencia total
        en posventa para que disfrutes todos los días de tu producto como si
        fuera el primero. Además, ofrecemos ofertas especiales, descuentos y
        planes de financiación para que accedas a eso que tanto querés al
        precio más accesible y con la mejor cuota. Televisores, Smart TV,
        Celulares libres, Notebooks, Tablets, Aires Acondicionados, Heladeras,
        Lavarropas y muchos productos en oferta. Disfrutá de la evolución que
        sólo te puede brindar CompuStore. ¡Bienvenido a la Superevolución!
      </Parrafo>
    </Description>

  );
};

const InfoProducto = () => {
  return (
    /* hace referencia al container */

    <Producto>
      <Estado> Nuevo | vendidos 10 </Estado>
      <Name>
        {/* <h1> Bolso Mochila Morral Antirobo Con Puerto Usb Carga Q23</h1>  */}
      </Name>
      <Price>
        <h4>$ 1000</h4>
      </Price>
      <MetodoPago>
        <h1>Metodo de Pago</h1>
        <img src={metodo} alt="Mtodo de Pago" />
      </MetodoPago>

      <StartRating />

      <CardEnvio>
        <CheckIcon />
        <div>
          <span className="title">Envío a nivel nacional</span>
          <span className="detalle">
            <p> Devolución gratis </p>
            <p> Tienes 30 días desde que lo recibes. </p>
          </span>
        </div>
      </CardEnvio>
      <Stock>
        <p>Stock disponible:</p>
        <strong>100 unidades</strong>
      </Stock>
      <ButtonComprar>
        <Button className="comprar">Comprar ahora</Button>
      </ButtonComprar>
      <ButtonCarrito>
        <Button className="carrito">Agregar al Carrito</Button>
      </ButtonCarrito>
    </Producto>
  );
};

const Garantia = () => {
  return (
    <Section>
      <h5>Garantia</h5>
      <div>
        <span>
          <p className="title">Compra Protegida con Mercado Pago.</p>
          <p className="description">
            Recibe el producto que esperabas o te devolvemos tu dinero
          </p>
        </span>
        <span>
          <p className="title">Garantía del Producto</p>
          <p className="description">Garantía de: 3 meses</p>
        </span>
        <p className="conoce__mas"> Conocer más sobre garantía</p>
      </div>
    </Section>
  );
};