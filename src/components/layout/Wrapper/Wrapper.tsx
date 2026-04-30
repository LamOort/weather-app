import Search from "@/features/search/Search";
import Header from "@/components/layout/Header/Header";
import MainContent from "@/components/layout/MainContent/MainContent";
import UnitToggle from "@/features/unitToggle/UnitToggle";

const Wrapper = () => {
  return (
    <div className="app-container">
      <Header>
        <Search />
        <UnitToggle />
      </Header>

      <MainContent />
    </div>
  );
};

export default Wrapper;
