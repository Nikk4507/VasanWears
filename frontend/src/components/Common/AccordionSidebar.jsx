import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const AccordionItem = ({ item, activeTab, setActiveTab }) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);

  const toggleAccordion = () => {
    const content = contentRef.current;

    if (wrapperRef.current.classList.contains("open")) {
      wrapperRef.current.classList.remove("open");
      gsap.to(content, {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    } else {
      wrapperRef.current.classList.add("open");
      gsap.to(content, {
        height: content.scrollHeight,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      // On desktop: accordion stays open
      wrapperRef.current.classList.add("open");
      gsap.set(contentRef.current, {
        height: "auto",
      });
    }
  }, []);

  return (
    <div ref={wrapperRef} className="mb-3 border-b pb-2">
      <p
        className="text-gray-700 font-semibold cursor-pointer flex justify-between items-center"
        onClick={toggleAccordion}
      >
        {item.label}
        <span className="text-xl">⌄</span>
      </p>

      {item.children && (
        <ul
          ref={contentRef}
          className="overflow-hidden h-0 pl-3 transition-all"
        >
          {item.children.map((child) => (
            <li
              key={child.tab}
              onClick={() => setActiveTab(child.tab)}
              className={`py-2 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-200 ${
                activeTab === child.tab ? "bg-blue-100 font-medium" : ""
              }`}
            >
              {child.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccordionItem;
