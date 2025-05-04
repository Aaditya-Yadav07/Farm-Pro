import React from 'react';
import banner from "../../public/Banner.jpg";

function Banner() {
    return (
        <>
            <div
                className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-20 my-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="w-full md:w-2/3 lg:w-1/2 order-2 md:order-1 mt-12 md:mt-32 mb-6 md:mb-10 bg-white bg-opacity-80 p-4 md:p-6 rounded-md shadow-md">

                    <div className="space-y-12">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Your Favourite Source Of Smart Contracts{" "}
                            <span className="text-pink-500"> Every Season!!! </span>
                        </h1>
                        <h2 className="text-xl md:text-2xl font-bold">What is Farm Pro?</h2>

                        <p className="text-sm md:text-base">
                            Farm Pro is an innovative contract farming platform designed to empower farmers and streamline the agricultural supply chain. 
                            Farm Pro eliminates the need for intermediaries, directly connecting farmers with buyers, ensuring fair pricing and stable market access. 
                            Farm Pro helps farmers identify and address issues early, boosting crop yield and quality. 
                            Farm Pro bridges the gap between agriculture and technology, creating a reliable ecosystem for efficient, profitable, and sustainable farming.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;


