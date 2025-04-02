import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import HighlightText from './HighlightText';

const Codeblocks = ({ position, heading, subheading, button1, button2, codeblock, backgroundGradient, codecolor }) => {
  return (
    <div className={`flex ${position} w-full gap-[1.5rem] font-inter md:flex-row mx-auto lg:max-w-[70%]`}>
      {/* Heading and Subheading */}
      <div className='flex flex-col gap-[0.8rem] w-full md:w-1/2 justify-evenly'>
        <div>
          <h2 className='text-[1.9rem] font-[600]'>{heading}</h2>
          <p className='text-[1rem] text-richblack-300'>{subheading}</p>
        </div>

        <div>
          <div className='flex mt-[1.5rem] justify-center gap-[1.5rem]'>
            {button1}
            {button2}
          </div>
        </div>
      </div>

      {/* Code Animation Section */}
      <div className='w-full flex justify-center max-w-[470px] mx-auto h-fit align-middle'>
        <div className='w-full bg-gradient-to-br from-[#0E1A2D3D] to-[#111E3261] border-2 border-white/50 flex p-2 gap-2 relative'>
          {/* Line Numbers */}
          <div className='flex flex-col w-[10%] text-center font-inter font-[700]'>
            {[...Array(11).keys()].map((num) => (
              <p key={num}>{num + 1}</p>
            ))}
          </div>

          {/* Animated Code */}
          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor}`}>
            <TypeAnimation
              sequence={[
                // Clear the text before starting the animation
                '',
                50,
                // Split the codeblock into lines and animate each line
                ...codeblock.split("\n").reduce((acc, line, index) => {
                  const newText = acc.length > 0 ? `${acc[acc.length - 2]}\n${line}` : line;
                  return [...acc, newText, 50];
                }, []),
                // Clear the text at the end of the animation
                '',
                50,
              ]}
              wrapper="pre"
              cursor={true}
              repeat={Infinity}
            />
          </div>

          {/* Gradient Blur Effect */}
          <div className={`absolute w-[90%] h-[80%] opacity-20 ${backgroundGradient} rounded-[50%] left-[-100px] top-[-30px] blur-[68px]`} />
        </div>
      </div>
    </div>
  );
};

export default Codeblocks;