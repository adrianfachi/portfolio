import Link from "next/link"

type Props = {
    number: number
    name: string
    image: string
    caption: string
    link: string
}

function Project({number, name, image, caption, link}: Props) {
  return (
    <div className="text-[12px] w-full sm:w-[70%] flex flex-col gap-3 md:w-[40%] lg:w-[30%]">
        <h3> <span className="text-purple break-all">Project {number}</span> // {name}</h3>
        <div className="flex flex-col">
          <img src={image} className="rounded-t-lg w-[100%]"/>
          <div className="bg-[#02061890] h-fit pb-4 px-2 rounded-b-lg">
            <p className="py-4">{caption}</p>
            <Link href={link} target='_blank' className="rounded bg-gray p-1.5 text-white">ver-projeto</Link>
          </div>
        </div>
    </div>
  )
}

export default Project