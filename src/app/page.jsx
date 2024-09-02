import FilterSidebar from "@/components/main/aside/FilterSidebar";
import OffertsMain from "@/components/main/offertsPanel/OffertsMain";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <FilterSidebar></FilterSidebar>
        <div className="container-sm mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
      </div>
    </main>
  );
}
