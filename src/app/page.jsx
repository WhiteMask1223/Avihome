import SidebarSection from "@/components/mainPage/aside/SidebarSection";
import OffertsMain from "@/components/mainPage/offertsPanel/OffertsMain";
import SidebarDarkBg from "@/components/utility/SidebarDarkBg";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <SidebarSection></SidebarSection>
        <div className="h-full w-fit mx-auto text-center">
          <OffertsMain></OffertsMain>
        </div>
        <SidebarDarkBg></SidebarDarkBg>
      </div>
    </main>
  );
}
