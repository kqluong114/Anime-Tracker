import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

function Anime() {
  const [data, setData] = useState({});
  let params = useParams();
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data.data);
    })
  }, [params]);

  return (
      <>
        <h1>{data.title}</h1>
        {/* <img src="" alt="" /> */}
        <p>Score</p>
        
        <button></button>
        <p>Anime Description</p>
        <p>Studio</p>
        <p>Episodes</p>
      </>
  );
}

export default Anime
