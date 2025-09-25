function LoadingAnimeCard() {
  function renderCard() {
    let elements = [];
    for (let i = 0; i < 3; i++) {
      elements.push(
        <div className="h-20 w-sm max-w-[250px] min-w-[150px] flex-1">
          <div className="h-3/4 bg-gray-600"></div>
          <div className="rounded-2xl bg-gray-600"></div>
        </div>,
      );
    }
    return elements;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-wrap justify-center gap-4 overflow-hidden bg-amber-300 p-4">
      {renderCard()}
    </div>
  );
}

export default LoadingAnimeCard;
