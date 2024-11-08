import { OFFERTS_PANEL_STYLES } from "./offertsPanelStyles";

export default function OffertCard({ imageSrc, title, location, rating, availability }) {
  return (
    <div className={OFFERTS_PANEL_STYLES.GENERAL_STYLES}>

      <div className={OFFERTS_PANEL_STYLES.IMG_DIV}>
        {imageSrc ? (
          <img src={imageSrc} alt={'IMG'} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-gray-400">IMG</span>
        )}
      </div>

      {/* Título */}
      <h2 className={OFFERTS_PANEL_STYLES.TITTLE}>{title}</h2>

      {/* Ubicación */}
      <p className={OFFERTS_PANEL_STYLES.LOCATION}>{location}</p>

      <div className="flex items-center justify-between mt-2">

        {/* Calificación */}
        <div className="mx-2">
          {Array(5).fill().map((_, index) => (
            <span key={index}>
              {index < rating ? <i className="ri-star-fill text-checkboxThemeSelected text-lg"></i> : <i className="ri-star-line text-checkboxThemeSelected text-lg"></i>}
            </span>
          ))}
        </div>

        <div className="relative inline-block">
          <i className={`ri-home-2-fill text-4xl ${availability == 0 ? 'text-red-500' : 'text-checkboxThemeSelected'}`}></i>
          <span className={OFFERTS_PANEL_STYLES.AVAILABILITY}>{availability}</span>
        </div>

      </div>
    </div>
  );
};