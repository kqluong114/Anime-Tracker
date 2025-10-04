export const CharacterCard = ({ character, voiceActor }) => {
  if (!voiceActor || !character) return null;

  return (
    <div key={voiceActor.person.mal_id} className="flex">
      <img
        src={voiceActor.person.images.jpg.image_url}
        alt=""
        className="h-20"
      />
      <div className="flex flex-col justify-between p-2">
        <p id="name">{voiceActor.person.name}</p>
        <p id="language">{voiceActor.language}</p>
      </div>
    </div>
  );
};
