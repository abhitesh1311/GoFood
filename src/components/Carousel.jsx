import Carousel from "react-bootstrap/Carousel";

function MyCarousel({ search, setSearch }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      
      <div
        style={{
          position: "absolute",
          top: "75%",              
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          width: "90%",            
          maxWidth: "420px",       
          textAlign: "center",
          padding: "0 10px"        
        }}
      >
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",          
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            outline: "none",
            fontSize: "clamp(14px, 2vw, 18px)", 
            boxSizing: "border-box"
          }}
        />
      </div>

   
      <Carousel fade>
        <Carousel.Item>
          <img
            src="/chicken1.png"
            alt="Chicken"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/burger1.png"
            alt="Burger"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/pizza1.png"
            alt="Pizza"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MyCarousel;