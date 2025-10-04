import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimeOverviewCard from "../components/AnimeOverviewCard";
import StaffSection from "../components/StaffSection";
import { CharacterSection } from "../components/AnimePage/CharacterSection";

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
    }).then((res) => res.json());
  }, [params]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return data.title ? (
    <>
      <AnimeOverviewCard content={data} />
      {/* <StaffSection mal_id={data.mal_id} /> */}
      <CharacterSection mal_id={data?.mal_id} />
    </>
  ) : (
    <span>loading...</span>
  );
}

export default Anime;
