import { useEffect, useState } from "react";

function AnimeOverviewCard({ content }) {
  // get :id from url
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
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
    setShowFullSynopsis((prev) => !prev);
    setScrollPos(window.scrollY);
  };

  return (
    <section
      id="overview-card"
      className="flex flex-col items-center p-4 gap-4 m-auto bg-shade-400"
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
      <div id="description" className="flex flex-col gap-4 text-sm">
        <div className="flex gap-1">
          {[
            content.genres.map((genre) => (
              <button
                key={genre.name}
                className="p-1 rounded-2xl bg-mist-500 text-sm"
              >
                {genre.name}
              </button>
            )),
          ]}
        </div>
        <h2 className="text-lg">Synopsis</h2>
        <p
          className={`${
            showFullSynopsis ? "" : "line-clamp-10"
          } transition-all duration-500 ease-in-out`}
        >
          {content.synopsis}
        </p>
        <button
          className="p-1 bg-mist-400 rounded-2xl w-full max-w-md m-auto"
          onClick={handleShowMore}
        >
          {showFullSynopsis ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
}

export default AnimeOverviewCard;
