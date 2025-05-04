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
        <hr/>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
             <div>
             <h1 className="font-semibold text-xl pb-2">Available lands for Lease</h1>
             <p>Farm Pro offers a reliable and flexible solution for farmers looking to lease land for contract farming. By connecting landowners with experienced farmers, we ensure that quality agricultural land is accessible for those interested in expanding their farming operations. With Farm Pro, you can easily find fertile land for lease, tailored to the specific needs of contract farming.</p>
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
