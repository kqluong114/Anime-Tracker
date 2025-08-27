import { useState, useEffect } from 'react'

function SearchRecommend({search}) {
  const [recommendedSearch, setRecommendedSearch] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(handler);
    }
  }, [search]);

  useEffect(() => {
    console.log("debounced search changed");
    if (!debouncedSearch){
      setRecommendedSearch([]);
      return;
    }
    fetch(`https://api.jikan.moe/v4/anime?q=${debouncedSearch}&order_by=popularity&sort=asc&limit=4`)
    .then((res) => {
      if (!res.ok) {
        if(res.status === 429) {
          // console.error('Rate limit exceeded. Please try again later.');
          return;
          console.log("too many requests");
        } else {
          throw new Error('Network response was not ok');
          console.log("other error");
          return;
        }
      }
      return res.json();
    })
    .then((data) => { setRecommendedSearch(data.data); }) 
    .catch((err) => { console.error(err); });
  }, [debouncedSearch]);

  return (
    <div className="absolute border mt-1 rounded shadow-lg w-70 bg-white">
      { recommendedSearch.map((item) => (
        <div key={item.mal_id} className="inline-flex items-center p-1 hover:bg-green-200 w-full">
          <img className="w-10 pr-1" src={item.images.jpg.image_url} />{item.title}
        </div>
      ))}
    </div>
  )
}

export default SearchRecommend;