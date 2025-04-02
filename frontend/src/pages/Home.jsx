import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/common/Button';
import banner from '../assets/Images/banner.mp4'
import Codeblocks from '../components/core/HomePage/Codeblocks';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
// import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <>
      <div className='text-richblack-5'>
        <div className='w-full flex flex-col py-[2rem] px-[1rem] gap-[2.4rem] font-[500] items-center'>
          <Link to='/signup'>
            <div className='px-[1.2rem] py-2 bg-richblack-800 w-fit rounded-full transition-all duration-200 hover:scale-95 shadow-[2px_2px_0px] shadow-white/18 mx-auto'>
              <button className='flex justify-center items-center text-[1rem] gap-[18px] text-richblack-200 w-fit'>
                Become an Instructor <FaArrowRight />
              </button>
            </div>
          </Link>

          <div className='flex flex-col gap-[1rem] md:text-center md:max-w-[913px]'>
            <h1 className='text-3xl font-[600]'>Empower Your Future with <HighlightText text='Coding Skills' /></h1>
            <p className='text-richblack-300 text-[1rem] text-justify md:text-center'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
          </div>

          <div className='flex justify-center items-center gap-[1.5rem]'>
            <Button active={true}>Learn More</Button>
            <Button active={false}>Book a Demo</Button>
          </div>

         
          <div className='relative shadow-[8px_8px_0px] shadow-white lg:max-w-[70%] mx-auto'>
          <video muted loop autoPlay className='w-[100%] '>
            <source src={banner} type='video/mp4' />
          </video>

          </div>


        </div>

        <div className='py-[2rem] px-[1rem] w-full'>
          <Codeblocks
            codeblock={`#include<iostream>\nusing namespace std;\n\nint main(){\nwhile(alive){\ncout << "chai";\ncout << "code";\ncout << "sleep";\n}\nreturn 0;\n}`}
            heading={<span>Unlock your <HighlightText text="coding potential" /> with our online courses.</span>}
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            position={"flex-col md:flex-row"}
            button1={<Button active={true}>Try it Yourself <FaArrowRight /></Button>}
            button2={<Button active={false}>Learn More<FaArrowRight /></Button>}
            codecolor={"text-white"}
            backgroundGradient={"bg-gradient-to-br from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]"}
          />
        </div>

        <div className='py-[2rem] px-[1rem] w-full'>
          <Codeblocks
            codeblock={`#include<iostream>\nusing namespace std;\n\nint main(){\n\nwhile(!success){\ncout << "Work Harder";\ncout << "Never give up";\n}\nreturn 0;\n}`}
            heading={<span>Start <HighlightText text="coding in seconds" /></span>}
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            position={"flex-col md:flex-row-reverse"}
            button1={<Button active={true}>Continue Lesson <FaArrowRight /></Button>}
            button2={<Button active={false}>Learn More<FaArrowRight /></Button>}
            codecolor={"text-yellow-50"}
            backgroundGradient={"bg-gradient-to-br from-[#9CECFB] via-[#65C7F7] to-[#0052D4]"}
          />
        </div>
      </div>

        {/* Explore Section */}
        
      <div className='bg-pure-greys-5'>
        <div className='homepage_bg  flex flex-col justify-center'>
        <ExploreMore />
          <div className='w-11/12 max-w-max-content flex items-center justify-center gap-5 mx-auto'>
            <div className='flex gap-5'>
              <Button active={true} linkto='/signup'>
                Explore Full Catalogue <FaArrowRight />
              </Button>
              <Button active={false} linkto='/signup'>
                Learn More
              </Button>
            </div>
          </div>
        </div>


        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
          <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
            <div className='text-4xl font-semibold lg:w-[45%]'>
              Get the skills you need for a <HighlightText text={"job that is in demand."} />
            </div>
            <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
              <div className='text-[16px]'>
                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <Button active={true} linkto={'/signup'}>
                Learn More
              </Button>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
        <InstructorSection />
        <h1 className='text-center text-4xl font-semibold mt-8'>Reviews from other learners</h1>
        {/* <ReviewSlider /> */}
      </div>

      <Footer />
    </>
  );
};

export default Home;