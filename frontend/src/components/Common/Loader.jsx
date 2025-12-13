import React from "react";
import { useLoaderStore } from "../../store/useLoaderStore";
import { Bars } from 'react-loader-spinner'
const Loader = () => {
  // const loading = useLoaderStore((state) => state.loading);

  // if (!loading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-primary3">
      <Bars
        height="80"
        width="80"
        color="#5a4a2e"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
