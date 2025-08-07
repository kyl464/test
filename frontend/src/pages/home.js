import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";
import Recomendation from "../components/Recomendation";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <Navbar />
        <div className="relative w-full pb-10">
          <Carousel />
          <SearchBar />
        </div>
        <Recomendation />
      </div>
      <Footer />
    </>
  );
};

export default Home;
