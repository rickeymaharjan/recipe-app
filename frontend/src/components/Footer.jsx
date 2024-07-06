import { Link } from "react-router-dom"
import { PiTelegramLogo } from "react-icons/pi"
import { SlSocialFacebook } from "react-icons/sl"
import { FaInstagram } from "react-icons/fa"

import { Separator } from "@radix-ui/react-separator"

function Footer() {
  return (
    <div className="w-full h-[400px] bg-black flex flex-col justify-center items-center">
      <Link
        to="/"
        className="text-4xl mb-14 text-white bg-inherit transition ease-in-out font-logo hover:text-[#DE3725] hover:scale-105"
      >
        Fresh Feast
      </Link>

      {/* Social links */}
      <div className="flex gap-3 mb-14 bg-inherit">
        <PiTelegramLogo className="p-1 rounded-full" size={30} />
        <SlSocialFacebook className="p-1 rounded-full" size={30} />
        <FaInstagram className="p-1 rounded-full" size={30} />
      </div>

      {/* Other pages */}
      <div className="flex gap-12 text-white bg-inherit">
        <Link className="bg-inherit" to="/">
          About
        </Link>
        <Link className="bg-inherit" to="/">
          Team
        </Link>
        <Link className="bg-inherit" to="/">
          Pricing
        </Link>
        <Link className="bg-inherit" to="/">
          Gallery
        </Link>
      </div>

      <div className="my-5 w-[90%] h-[1px] border-white border-t-1"></div>
      <p className="text-white">@rickeymaharjan 2023</p>
    </div>
  )
}

export default Footer
