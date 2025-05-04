import React from 'react';
import Home from './home/Home';
import Disease from './disease/Disease';
import CostPred from './costPred/CostPred';
import DemandPred from './demand/DemandPred';
import Weather from './weather/Weather';
import LogIn from './login/LogIn';
import SignUp from './signup/SignUp';
import Meerut from './components/LandDetails/Meerut';
import Jalna from './components/LandDetails/Jalna';
import Bikaner from './components/LandDetails/Bikaner';
import Cabbage from './components/CropDetails/Cabbage';
import Onion from './components/CropDetails/Onion';
import Potato from './components/CropDetails/Potato';
import FarmerDashboard from './user/FarmerDashboard';
import CorporateDashboard from './user/CorporateDashboard';
import EduContent from "./user/EduContent";
import { Route, Routes } from 'react-router-dom';
import ManageContracts from './user/ManageContracts';
import ManageProduct from './user/ManageProduct';
import CreateProduct from './user/CreateProduct';
import CreateLand from './user/corporate/CreateLand';
import ManageLand from './user/corporate/ManageLand';
import Managecontract from './user/corporate/Managecontract';
import AvailableCrops from './user/corporate/AvailableCrops';
import AvailableLands from './user/AvailableLands';
import Support from './components/Support';
import ContactUs from './components/Contact';
import MakeContractPage from './user/corporate/Makecontract';



function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/demand" element={<DemandPred />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/cost" element={<CostPred />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Land Details Pages */}
        <Route path="/landdetails/meerut" element={<Meerut />} />
        <Route path="/landdetails/jalna" element={<Jalna />} />
        <Route path="/landdetails/bikaner" element={<Bikaner />} />
        {/* Crop Details Pages */}
        <Route path="/cropdetails/cabbage" element={<Cabbage />} />
        <Route path="/cropdetails/onion" element={<Onion />} />
        <Route path="/cropdetails/potato" element={<Potato />} />

        {/* Dashboard pages */}
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
        <Route path="/content" element={<EduContent />} />
        <Route path="/managecontracts" element={<ManageContracts />} />
        <Route path="/manageproduct" element={<ManageProduct />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/farmerdashboard" element={<FarmerDashboard />} />
        <Route path="/farmerdashboard" element={<EduContent />} />
        <Route path="/corporatedashboard" element={<CorporateDashboard />} />
        <Route path="/createland" element={<CreateLand />} />
        <Route path="/manageland" element={<ManageLand />} />
        <Route path="/managecontract" element={<Managecontract />} />
        <Route path="/availablecrops" element={<AvailableCrops />} />
        <Route path="/availablelands" element={<AvailableLands />} />
        <Route path="/make-contract" element={<MakeContractPage />} />

      </Routes>
      
    </>
  );
}

export default App;


