import React from "react";
import { useNavigate,Link } from "react-router-dom";

const EduContent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen font-sans bg-white ">

      {/* Header */}
      <header className="bg-[#112B3C] text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Logo and Title */}
    <div className="flex items-center gap-3">
      <img src="/farm-pro-logo.png" alt="Farm Pro Logo" className="h-10 w-auto" />
      <h1 className="text-2xl font-bold">Farm Pro</h1>
    </div>

    {/* Navigation Title and Dashboard Button */}
    <div className="flex items-center gap-4">
      <h2 className="text-xl md:text-2xl font-semibold text-center">Educational Content for Farmers</h2>
      <button
        onClick={() => navigate('/farmerdashboard')}
        className="text-2xl hover:text-yellow-400 focus:outline-none"
        title="Go to Dashboard"
      >
        👤
      </button>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="p-6 mt-24">
        {/* <h2 className="text-3xl font-semibold text-center mb-6 mt-16">Educational Content for Farmers</h2> */}

        {/* Section 1: Farming Tips */}
        <div className="bg-green-600 rounded-xl p-6 text-white mb-6">
          <h3 className="text-2xl font-semibold mb-4">Farming Tips</h3>
          <ul className="list-disc pl-5">
            <li>Tip 1:  Assess your farm's soil quality, water availability, and climate conditions. Choose crops that are in demand in the market and align with the buyer's specifications. Always prioritize crops that will thrive on your land.</li>
            <li>Tip 2: Ensure proper soil preparation, crop rotation, pest control, and irrigation practices. Use certified seeds and fertilizers, and ensure compliance with the buyer’s quality specifications. Regularly monitor crop health and growth.</li>
            <li>Tip 3:  Plan your crop planting and harvesting according to the buyer’s requirements, which may include delivery dates or harvest window periods. Use climate data and agricultural advice to time the growing cycle accurately.</li>
            <li>Tip 4: Implement sustainable practices like crop rotation, green manure, and organic farming to improve soil health. Regularly test your soil to identify nutrient deficiencies and correct them through organic or chemical amendments as necessary.</li>
            <li>Tip 5: Stay ahead of pest and disease risks by regularly inspecting your crops. Use integrated pest management (IPM) techniques to minimize the use of chemicals while effectively controlling pests. Keep an eye on weather patterns that may influence pest and disease cycles.</li>
          </ul>
        </div>

        {/* Section 2: Educational Articles */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-2xl font-semibold mb-4">Articles on Contract Farming</h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">Understanding Contract Farming and its Benefits</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">How to Enter into a Contract Farming Agreement</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">Legal Aspects of Contract Farming in India</a>
            </li>
          </ul>
        </div>

        {/* Section 3: Video Tutorials */}
        <div className="bg-green-600 rounded-xl p-6 text-white mb-6">
          <h3 className="text-2xl font-semibold mb-4">Video Tutorials</h3>
          <ul className="space-y-4">
            <li>
              <a href="https://youtu.be/Fcnm388gb98?si=U5hjIdvZcy6lnEhk" className="text-white-500 hover:underline">How to Prepare the Land for Farming (Video)</a>
            </li>
            <li>
              <a href="https://youtu.be/63Pi-lIDtCo?si=R3eVSvWjIHNUm0y0" className="text-white-500 hover:underline">Maximizing Crop Yield (Video)</a>
            </li>
            <li>
              <a href="https://youtu.be/ZkzDFKGlCP4?si=IVaP2TW-uweWi_So" className="text-white-500 hover:underline">Dealing with Seasonal Changes in Agriculture (Video)</a>
            </li>
            <li>
              <a href="https://youtu.be/hvWuHBobbog?si=yujkrRvCTPSC4VwS" className="text-white-500 hover:underline">What is Contract Farming in India (Video )</a>
            </li>


          </ul>
        </div>
      </main>
    </div>
  );
};

export default EduContent;
