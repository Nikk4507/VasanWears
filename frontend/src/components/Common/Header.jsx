import React, { useState } from "react";
import TopBar from "../Layout/TopBar";
import Navbar from "./Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SearchBar from "./SearchBar";
const Header = () => {
  const [searchModel, setSearchModel] = useState(false);
  
  return (
    <header className="relative">
      <TopBar />
      <Navbar setSearchModel={setSearchModel} searchModel={searchModel} />
      <SearchBar searchModel={searchModel} />
    </header>
  );
};

export default Header;
