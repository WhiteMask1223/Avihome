import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";
import NavSessionSidebar from "@/components/navbar/NavSessionSidebar";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <NavSessionSidebar></NavSessionSidebar>
        <SidebarSection></SidebarSection>
        <div className="container-sm mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
      </div>
    </main>
  );
}
