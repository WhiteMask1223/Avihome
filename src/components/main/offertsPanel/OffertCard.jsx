export default function OffertCard({ imageSrc, title, location, rating, disponibility, services, type }) {
  return (
    <div className="w-52 border border-gray-300 rounded-xl shadow-sm p-2 my-2 mx-auto">

      <div className="bg-gray-200 h-40 rounded-xl flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-gray-400">IMG</span>
        )}
      </div>
      
      {/* Título */}
      <h2 className="mt-4 text-lg font-bold">{title}</h2>
      
      {/* Ubicación */}
      <p className="text-sm text-gray-500">{location}</p>
      
      {/* Calificación */}
      <div className="flex items-center mt-2">

        {Array(5).fill().map((_, index) => (
          <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>&#9733;</span>
        ))}
        <span className="ml-2 font-bold">{disponibility}</span>
        <span>{Object.values(services).join(', ')}</span>
        <span>{type}</span>

      </div>
    </div>
  );
};