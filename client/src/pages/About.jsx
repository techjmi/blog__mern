import React from "react";
// import AdsPart from '../AdsPart'
import AdsPart from './AdsPart';
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
    <div className="flex min-h-screen flex-col md:w-3/5 md:mx-auto text-justify gap-10 mx-4">
      <h1 className="text-3xl font-semibold mt-8 text-gray-500 text-center">
        About Shamim Akhter
      </h1>
      <p className="font-semibold ">
        Hey there, I'm Shamim Akhter, a MERN stack developer, and I'm thrilled
        to have you here! This blog app is my personal project, a cozy corner
        where you can find all sorts of interesting stuff – from tech insights
        to worldly musings and more. I've put a lot of heart into building this
        space, where I share my thoughts, experiences, and discoveries. It's a
        place where we can chat about all things tech and explore the exciting
        world of coding together. So, kick back, relax, and let's embark on this
        fun journey of learning and discovery. Welcome aboard!
      </p>
      <Link to="/" className="text-center text-2xl font-semibold">Lets Explore it !</Link>
      <AdsPart />
    </div>
    </>
    
  );
};

export default About;
