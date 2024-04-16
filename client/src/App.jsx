//import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import SignIn from "./pages/SignInPage/SignIn";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Pet from "./pages/Pet";
import { useSelector } from "react-redux";
import Search from "./pages/Search";
import Vehicle from "./pages/Vehicle";
import CreatePost from "./pages/CreatePost";
import CreateCarPost from "./pages/CreateCarPost";
import UpdateVehicle from "./pages/UpdateVehicle";
import CreatPetsPost from "./pages/CreatPetsPost";
import UpdatePet from "./pages/UpdatePet";
import CreatSecondHandPost from "./pages/CreateSecondHandPost";
import SecondHand from "./pages/SecondHand";
import UpdateSecondHand from "./pages/UpdateSecondHand";
import Accessibilik from "accessibility-react-widget";

export default function App() {
  const { imageClicked } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {!imageClicked && <Header />}
      <Accessibilik />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/vehicle/:vehicleId" element={<Vehicle />} />
        <Route path="/pet/:petId" element={<Pet />} />
        <Route path="/secondhand/:secondHandId" element={<SecondHand />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/create-vehicle" element={<CreateCarPost />} />
          <Route path="/create-pet" element={<CreatPetsPost />} />
          <Route path="/create-secondhand" element={<CreatSecondHandPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
          <Route
            path="/update-vehicle/:vehicleId"
            element={<UpdateVehicle />}
          />
          <Route path="/update-pet/:petId" element={<UpdatePet />} />
          <Route
            path="/update-secondhand/:secondHandId"
            element={<UpdateSecondHand />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
