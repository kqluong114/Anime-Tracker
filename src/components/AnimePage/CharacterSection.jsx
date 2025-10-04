import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnimeCharacters } from "../../api/animeAPI";
import { CharacterCard } from "./CharacterCard";

export const CharacterSection = ({ mal_id }) => {
  const characterList = useQuery({
    queryKey: [mal_id, "staff"],
    queryFn: () => getAnimeCharacters(mal_id),
  });

  return characterList.isFetched ? (
    <div>
      {characterList?.data?.map((e) => (
        <CharacterCard
          key={e.character.mal_id}
          character={e.character}
          voiceActor={e.voice_actors[0]}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};
