import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import MyCarousel from "../components/Carousel";

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5001/api/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    response = await response.json();

    console.log("API RESPONSE ", response);   

    setFoodItem(response[0] || []);
    setFoodCat(response[1] || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />


      <MyCarousel search={search} setSearch={setSearch} />

      <div className="container">
        {foodCat && foodCat.length > 0 ? (

          foodCat.map((data) => (
            <div key={data._id} className="mb-5">

              <h3 className="mt-4">{data.CategoryName}</h3>
              <hr />

              <div className="row g-4">

                {foodItem.length > 0 && foodItem
                  .filter(item =>

                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(filterItems => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3 d-flex"
                    >
                      <Card foodItem={filterItems} />
                    </div>
                  ))}

              </div>

            </div>
          ))
        ) : (
          <h1 className="text-center mt-5">Loading...</h1>
        )}
      </div>

      <Footer />
    </>
  );
}
