"use client"

import { useState } from 'react';

export default function TestFunction () {
  // Estado para controlar la apertura/cierre del panel
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la apertura/cierre del panel
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Botón para abrir/cerrar el panel */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-teal-500 text-white rounded-lg focus:outline-none"
      >
        {isOpen ? 'Cerrar' : 'Menú'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-semibold mb-4">Menú</h2>
        <ul className="space-y-4">
          <li>
            <button className="w-full text-left px-4 py-2 bg-teal-500 rounded hover:bg-teal-600">
              Iniciar Sesión
            </button>
          </li>
          <li>
            <button className="w-full text-left px-4 py-2 bg-teal-500 rounded hover:bg-teal-600">
              Registrarse
            </button>
          </li>
        </ul>
      </div>

      {/* Fondo oscuro cuando el panel está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
