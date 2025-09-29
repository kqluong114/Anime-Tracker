import { useQuery } from "@tanstack/react-query";
import { getAnimeSearch } from "../../api/animeAPI";
import AnimeCard from "../AnimeCard";
import { useEffect, useState } from "react";
import { getBannerById } from "../../api/animeAPI";

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
  const [popularAnime, setPopularAnime] = useState([]);
  const [popularBanners, setPopularBanners] = useState([]);
  const popularQuery = useQuery({
    queryKey: ["home", "popular"],
    queryFn: () =>
      getAnimeSearch({
        limit: 5,
        type: "tv",
        sort: "asc",
        order_by: "popularity",
        ...getSeasonDataRange(getCurrentSeason(), new Date().getFullYear()),
      }),
  });

  const malIds = popularQuery?.data?.data.map((anime) => anime.mal_id);

  const bannerQuery = useQuery({
    queryKey: ["anilist", "banners", malIds],
    queryFn: () => getBannerById(malIds),
    enabled: !!malIds?.length,
  });

  console.log(bannerQuery ? bannerQuery.data : "");

  return (
    <>
      {popularQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex h-[300px] w-full snap-x snap-mandatory gap-4 overflow-x-scroll scroll-smooth whitespace-nowrap">
          {popularQuery?.data?.data.map((item, index) => (
            // <AnimeCard content={item} />
            <div className="flex w-screen flex-shrink-0">
              <div className="">
                <p>title</p>
              </div>
              <img
                className="h-full flex-shrink-0 overflow-y-hidden object-cover"
                src={bannerQuery.data?.[`anime${item.mal_id}`]?.bannerImage}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
