import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { StarIcon, FilmIcon } from '@heroicons/react/16/solid';

function AnimeSearch() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // const [url, setUrl] = useState("");
  let [searchParams] = useSearchParams();
  useSearchParams({ q: "" });

  let query = searchParams.get("q") ?? "";
  let filter = searchParams.get("filter") ?? "popularity";
  let url = `https://api.jikan.moe/v4/anime?q=${query}&order_by=${filter}&sort=asc&page=${page}`;

  let pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  let loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
    console.log(`loading = ${loadingRef.current}`);
  }, [loading]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setShows((prev) => {
          const extistingIds = new Set(prev.map(item => item.mal_id));
          const newItems = data.data.filter(item => !extistingIds.has(item.mal_id));
          return page === 1 ? data.data : [...prev, ...newItems];
        });
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let subscribed = true;
    (async () => {
      if (subscribed) {
        await fetchData(1);
      }
    })();
    return () => (subscribed = false);
  }, [url]);

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Harem",
    "Historical", "Horror", "Isekai", "Mecha", "Military", "Music", "Mystery",
    "Psychological", "Romance", "School", "Sci-Fi", "Seinen", "Shoujo",
    "Shounen", "Slice of Life", "Sports", "Supernatural", "Thriller"
  ];

  const genreIds = {
    Action: 1,
    Adventure: 2,
    Comedy: 4,
    Drama: 8,
    Ecchi: 10,
    Fantasy: 12,
    Harem: 13,
    Historical: 14,
    Horror: 15,
    Isekai: 16,
    Mecha: 17,
    Military: 18,
    Music: 19,
    Mystery: 20,
    Psychological: 21,
    Romance: 22,
    School: 23,
    SciFi: 24,
    Seinen: 25,
    Shoujo: 26,
    Shounen: 27,
    SliceOfLife: 28,
    Sports: 29,
    Supernatural: 30,
    Thriller: 31
  };

  const handleGenreClick = async (genre) => {
    try {
      let genreId = genreIds[genre];
      url += `&genres=${genreId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setShows(data.data);
        setPage(1);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  function GenreButton({children}) {
    return <button 
    className='border rounded-2x1 hover:bg-blue-200'
    onClick={handleGenreClick}
    >
      {children}
    </button>
  }

  return (
    <>
      <div>Filters</div>
      <div>Genres</div>
      <div className='flex-wrap flex gap-2 mb-4'>
        {genres.map((genre) => <GenreButton key={genre}>{genre}</GenreButton>)}
      </div>
      <InfiniteScroll
        dataLength={() => shows.length} //This is important field to render the next data
        next={() => {
          setPage((prev) => prev + 1);
          fetchData(pageRef.current + 1);
          return pageRef.current + 1;
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more data to load</b>
          </p>
        }
      >
        <div className="mx-auto flex flex-wrap gap-2 justify-center">
          {shows.map((item) => (
            <div key={item.mal_id} className="rounded w-[300px]">
              <div className='relative h-3/4'>
                <img className="w-full h-full overflow-hidden object-cover" src={item.images.jpg.image_url} alt={item.title} />
                <div className="absolute bottom-1.5 left-1.5 flex p-0 gap-0.5 w-auto text-xs">
                  <div className="bg-[oklch(.9_.08_174)] flex gap-1 justify-center text-black text-bold w-fit rounded-l-md p-1">
                    <StarIcon className="w-4 content-center" /> <span className="content-center">{item.score ? item.score + "/10": "N/A"}</span>
                  </div>
                  <div className="bg-[oklch(.9_.2_1)] flex gap-1 justify-center text-black text-bold w-fit rounded-r-md p-1">
                    <FilmIcon className="w-4 content-center" /> <span>{item.episodes ? item.episodes : 0}</span>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <Link to={`/anime/${item.mal_id}`} className="font-bold text-base mb-2 line-clamp-1">{item.title}</Link>
                <p className="text-gray-700 text-xs">
                  {item.synopsis ? item.synopsis.substring(0, 100) + '...' : 'No synopsis available.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default AnimeSearch
