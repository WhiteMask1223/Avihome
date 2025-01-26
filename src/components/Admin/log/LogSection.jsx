import LogEntrie from "./LogEntrie";

export default function LogSection({logEntries}) {
    return (
        <div className="bg-subSectionThemeBackground p-4 rounded-lg shadow-inner shadow-sectionThemeShadow mt-4 h-96 overflow-y-auto">
            {logEntries.map((entrie, index) => (
                <LogEntrie key={index} entrie={entrie}/>
            ))}
        </div>
    );
};