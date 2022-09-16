import styled from "styled-components";

export interface CarouselProps {
  
}

export default function Carousel() {
   
return (
    <CarouselContainer>
<div id="carouselExampleCaptions" className="carousel slide" margin-top="70px" data-bs-ride="carousel" >
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://res.cloudinary.com/carina-bosio/image/upload/v1662592738/SL-030320-28610-18_2_m1g2di.jpg" className="d-block w-100" alt="..."/>
      {/* <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div> */}
    </div>
    <div className="carousel-item">
      <img src="https://res.cloudinary.com/carina-bosio/image/upload/v1662592759/SL-030320-28610-18_3_cimmbs.jpg" className="d-block w-100" alt="..."/>
      {/* <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div> */}
    </div>
    <div className="carousel-item">
      <img src="https://res.cloudinary.com/carina-bosio/image/upload/v1662592765/SL-030320-28610-18_4_xsb6wc.jpg" className="d-block w-100" alt="..."/>
      {/* <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div> */}
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </CarouselContainer>
);
}

const CarouselContainer = styled.div`
  margin-top: 70px;
  z-index: -1;
`;

