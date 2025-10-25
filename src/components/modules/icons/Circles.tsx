import { FC } from "react"

const Circles: FC = () => {
  return (
    <div className="w-[203px] h-[203px] border-[1px] border-white/25 rounded-full mx-auto flex justify-center items-center translate-y-1/2">
      <div className="w-[145px] h-[145px] border-[1px] border-white/50 rounded-full flex justify-center items-center">
        <div className="w-[95px] h-[95px] border-[1px] border-white/80 rounded-full" />
      </div>
    </div>
  );
};

export default Circles
