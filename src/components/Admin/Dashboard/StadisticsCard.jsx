export default function StadisticsCard({ tittle, number }) {
    return (
        <div className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4 w-full">
            <h3 className="w-fit mx-auto font-bold text-gray-500">{tittle}</h3>
            <p className="w-fit mx-auto font-bold text-2xl mt-3">{number}</p>
        </div>
    );
};