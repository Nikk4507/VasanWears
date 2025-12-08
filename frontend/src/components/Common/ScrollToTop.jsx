import { RiArrowUpLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <>
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 md:bottom-6 right-6 bg-primary4 text-primary2 rounded-full shadow-lg hover:bg-primary2 hover:text-primary3 transition-all w-13 h-13 cursor-pointer flex justify-center items-center"
        >
          <RiArrowUpLine/>
        </button>
      )}
    </>
  );
}
