export default function LogEntrie({ entrie }) {
    return (
        <div>
            <p><strong>{entrie.createdAt} : {entrie.user.name}</strong> {entrie.action} : {entrie.text}</p>
        </div>
    );
};