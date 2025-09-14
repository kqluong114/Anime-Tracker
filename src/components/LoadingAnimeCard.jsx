function LoadingAnimeCard() {
  function renderCard() {
    let elements = [];
    for (let i = 0; i < 3; i ++) {
      elements.push(
        <div className="flex-1 w-sm h-20 min-w-[150px] max-w-[250px]">
          <div className="h-3/4 bg-gray-600"></div>
          <div className="rounded-2xl bg-gray-600"></div>
        </div>
      )
    }
    return elements;
  }

  return (
    <div className="mx-auto p-4 bg-amber-300 w-full max-w-[1000px] flex flex-wrap gap-4 justify-center overflow-hidden">
      {renderCard()}
    </div>
  );
}

export default LoadingAnimeCard;