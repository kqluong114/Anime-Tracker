import { useQuery } from "@tanstack/react-query";
import { getAnimeSearch } from "../../api/animeAPI";
import AnimeCard from "../AnimeCard";
import { useEffect, useRef, useState } from "react";
import { getBannerById, getPopularBanners } from "../../api/animeAPI";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill, GoDot } from "react-icons/go";

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1; // JS months: 0-11, so +1
  if (month >= 1 && month <= 3) return "winter";
  if (month >= 4 && month <= 6) return "spring";
  if (month >= 7 && month <= 9) return "summer";
  if (month >= 10 && month <= 12) return "fall";
};

const getSeasonDataRange = (season, year) => {
  switch (season) {
    case "winter":
      return { start_date: `${year}-01-01`, end_date: `${year}-03-31` };
    case "spring":
      return { start_date: `${year}-04-01`, end_date: `${year}-06-30` };
    case "summer":
      return { start_date: `${year}-07-01`, end_date: `${year}-09-30` };
    case "fall":
      return { start_date: `${year}-10-01`, end_date: `${year}-12-31` };
    default:
      return {};
  }
};

export const BannerSection = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    const child = container.children[index];
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center" });
      setActiveIndex(index);
    }
  };

  // useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   container.addEventListener("scroll", handleNext);
  //   return () => {
  //     container.
  //   }
  // }, [])

  const handleNext = () => {
    scrollToIndex((activeIndex + 1) % 5);
    console.log(activeIndex);
  };

  // const useEffect (() => {
  //   const scrollContainerChildren = Array.from(scrollContainerRef.current.children);
  //   const scrollObserver = new IntersectionObserver(entries => {
  //     entries
  //     setActiveIndex(entry.index);
  //   })
  //   scrollContainerChildren.forEach((child) => scrollObserver.observe(child));
  //   return () => scrollObserver.disconnect();
  // }, [])

  const popularQuery = useQuery({
    queryKey: ["home", "popular"],
    queryFn: () =>
      getAnimeSearch({
        limit: 5,
        type: "tv",
        sort: "asc",
        order_by: "popularity",
        ...getSeasonDataRange("summer", new Date().getFullYear()),
      }),
  });

  const malIds = popularQuery?.data?.data.map((anime) => anime.mal_id);

  // const bannerQuery = useQuery({
  //   queryKey: ["anilist", "banners", malIds],
  //   queryFn: () => getBannerById(malIds),
  //   enabled: !!malIds?.length,
  // });

  const bannerQuery = useQuery({
    queryKey: ["anilist", "banners"],
    queryFn: getPopularBanners,
    enabled: !!malIds?.length,
  });

  console.log(bannerQuery ? bannerQuery?.data?.Page.media : "");
  console.log(popularQuery ? popularQuery?.data?.data : "");

  const BannerScrollButton = ({ index }) => {
    return (
      <button
        className="text-mist-400 w-fit text-2xl hover:text-white"
        onClick={() => scrollToIndex(index)}
      >
        {index === activeIndex ? <GoDotFill /> : <GoDot />}
      </button>
    );
  };

  return (
    <>
      {popularQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative pb-4">
          <div
            id="hideScroll"
            ref={scrollContainerRef}
            className="scrollbar-hidden scrollbar m-auto flex h-[500px] w-full snap-x snap-mandatory gap-20 overflow-x-scroll overflow-y-hidden scroll-smooth p-4 whitespace-nowrap"
          >
            {popularQuery?.data?.data.map((item) => (
              // <AnimeCard content={item} />
              <div className="flex w-full flex-shrink-0 snap-center">
                <div className="z-1 -mr-44 flex flex-col justify-end gap-4 p-4">
                  <h2 className="line-clamp-2 truncate text-2xl text-wrap md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="md: line-clamp-3 truncate text-sm text-wrap md:text-[16px]">
                    {item.synopsis}
                  </p>
                  <button className="bg-mist-500 hover:bg-mist-200 w-fit cursor-pointer rounded-2xl px-4 py-2 text-sm md:text-2xl">
                    Details <IoIosArrowForward className="inline" />
                  </button>
                </div>
                <div className="h-full flex-shrink-0 overflow-hidden mask-y-from-50% mask-x-from-90%">
                  <img
                    className="h-full md:h-[130%] md:-translate-y-1/6 lg:h-[150%]"
                    src={item.images.webp.large_image_url}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-1/2 z-1 flex -translate-x-1/2 gap-1">
            {popularQuery?.data?.data.map((element, index) => {
              return <BannerScrollButton key={element.mal_id} index={index} />;
            })}
          </div>
        </div>
        //// {/* {bannerQuery?.data?.Page?.media.map((item) => ( */}
        ////   <AnimeCard content={item} />
        ////   // <div key={item.idMal} className="flex w-screen flex-shrink-0">
        ////     // {/* // {/* <div className=""> */}
        ////       // {/* // <p>{item.title.romaji}</p> */}
        ////     // </div> */}
        ////     // {/* // <img */}
        ////       // {/* // className="h-full flex-shrink-0 object-cover" */}
        ////       // {/* // src={item.bannerImage} */}
        ////       // {/* // alt="" */}
        ////     // {/* // /> */}
        ////   // </div>
        //// // {/* // ))} */}
      )}
    </>
  );
};
