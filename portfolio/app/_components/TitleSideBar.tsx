import { IoIosArrowDown } from "react-icons/io" 

type Props = { 
  text: string
  active: boolean
  onClick: () => void
}

function TitleSideBar({ text, active, onClick }: Props) {
  return (
    <div 
      className={`flex items-center cursor-pointer ${active ? "text-white" : ""}`} 
      onClick={onClick}
    >
      <IoIosArrowDown className={`${active ? "" : "-rotate-90"} transform duration-300`} />
      <h3 className="text-sm">{text}</h3>
    </div>
  )
}

export default TitleSideBar;
