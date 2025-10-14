import { IoMdClose } from "react-icons/io";

type Props = {
  tabs: string[];
  onClose: (index: number) => void;
  onOpen: (tab: string) => void;
  activeTab: string;
  setLastActiveTab: (tab: string) => void;
};

function TabsAbout({
  tabs,
  onClose,
  onOpen,
  activeTab,
  setLastActiveTab,
}: Props) {
  return (
    <div className="hidden w-full h-fit border-b border-b-gray overflow-x-auto md:flex select-none flex-nowrap scroll-style">
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`flex gap-2 items-center text-sm border-r border-r-gray py-[7px] px-4 cursor-pointer shrink-0 ${
              activeTab == tab ? "active" : ""
            }`}
          >
            <p
              className="shrink-0"
              onClick={() => {
                onOpen(tab);
                setLastActiveTab(tab);
              }}
            >
              {tab}
            </p>
            <IoMdClose
              onClick={() => {
                onClose(index);
              }}
              className="text-nowrap shrink-0"
            />
          </div>
        );
      })}
    </div>
  );
}

export default TabsAbout;
