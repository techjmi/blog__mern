import React from "react";
import { Button } from "flowbite-react";
const AdsPart = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-between items-center rounded-tl-3xl rounded-br-3xl text-center gap-4">
      <div className=" justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Web Development?</h2>
        <p className="text-gray-500 my-2">
         Explore My Github and Portfolio
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none self-auto relative w-[50%] mx-auto"
        >
          <a
            href="https://musical-mooncake-8fc409.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Portfolio
          </a>
        </Button>
      </div>
      <div className="p-2">
        <img src="/adsimage.png" alt="Blog Logo" className="w-60 h-auto" />
      </div>
    </div>
  );
};

export default AdsPart;
