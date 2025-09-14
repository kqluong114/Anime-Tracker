import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { StarIcon, FilmIcon } from '@heroicons/react/16/solid';
import _ from "lodash"
import AnimeCard from '../components/AnimeCard';
import FilterSelectionCard from '../components/FilterSelectionCard';

function AnimeSearch() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const throttledFetchRef = useRef(null);
  // const [url, setUrl] = useState("");
  let [searchParams] = useSearchParams();
  useSearchParams({ q: "" });

  let query = searchParams.get("q") ?? "";
  let filter = searchParams.get("filter") ?? "popularity";
  let url = `https://api.jikan.moe/v4/anime?q=${query}&order_by=${filter}&sort=asc&page=${page}`;
  let pagination = {};

  useEffect(() => {
    console.log("rerender"); 
  })

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
    console.log("fetching");
    try {
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setShows((prev) => {
          pagination = data.pagination;
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
    if(!throttledFetchRef.current) {
      throttledFetchRef.current = _.throttle(fetchData, 2000);
    }
    throttledFetchRef.current();
  }, []);

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Harem",
    "Historical", "Horror", "Isekai", "Mecha", "Military", "Music", "Mystery",
    "Psychological", "Romance", "School", "Sci-Fi", "Seinen", "Shoujo",
    "Shounen", "Slice of Life", "Sports", "Supernatural", "Thriller"
  ];

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

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    throttledFetchRef.current();
    return pageRef.current + 1;
  }

  const handleHasMore = () => {
    return pagination.has_next_page;
  }

  return (
    <>
      <FilterSelectionCard />
      <InfiniteScroll
        dataLength={() => shows.length} //This is important field to render the next data
        next={handleNextPage}
        hasMore={handleHasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more data to load</b>
          </p>
        }
      >
        <div className="mx-auto p-4 max-w-[1000px] flex flex-wrap gap-4 justify-center overflow-hidden">
          {shows ? shows.map((item) => (
            <AnimeCard content={item} />
          )) : <div>loading...</div>}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default AnimeSearch
