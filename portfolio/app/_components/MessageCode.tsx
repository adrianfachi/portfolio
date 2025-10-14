import { useRef } from "react";

type Props = {
  menssages: string[];
};

function MessageCode({ menssages }: Props) {
  const date = new Date();
  const textContentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={textContentRef}
      className="break-all p-4 flex flex-col justify-center md:w-1/2 md:border-l border-l-gray md:p-10"
    >
      <div className="flex">
        <span className="pr-4">1 </span>
        <p>
          <span className="text-pink">const </span>{" "}
          <span className="text-purple">button</span>{" "}
          <span className="text-pink"> = </span>{" "}
          <span className="text-purple">document.querySelector</span>
          &#40;<span className="text-orange">'#sendBtn'</span>&#41;;
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">2 </span>
        <br />
      </div>
      <div className="flex">
        <span className="pr-4">3 </span>
        <p>
          <span className="text-pink">const </span>{" "}
          <span className="text-purple">message</span>{" "}
          <span className="text-pink"> = </span>
          &#123;
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">4 </span>
        <p className="pl-4">
          <span className="text-purple">name: </span>
          <span className="text-orange">"{menssages[0]}"</span>
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">5 </span>
        <p className="pl-4">
          <span className="text-purple">email: </span>
          <span className="text-orange">"{menssages[1]}"</span>
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">6 </span>
        <p className="pl-4">
          <span className="text-purple">message: </span>
          <span className="text-orange">"{menssages[2]}"</span>
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">7 </span>
        <p className="pl-4">
          <span className="text-purple">date: </span>
          <span className="text-orange">
            "
            {date
              .toLocaleDateString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })
              .replace(",", "")}
            "
          </span>
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">8 </span>
        <p>&#125;</p>
      </div>
      <div className="flex">
        <span className="pr-4">9 </span>
        <br />
      </div>
      <div className="flex">
        <span className="pr-4 break-normal">10</span>
        <p>
          <span className="text-purple">button.addEventListener</span>&#40;
          <span className="text-orange">'click'</span>, &#40;&#41;{" "}
          <span className="text-orange">{"=>"}</span> &#123;
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">11</span>
        <p className="pl-4">
          <span className="text-purple">form.send</span>&#40;
          <span className="text-purple">message</span>&#41;;
        </p>
      </div>
      <div className="flex">
        <span className="pr-4">12</span>
        <p>&#125;&#41;</p>
      </div>
    </div>
  );
}

export default MessageCode;
