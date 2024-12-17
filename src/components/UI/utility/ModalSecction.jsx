export default function ModalSection({ children, trigger, setTrigger }) {

    if (trigger) return (
        <section>
            <div className="w-full sm:max-w-md h-fit m-auto bg-sectionThemeBackground p-5 rounded-2xl shadow-lg inset-0 fixed z-50">
                {children}
            </div>

            <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setTrigger(!trigger)} />
        </section>
    );
};