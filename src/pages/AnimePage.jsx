import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimeOverviewCard from "../components/AnimeOverviewCard";

function Anime() {
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.animeId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });

    fetch("https://jimaku.cc/api/entries/1", {
      headers: {
        Authorization:
          "AAAAAAAADN8uAS62sGk-M_rzWC_cTlgz7UVJcT1DsWyxvSzgbD21oGd8pA",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [params]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return data.title ? (
    <>
      <AnimeOverviewCard content={data} />
      <p>Score</p>

      <button></button>
      <p>Anime Description</p>
      <p>Studio</p>
      <p>Episodes</p>
    </>
  ) : (
    <span>loading...</span>
  );
}

export default Anime;
