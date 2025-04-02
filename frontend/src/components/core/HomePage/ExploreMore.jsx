import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.find((course) => course.tag === value);
    if (result) {
      setCourses(result.courses);
      setCurrentCard(result.courses[0]?.heading || "");
    }
  };

  return (
    <div className="w-full">
      {/* Explore more section */}
      <div className="text-4xl font-semibold text-center my-10">
        Unlock the <HighlightText text={"Power of Code"} />
        <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Tabs Section */}
      <div className="hidden md:flex gap-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            className={`text-[16px] flex flex-row items-center gap-2 px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer 
              ${currentTab === ele ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"}`}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </div>
        ))}
      </div>

      {/* Cards Group */}
      <div className="flex flex-wrap gap-10 justify-center w-full px-3 lg:px-0 my-10">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
