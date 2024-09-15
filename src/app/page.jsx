import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <SidebarSection></SidebarSection>
        <div className="container-sm mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
      </div>
    </main>
  );
}
