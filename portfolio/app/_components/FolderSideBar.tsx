import { IoIosArrowDown } from "react-icons/io";
import { FaFolder } from "react-icons/fa";

type Props = {
  text: string;
  color: string;
  active: boolean;
  onClick: () => void;
};

function FolderSideBar({ text, color, active, onClick }: Props) {
  return (
    <div
      className={`flex items-center cursor-pointer ${active ? "text-white mb-2" : ""} gap-1`}
      onClick={onClick}
    >
      <IoIosArrowDown
        className={`${active ? "" : "-rotate-90"} transform duration-300`}
      />
      <FaFolder className={`text-${color}`} />
      <h3 className="text-sm">{text}</h3>
    </div>
  );
}

export default FolderSideBar;
