import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Shamim
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Shamim Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/techjmi'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Shamim"
            year={new Date().getFullYear()}
          />
        <div className="flex gap-6 sm:mt-0 mt-4 justify-center items-center">
  <a
    href="https://www.facebook.com/profile.php?id=100047398065321"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 transform hover:scale-110"
  >
    <BsFacebook size='1.5em'/>
  </a>
  <a
    href="https://www.instagram.com/mernvibes/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-pink-600 text-white shadow-lg hover:bg-pink-700 hover:shadow-xl transition duration-300 transform hover:scale-110"
  >
    <BsInstagram size='1.5em'/>
  </a>
  <a
    href="https://github.com/techjmi"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-900 hover:shadow-xl transition duration-300 transform hover:scale-110"
  >
    <BsGithub size='1.5em'/>
  </a>
  <a
    href="https://shamim-portfolio-u1yp.onrender.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl transition duration-300 transform hover:scale-110"
  >
    <BsDribbble size='1.5em'/>
  </a>
</div>

        </div>
      </div>
    </Footer>
  );
}