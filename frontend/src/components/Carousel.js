"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const images = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
];

const Carousel = () => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        watchSlidesProgress={true} // Perbaiki pagination yang berpindah-pindah
        threshold={10} // Mencegah slide berubah saat geser sedikit
        longSwipesMs={300}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        loopedSlides={images.length}
        centeredSlides={true}
        className="w-full h-[85vh] overflow-hidden rounded-b-[130px]" // 3/4 layar
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-10 md:right-20 md:bottom-10">
        <div className="custom-pagination flex space-x-2"></div>
      </div>

      {/* Tailwind Styling untuk Pagination */}
      <style>
        {`
    .swiper-pagination {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-end !important; /* Agar dots ada di kanan */
      bottom: 10px !important; /* Sesuaikan posisi */
      right: 20px !important;
    }

    .swiper-pagination-bullet {
      width: 12px !important;
      height: 8px !important;
      background-color: #D3D3D3 !important;
      opacity: 0.5 !important;
      border-radius: 50px !important;
      margin: 0 4px !important;
      transition: all 0.3s ease !important;
    }

    .swiper-pagination-bullet-active {
      width: 24px !important; /* Lonjong saat aktif */
      height: 8px !important;
      background-color: #3B3B3B !important;
      opacity: 1 !important;
      border-radius: 10px !important;
      transform: scale(1.1) !important;
    }
  `}
      </style>
    </div>
  );
};

export default Carousel;
