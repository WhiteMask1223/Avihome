"use client"

import { useContext } from "react";
import Link from "next/link";

import { UtilityContex } from "@/contexts/Utility.context";
import CardImage from "./CardImage";

import { OFFERTS_PANEL_STYLES } from "./offertsPanelStyles";

export default function OffertCard({ id, imageSrc, title, location, rating, availability }) {

  const { loading, setLoading } = useContext(UtilityContex);

  return (
    <section className={OFFERTS_PANEL_STYLES.GENERAL_STYLES}>

      <Link href={`/offerts/${id}`}>

        <div className={OFFERTS_PANEL_STYLES.IMG_DIV} onClick={() => setLoading(!loading)}>
          {imageSrc ? (
            <CardImage
              imageSrc={imageSrc}
            />
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
            <i className={`ri-home-2-fill text-4xl ${availability.roomsAvailable == 0 ? 'text-red-500' : 'text-checkboxThemeSelected'}`}></i>
            <span className={OFFERTS_PANEL_STYLES.AVAILABILITY}>{availability.roomsAvailable}</span>
          </div>

        </div>

      </Link>

    </section>
  );
};