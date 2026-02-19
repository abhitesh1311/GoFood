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
          top: "90%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center"
        }}
      >
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}   
          style={{
            width: "500px",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            fontSize: "18px",
            
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
