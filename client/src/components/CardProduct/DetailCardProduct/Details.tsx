import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  detailsProduct,
  Articulo,
  ArticuloCarrito,
  clearStateDetail,
} from "../../../actions/index";
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
import Swal from "sweetalert2";

export default function Details() {
  const { id } = useParams();
  let detail = useSelector((state: ReduxState) => state.detailsProduct);
  const dispatch = useDispatch<any>();
  const history = useNavigate();

  const detalle: ArticuloCarrito = {
    id: detail?.id,
    name: detail?.name,
    brand: detail?.brand,
    stock: detail?.stock,
    price: detail?.price,
    img: detail?.img,
    state: detail?.state,
    categoryId: detail?.categoryId,
    category: detail?.category,
    totalCount: 1,
    precioTotal: detail?.price,
  };

  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!carrito) {
    carrito = [];
  }

  const [articulo, setArticulo] = useState([carrito]);
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
    return ()=>{
      dispatch(clearStateDetail())
    }
  }, [dispatch, articulo]);

  function handlerAgregarCarrito(detalle, accion: string) {
    setArticulo(detalle);
    // if (carrito) {
    const index = carrito.findIndex((art) => art.id === detalle.id);
    if (index === -1) {
      //agrego
      localStorage.setItem("item", JSON.stringify(detalle));
      carrito.push(JSON.parse(localStorage.getItem("item")));
      localStorage.setItem("carrito", JSON.stringify(carrito));
      localStorage.setItem("item", JSON.stringify(""));
      const Toast = Swal.mixin({
        //alerta que muestra que se agrego producto
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Se agreg?? tu producto al carrito",
      });

      accion === "comprar" ? history("/ShoppingCart") : history("/home");
    } else {
      //no agrego sumo.
      //detalle.totalCount = detalle.totalCount + 1;
      let carritoAux = JSON.parse(localStorage.getItem("carrito"));
      carritoAux[index].totalCount = carritoAux[index].totalCount + 1;
      carritoAux[index].precioTotal =
        carritoAux[index].price * carritoAux[index].totalCount;
      localStorage.setItem("carrito", JSON.stringify(carritoAux));
      
      const Toast = Swal.mixin({
        //alerta que muestra que se agrego producto
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Se agreg?? tu producto al carrito",
      });
 
      accion === "comprar" ? history("/ShoppingCart") : history("/home");
    }
   
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
                <h4>$ {detail?.price.toFixed(2)}</h4>
              </Price>
              <MetodoPago>
                <h1>Metodo de Pago</h1>
                <img src={metodo} alt="Mtodo de Pago" />
              </MetodoPago>

              <StartRating />

              <CardEnvio>
                <CheckIcon />
                <div>
                  <span className="title">Env??o a nivel nacional</span>
                  <span className="detalle">
                    <p> Devoluci??n gratis </p>
                    <p> Tienes 30 d??as desde que lo recibes. </p>
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
                {
                  detalle.stock === 0
                  ? <ButtonComprar>
                  <button disabled={true}>
                   <h1>Sin Stock</h1>
                   </button>
                </ButtonComprar>
                  : <>
                   <ButtonComprar>
                <Button
                  className="comprar"
                  onClick={() => handlerAgregarCarrito(detalle, "comprar")}
                >
                  Comprar ahora
                </Button>
              </ButtonComprar>
              {/* </Link> */}

              <ButtonCarrito>
                <Button
                  className="carrito"
                  onClick={() => handlerAgregarCarrito(detalle, "agregar")}
                >
                  Agregar al Carrito
                </Button>
              </ButtonCarrito></>
                }
             
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
        La evoluci??n no para. Por eso CompuStore es experto en tecnolog??a de la
        m??s avanzada. En www.compustore.com te ofrecemos un sitio web renovado
        para que encuentres la mayor variedad de electrodom??sticos, tecno y
        entretenimiento en tu hogar. Nuestro equipo de expertos est?? preparado
        para asesorarte y brindarte todos los d??as una experiencia de compra
        personalizada que se adapte a lo que busc??s. Tambi??n contamos con un
        servicio t??cnico especializado, con asistencia total en posventa para
        que disfrutes todos los d??as de tu producto como si fuera el primero.
        Adem??s, ofrecemos ofertas especiales, descuentos y planes de
        financiaci??n para que accedas a eso que tanto quer??s al precio m??s
        accesible y con la mejor cuota. Televisores, Smart TV, Celulares libres,
        Notebooks, Tablets, Aires Acondicionados, Heladeras, Lavarropas y muchos
        productos en oferta. Disfrut?? de la evoluci??n que s??lo te puede brindar
        CompuStore. ??Bienvenido a la Superevoluci??n!
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
        <img src={metodo} alt="Metodo de Pago" />
      </MetodoPago>

      <StartRating />

      <CardEnvio>
        <CheckIcon />
        <div>
          <span className="title">Env??o a nivel nacional</span>
          <span className="detalle">
            <p> Devoluci??n gratis </p>
            <p> Tienes 30 d??as desde que lo recibes. </p>
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
          <p className="title">Garant??a del Producto</p>
          <p className="description">Garant??a de: 3 meses</p>
        </span>
        <p className="conoce__mas"> Conocer m??s sobre garant??a</p>
      </div>
    </Section>
  );
};
