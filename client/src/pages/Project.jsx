import React from "react";
import projects from "../constants/projects";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
const Project = () => {
  return (
    <>
      <div className=" flex p-5 min-h-screen flex-col gap-3 w-full">
        <h1 className="text-3xl text-gray-500 text-center mt-5">
          Explore My Projects
        </h1>
        <p className="font-semibold mx-auto w-full md:w-4/5">
          Welcome, dear visitor! I'm excited to share some of my projects with
          you. This page is where I showcase my handcrafted creations, each one
          a labor of love and passion for coding. Take a stroll through the
          projects listed below, where you'll find a mix of web wonders waiting
          to be explored. From dynamic web applications to captivating websites,
          there's something here for everyone. Feel free to click on the
          deployed links to experience the projects live in action. And if
          you're curious about the inner workings, the source code is just a
          click away. So, without further ado, let's dive in and discover the
          magic of coding together. Happy exploring!
        </p>
        {/* <div className="">
          
        </div> */}
        <section className="project-section">
  <div className="mx-auto px-4 py-10 md:py-20 w-full md:w-4/5">
    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-yellow-400">
      My Recent <span className="text-purple-500">Works</span>
    </h1>
    <p className="text-center mb-8">
      Here are a few projects I've worked on recently.
    </p>
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 backdrop-blur-md">
      {projects.map((project, index) => (
        <div
          key={index}
          className="rounded-md shadow-xl border-2 overflow-hidden hover:cursor-pointer transition-all duration-300 transform hover:scale-100 border-teal-500 hover:border-2 h-[300px] relative group"
        >
          <div className="image-container overflow-hidden h-40 group-hover:h-24 transition-all duration-300">
            <img
              src={project.imgPath}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          <div className="details-container p-4 group-hover:h-[320px] h-60 transition-all duration-300">
          <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="mb-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">{project.description}</p>
            <div className="flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={project.ghLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 bg-slate-100 rounded-sm px-2 py-0 flex items-center gap-1 shadow-md"
              >
                <BsGithub />
                GitHub
              </a>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 bg-slate-100 rounded-sm px-2 py-0 flex items-center gap-1 shadow-md"
              >
                <FaExternalLinkAlt />
                Demo
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      </div>
    </>
  );
};

export default Project;
