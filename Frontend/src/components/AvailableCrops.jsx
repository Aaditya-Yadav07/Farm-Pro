import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../../public/list.json";
import Cards from './Crops';
function AvailableCrops() {
  const filterData = list.filter((data) => data.category === "Vegetable");
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (

    <>
      <div className="bg-gray-100 py-10">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        
          <div className="h-auto w-full flex flex-wrap flex-col items-center ">
            <h1 className="font-semibold sm:text-2xl md:text-4xl pb-2">Available Crops for Contract</h1>
            <div className="w-48 h-1 border-b-[4px] border-yellow-500 rounded-2xl mt-2 md:mt-2 mb-12"></div>
          </div>

          <p className='text-xl font-bold'>Farm Pro can help your business  better by just picking the right smart
            contracts! It'll also ensure timely payment and security for the farmers.</p>
       

        <div>
          <Slider {...settings}>
            {filterData.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div >
      </div >
      </div>
    </>

  )
}

export default AvailableCrops
