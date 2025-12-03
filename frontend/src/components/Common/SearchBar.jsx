import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiSearch2Line } from "@remixicon/react";

const SearchBar = ({ searchModel }) => {
  const [searchText, setSearchText] = useState("");
  const barRef = useRef(null);
  const t1 = useRef(null);

  useGSAP(() => {
    t1.current = gsap.timeline({ paused: true });

    t1.current.from(barRef.current, {
      y: 80, // slide down
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    
  }, []);

  useGSAP(() => {
    if (searchModel) {
      t1.current.play();
    } else {
      t1.current.reverse();
    }
  }, [searchModel]);

  return (
    <div
      ref={barRef}
      className="absolute left-0 top-[120px] md:top-[143px] w-full bg-primary2 py-4 md:py-8 searchBarContainer z-1 flex justify-center items-center px-4 md:px-10 xl:px-50"
    >
      {/* Example input */}
      <input
        type="text"
        placeholder="What are you looking for..."
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        className="w-full pr-6 pl-12 text-lg outline-none border border-slate-100/35 mx-auto placeholder:text-white py-2 rounded-xl text-white placeholder:text-sm"
      />
      <RiSearch2Line className="text-white w-7 absolute left-6 md:left-12 xl:left-52" />
    </div>
  );
};

export default SearchBar;
