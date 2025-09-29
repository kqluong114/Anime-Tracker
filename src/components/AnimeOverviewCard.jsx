import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { MdHeight } from "react-icons/md";

const useTruncateElement = ({ ref }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  // const [offsetHeight, setOffsetHeight] = useState(0);
  // const [scrollHeight, setScrollHeight] = useState(0);
  // const wait = useRef(false);

  useLayoutEffect(() => {
    const updateHeights = () => {
      if (isReadMore) return;
      // let offsetHeight = ref.current.offsetHeight;
      // let scrollHeight = ref.current.scrollHeight;
      // setIsTruncated(offsetHeight < scrollHeight);
      setIsTruncated(ref.current.offsetHeight < ref.current.scrollHeight);
    };

    // const throttleHeightUpdate = () => {
    //   if (wait.current) return;
    //   wait.current = true;
    //   setTimeout(() => {
    //     wait.current = false;
    //   }, 200);
    // };

    const observer = new ResizeObserver(updateHeights);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return { isTruncated, isReadMore, setIsReadMore };
};

const AnimeOverviewCard = ({ content }) => {
  // get :id from url
  const ref = useRef(null);
  const { isTruncated, isReadMore, setIsReadMore } = useTruncateElement({
    ref,
  });
  // const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: scrollPos,
      behavior: "auto",
    });
    console.log(scrollPos);
  }, [scrollPos]);
  // use id to display information about the anime
  // handle backend with ratings
  // fetch rating data from mal or from personal backend
  // fetch watch status from person backend
  const handleShowMore = () => {
    // setShowFullSynopsis((prev) => !prev);
    setIsReadMore((prev) => !prev);
    setScrollPos(window.scrollY);
  };

  return (
    <section
      id="overview-card"
      className="bg-shade-400 m-auto flex flex-col items-center gap-4 p-4"
    >
      <h1 className="text-2xl">{content.title}</h1>
      <div>
        <img
          src={content.images.jpg.image_url}
          alt={content.images.webp.small_image_url}
          className="w-48"
        />
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span>Score: {content.score}</span>
        <span>My Score: Not added yet</span>
        <span>Difficulty: Not added yet</span>
        <span>My Difficulty: Not added yet</span>
      </div>
      <div
        id="description"
        className="flex w-full flex-col flex-wrap gap-4 text-sm"
      >
        <div className={`flex flex-wrap gap-1`}>
          {[
            content.genres.map((genre) => (
              <button
                key={genre.name}
                className="bg-mist-500 rounded-2xl px-2 py-1 text-sm"
              >
                {genre.name}
              </button>
            )),
          ]}
        </div>
        <h2 className="text-lg">Synopsis</h2>
        <p
          ref={ref}
          className={`${isReadMore ? "" : "line-clamp-10"} overflow-hidden transition-all duration-150 ease-in-out`}
        >
          {content.synopsis}
        </p>
        <button
          className={`bg-mist-400 m-auto w-full max-w-md rounded-2xl p-1 ${isTruncated || isReadMore ? "visible" : "invisible"}`}
          onClick={handleShowMore}
        >
          {isReadMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default AnimeOverviewCard;
