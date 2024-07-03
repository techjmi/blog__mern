import blog from "../assets/Projects/blog.png";
import curd from "../assets/Projects/curd.png";
import flipkart from "../assets/Projects/flipkart.png";
import notes from "../assets/Projects/notes.png";
import recipe from "../assets/Projects/reciep.png";
import food from '../assets/Projects/food.png'
import portfolio from '../assets/Projects/portfolio.png'
import todo from '../assets/Projects/todo.png'
const projects = [
    {
        imgPath: blog,
        title: "Blog Application",
        description: "A MERN stack application for creating, editing, and managing blog posts with user authentication and a rich text editor.",
        ghLink: "https://github.com/techjmi/blog__mern",
        demoLink: "https://blog-mern-cfpm.onrender.com/",
      },
      {
        imgPath: portfolio, 
        title: "Portfolio in ReactJS",
        description: "A personal portfolio website built with React.js to showcase my projects, skills, and experience. It includes sections for about me, projects, and contact information.",
        ghLink: "https://github.com/techjmi/portfolio_react",
        demoLink: "https://shamim-portfolio-u1yp.onrender.com/",
      },
      {
        imgPath: food,
        title: "Food Web Application",
        description: "An e-commerce web app built with MERN stack for food ordering, featuring user authentication, order tracking, and payment integration.",
        ghLink: "https://github.com/techjmi/food-web",
        demoLink: "https://food-application-web-tios.onrender.com/",
      },
      {
        imgPath: recipe,
        title: "Recipe Search Application",
        description: "A recipe search app using the Forkify API. Search recipes by ingredients, view instructions, and save favorites.",
        ghLink: "https://github.com/techjmi/Recipe_Search",
        demoLink: "https://brilliant-sprite-34b3f9.netlify.app/",
      },
      {
        imgPath: notes,
        title: "Notes App",
        description: "A notes app built with React.js for creating, editing, and organizing notes with Markdown support and local storage.",
        ghLink: "https://github.com/techjmi/notes-app",
        demoLink: "https://notes-react-sr48.onrender.com/",
      },
      {
        imgPath: curd,
        title: "CRUD Application,Redux",
        description: "A React.js CRUD app with Redux Thunk for asynchronous state management, demonstrating CRUD operations.",
        ghLink: "https://github.com/techjmi/Redux-toolkit-thunk",
        demoLink: "https://redux-toolkit-thunk.onrender.com/",
      },
      {
        imgPath: flipkart,
        title: "Flipkart Clone",
        description: "A clone of Flipkart using React.js, featuring product listings, user authentication, cart management, and checkout.",
        ghLink: "https://github.com/techjmi/flipkart-clone",
        demoLink: "https://flipkart-frontend-50y3.onrender.com/",
      },
      {
        imgPath: todo,
        title: "To-Do List App",
        description: "A to-do list application built with React.js and local storage. Users can add, edit, delete, and mark tasks as completed",
        ghLink: "https://github.com/techjmi/Todo-Application",
        demoLink: "https://astounding-pothos-9baa22.netlify.app/", 
      },
];

  

export default projects;
