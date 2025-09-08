import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

function AnimeSearch() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  let [searchParams] = useSearchParams();
  useSearchParams({ q: "" });

  const query = searchParams.get("q") ?? "";
  const filter = searchParams.get("filter") ?? "popularity";
  const url = `https://api.jikan.moe/v4/anime?q=${query}&order_by=${filter}&sort=asc&page=${page}`;

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
  }, [query, filter]);

  return (
    <>
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
        <div className="mx-auto max-w-5xl content-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shows.map((item) => (
            <div key={item.mal_id} className="rounded border-1">
              <img className="w-full" src={item.images.jpg.image_url} alt={item.title} />
              <div className="px-6 py-4">
                <Link to={`/anime/${item.mal_id}`} className="font-bold text-xl mb-2">{item.title}</Link>
                <p className="text-gray-700 text-base">
                  {item.synopsis ? item.synopsis.substring(0, 100) + '...' : 'No synopsis available.'}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Score: {item.score}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Episodes: {item.episodes}</span>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default AnimeSearch
