import { useEffect, useState } from 'react'

function Anime() {
  fetch(`https://api.jikan.moe/v4/anime/1`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })

  return (
      <>
        <h1>Anime Title</h1>
        
      </>
  );
}

export default Anime
