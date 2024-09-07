export default function OffertCard({ imageSrc, title, location, rating, availability, type }) {
  return (
    <div className="w-52 bg-sectionThemeBackground border border-sectionThemeBorder rounded-xl shadow-lg shadow-sectionThemeShadow p-2 my-2 mx-auto cursor-pointer">

      <div className="bg-sectionThemeShadow h-40 rounded-xl flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt={'IMG'} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-gray-400">IMG</span>
        )}
      </div>
      
      {/* Título */}
      <h2 className="mt-4 text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>
      
      {/* Ubicación */}
      <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{location}</p>
      
      <div className="flex items-center justify-between mt-2">

        {/* Calificación */}
        <div className="mx-2">
          {Array(5).fill().map((_, index) => (
            <span key={index}>
              { index < rating ? <i className="ri-star-fill text-checkboxThemeSelected text-lg"></i> : <i className="ri-star-line text-checkboxThemeSelected text-lg"></i> }
            </span>
          ))}
        </div>

        <span className="mx-4 font-bold text-right">{availability}</span>

      </div>
    </div>
  );
};