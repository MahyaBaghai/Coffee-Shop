import { FC } from "react"
import { FaInstagram } from "react-icons/fa"
import { RiTelegram2Line } from "react-icons/ri"
import { SocialItem } from "@/types/social.types"

const socialItems: SocialItem[] = [
  { id: 1, icon: FaInstagram, address: "@golden_Café", url: "https://www.instagram.com" },
  { id: 2, icon: RiTelegram2Line, address: "@golden_Café", url: "https://t.me" },
];

const ContactButtons: FC = () => {
  return (
    <>
      {socialItems.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer" // security: prevents tab-napping when opening external links
            className="flex 2xl:px-5 lg:px-3 xs:px-5 px-1 py-2.5 gap-x-2 border border-orange-300 rounded-xl items-center text-orange-300 cursor-pointer
              hover:bg-gradient-to-l hover:from-orange-200 hover:to-orange-300 hover:text-zinc-700 
              active:bg-gradient-to-l active:from-orange-200 active:to-orange-300 active:text-zinc-700"
          >
            <span className="font-PoppinsRegular font-medium 2xl:text-lg xl:text-base lg:text-sm sm:text-base text-sm">
              {item.address}
            </span>
            <Icon className="2xl:w-7 2xl:h-7 lg:w-6 lg:h-6 sm:w-7 sm:h-7 w-6 h-6" />
          </a>
        );
      })}
    </>
  );
};

export default ContactButtons
