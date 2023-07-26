const ProgressBar = ({ progress } : { progress: string }) => {
  return (
    <div className="relative w-full h-4 bg-[#202027] rounded-lg overflow-hidden">
      <div
        className={`absolute top-0 left-0 h-full bg-[#669999] w-[${progress}%]`}>
      </div>
    </div>
  );
};
export default ProgressBar;