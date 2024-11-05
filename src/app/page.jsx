import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";

export default function HomePage() {

  return (
    <main>
      <div className="flex">
        <SidebarSection></SidebarSection>
        <div className="h-full w-fit mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
      </div>
    </main>
  );
}