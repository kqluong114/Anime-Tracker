import { useParams } from 'react-router-dom';
import { use, useEffect, useState } from 'react'
import AnimeOverviewCard from '../components/AnimeOverviewCard';

function Anime() {
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.animeId}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data.data);
    })
  }, [params]);

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    data.title ? (
      <>
        <AnimeOverviewCard content={data} />
        <p>Score</p>
        
        <button></button>
        <p>Anime Description</p>
        <p>Studio</p>
        <p>Episodes</p>
      </>
      ) :
      <span>loading...</span>
  );
}

export default Anime
