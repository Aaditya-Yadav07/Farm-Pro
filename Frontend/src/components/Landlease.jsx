import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../../public/land.json";
import Cards from './FarmLand';

function landforlease() {

  const filterData = list.filter((data) => data.category === "Farming");
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

      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8 ">
        <div className='"h-auto w-full flex flex-wrap flex-col items-center "'>
          <h1 className="font-semibold text-2xl md:text-4xl font-bold pb-2">Available lands for Lease</h1>
          <div className="w-48 h-1 border-b-[4px] border-yellow-500 rounded-2xl mt-2 md:mt-2 mb-12"></div>
          <p className='text-xl items-center font-bold'>Farm Pro offers a reliable and flexible solution for farmers looking to lease land for contract farming. By connecting landowners with experienced farmers, we ensure that quality agricultural land is accessible for those interested in expanding their farming operations. With Farm Pro, you can easily find fertile land for lease, tailored to the specific needs of contract farming.</p>
        </div>

        <div>
          <Slider {...settings}>
            {filterData.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>

  )
}

export default landforlease
