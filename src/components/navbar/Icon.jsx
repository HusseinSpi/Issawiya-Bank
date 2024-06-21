export const Icon = ({ icon: IconComponent, name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex justify-center rounded px-2 py-1.5 ${
        active ? "text-blue-500" : "text-gray-500"
      } hover:bg-gray-50 hover:text-gray-700`}
    >
      <IconComponent
        className={`size-6 ${active ? "text-blue-500" : "opacity-75"}`}
      />
      <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible z-20">
        {name}
      </span>
    </button>
  );
};
