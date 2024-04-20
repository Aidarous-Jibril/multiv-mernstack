import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const CustomerService = () => {
  return (
    <>
    <Header activeHeading={5} />
    <section className="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Multivendor Marketplace Services
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Explore our range of services tailored for your multivendor marketplace website.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Refreshing Design"
            details="We specialize in designing visually appealing and user-friendly interfaces for multivendor marketplaces, ensuring an engaging experience for your users."
          />
          <ServiceCard
            title="100+ Components"
            details="Our comprehensive library of components is designed to cater to the diverse needs of multivendor marketplace websites, providing you with extensive customization options."
          />
          <ServiceCard
            title="Speed Optimized"
            details="We optimize the performance of your multivendor marketplace website to ensure fast loading times, smooth navigation, and seamless user experience."
          />
          <ServiceCard
            title="Fully Customizable"
            details="Our solutions are fully customizable to meet your unique business requirements, allowing you to personalize your multivendor marketplace website according to your brand identity."
          />
          <ServiceCard
            title="Regular Updates"
            details="We provide regular updates and maintenance services to keep your multivendor marketplace website up-to-date with the latest features, security patches, and enhancements."
          />
        </div>
      </div>
    </section>
      <Footer />
      </>

  );
};

export default CustomerService;

const ServiceCard = ({ title, details }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
            {/* Icon */}
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h4>
          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};
