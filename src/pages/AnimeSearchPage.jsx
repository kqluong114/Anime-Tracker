import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { StarIcon, FilmIcon } from '@heroicons/react/16/solid';
import _ from "lodash"
import AnimeCard from '../components/AnimeCard';
import FilterSelectionCard from '../components/FilterSelectionCard';

function AnimeSearch() {
  const [shows, setShows] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const throttledFetchRef = useRef(null);
  let [searchParams] = useSearchParams();
  useSearchParams({ q: "" });

  let query = searchParams.get("q") ?? "";
  let filter = searchParams.get("filter") ?? "popularity";

  let loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
    console.log(`loading = ${loadingRef.current}`);
  }, [loading]);

  const fetchData = async (page) => {
    let url = `https://api.jikan.moe/v4/anime?q=${query}&order_by=${filter}&sort=asc&page=${page}`;
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setPagination(data.pagination);
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
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!throttledFetchRef.current) {
      throttledFetchRef.current = _.throttle((page) => {
        fetchData(page)
      }, 2000);
    }
    throttledFetchRef.current(pagination?.current_page ?? 1);
  }, []);

  const handleNextPage = () => {
    let currentPage = pagination?.current_page ?? 1;
    return throttledFetchRef.current(currentPage + 1);
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
