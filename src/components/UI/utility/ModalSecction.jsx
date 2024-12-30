export default function ModalSection({ children, trigger, setTrigger }) {

    if (trigger) return (
        <section>
            {children}

            <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setTrigger(!trigger)} />
        </section>
    );
};