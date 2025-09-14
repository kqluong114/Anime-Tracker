import { Link } from "react-router-dom";
import { StarIcon, FilmIcon } from "@heroicons/react/16/solid";

const AnimeCard = ({ content }) => {
  return (
    <div key={content.mal_id} className="flex-1 min-w-[150px] max-w-[250px]">
      <div className="relative h-3/4">
        <Link to={`/anime/${content.mal_id}`}>
          <div className="group absolute p-2 transition-all duration-200 w-full h-full  hover:bg-[oklch(.4_.08_174)]/50 hover:backdrop-blur-xl">
            <div className="flex flex-col gap-2 transition-all duration-200 text-xs opacity-0 text-ellipsis group-hover:opacity-100">
              <div>
                <p className="text-sm text-bold">Synopsis</p>
                <p className="overflow-auto max-h-20 text-[oklch(.9_0_0)] p-1 rounded bg-black/5">
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
            className="w-full h-full overflow-hidden object-cover"
            src={content.images.jpg.image_url}
            alt={content.title}
          />
          <div className="absolute bottom-1.5 left-1.5 flex p-0 gap-0.5 w-auto text-xs">
            <div className="bg-[oklch(.9_.08_174)] flex gap-1 justify-center text-black text-bold w-fit rounded-l-md p-1">
              <StarIcon className="w-4 content-center" />{" "}
              <span className="content-center">
                {content.score ? content.score + "/10" : "N/A"}
              </span>
            </div>
            <div className="bg-[oklch(.9_.2_1)] flex gap-1 justify-center text-black text-bold w-fit rounded-r-md p-1">
              <FilmIcon className="w-4 content-center" />{" "}
              <span>{content.episodes ? content.episodes : 0}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="py-4">
        <Link
          to={`/anime/${content.mal_id}`}
          className="transition-all duration-200 font-bold text-base mb-2 line-clamp-1 hover:text-[oklch(.9_.08_174)]"
        >
          {content.title}
        </Link>
      </div>
    </div>
  );
};

export default AnimeCard;
