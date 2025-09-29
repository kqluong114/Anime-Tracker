import { Link } from "react-router-dom";
import { StarIcon, FilmIcon } from "@heroicons/react/16/solid";

const AnimeCard = ({ content }) => {
  return (
    <div key={content.mal_id} className="max-w-[250px] min-w-[150px] flex-1">
      <div className="relative h-3/4">
        <Link to={`/anime/${content.mal_id}`}>
          <div className="group absolute h-full w-full p-2 transition-all duration-200 hover:bg-[oklch(.4_.08_174)]/50 hover:backdrop-blur-xl">
            <div className="flex flex-col gap-2 text-xs text-ellipsis opacity-0 transition-all duration-200 group-hover:opacity-100">
              <div>
                <p className="text-bold text-sm">Synopsis</p>
                <p className="max-h-20 overflow-auto rounded bg-black/5 p-1 text-[oklch(.9_0_0)]">
                  {content.synopsis
                    ? content.synopsis
                    : "No synopsis available."}
                </p>
              </div>
              <p className="line-clamp-3">
                Genres:{" "}
                <span className="text-[oklch(.9_0_0)]">
                  {content.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
            </div>
          </div>
          <img
            className="h-full w-full overflow-hidden object-cover"
            src={content.images.jpg.image_url}
            alt={content.title}
          />
          <div className="absolute bottom-1.5 left-1.5 flex w-auto gap-0.5 p-0 text-xs">
            <div className="text-bold flex w-fit justify-center gap-1 rounded-l-md bg-[oklch(.9_.08_174)] p-1 text-black">
              <StarIcon className="w-4 content-center" />{" "}
              <span className="content-center">
                {content.score ? content.score + "/10" : "N/A"}
              </span>
            </div>
            <div className="text-bold flex w-fit justify-center gap-1 rounded-r-md bg-[oklch(.9_.2_1)] p-1 text-black">
              <FilmIcon className="w-4 content-center" />{" "}
              <span>{content.episodes ? content.episodes : 0}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="py-4">
        <Link
          to={`/anime/${content.mal_id}`}
          className="mb-2 line-clamp-1 truncate text-base font-bold transition-all duration-200 hover:text-[oklch(.9_.08_174)]"
        >
          {content.title}
        </Link>
      </div>
    </div>
  );
};

export default AnimeCard;
