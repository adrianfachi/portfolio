import React, { Dispatch, SetStateAction } from 'react'
import { TbFileTypeTxt } from 'react-icons/tb';

type Props = {
    setActiveTabs: Dispatch<SetStateAction<string[]>>;
    setActiveTab: Dispatch<string>;
    setLastActiveTab: (tab: string) => void;
    element: string
}

function SideBarElementTxt({setActiveTab, setActiveTabs, setLastActiveTab, element}: Props) {
  return (
    <div
        className="flex items-center ml-2 gap-1 cursor-pointer"
        onClick={() => {
            setActiveTabs((prev) =>
                prev.includes(element) ? prev : [...prev, element]
            );
            setActiveTab(element);
            setLastActiveTab(element);
        }}
    >
        <TbFileTypeTxt fontSize={20} />
        <span className="text-sm">{element}</span>
    </div>
  )
}

export default SideBarElementTxt