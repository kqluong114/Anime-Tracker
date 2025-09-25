function LoadingText({ size }) {
  const sizes = {
    small: "h-2",
    medium: "h-4",
    large: "h-8",
  };

  return (
    <div className={`w-full rounded-2xl bg-gray-600 ${sizes[size]}`}></div>
  );
}

export default LoadingText;
