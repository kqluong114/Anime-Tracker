import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

function AnimeSearch() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let [searchParams] = useSearchParams();
  useSearchParams({ q: "" });

  const query = searchParams.get("q") ?? "";
  const filter = searchParams.get("filter") ?? "popularity";

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=${filter}&sort=asc`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
  }, [query, filter]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.length > 0 ? (
          <div className="mx-auto max-w-5xl content-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item) => (
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
        ) : (
          <p>No results found for "{query}"</p>
        )
      )}
    </>
  );
}

export default AnimeSearch
