import Link from "next/link";

export default function NavSession() {
    return(
        <div className="flex space-x-4 text-right">
            <Link href="/login" className="text-white px-4 py-2">Iniciar Sesión</Link>
            <Link href="/signin" className="bg-[#0FAB9F] text-white px-4 py-2 rounded-lg hover:bg-[#0B8D83]">Registrarse</Link>   
        </div>
    );
}