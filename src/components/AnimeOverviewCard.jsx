import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnimeOverviewCard() {
  // get :id from url
  const [data, setData] = useState({}); 
  let params = useParams();

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${params.animeId}`);
        setData(await res.json());
      }
      catch (err) {
        console.log(`There was an error with fetching an anime for the AnimePage: ${err}`);
      }

    }

    fetchAnime();
  }, [params]);

  // use id to display information about the anime
  // handle backend with ratings
  // fetch rating data from mal or from personal backend
  // fetch watch status from person backend
  return (
    data ? (
      <img src={data.img} alt="" />
    ) : (
      <div>Loading</div>
    )

  )
}