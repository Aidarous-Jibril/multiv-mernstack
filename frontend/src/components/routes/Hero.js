import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Hero = () => {
  return (
    <>
    
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[70%]`}>
        
        <h1
          className={`text-[55px] leading-[1.2] 800px:text-[80px] text-[#3d3a3a] font-[600] capitalize`}
        >
         Create your  unique <br/> <strong className="text-red-700">Online Store </strong>
        </h1>
        <p className="pt-4 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            GoStore is a leading Multivendor & Marketplace Platform{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
           <div className={`${styles.button} mt-4`}>
            <span className="text-[#fff] font-[Poppins] text-[18px] ">
              Get Started
            </span>
          </div> 

        </Link>
      </div>
    </div>

    {/* <div className="relative isolate px-6 pt-14 lg:px-8">

    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Data to enrich your online business</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
    </div>
  </div> */}
    </>
  );
};

export default Hero;
