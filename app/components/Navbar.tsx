import React, { useEffect, useRef } from "react";
import { IoTimerOutline } from "react-icons/io5"
import { LuNotebookPen } from "react-icons/lu";
import { FaRegImage } from "react-icons/fa";
import { SlSocialSoundcloud } from "react-icons/sl";
import { duration } from "../styles/styles";
import { BsArrowsFullscreen } from "react-icons/bs";
import Timer from "./Timer";

interface PropType {
  setIsModalOpen: (isOpen: boolean) => void
  setIsBgCatalogOpen: (isOpen: boolean) => void
  setIsSoundsModalOpen: (isOpen: boolean) => void
  setIsTimerOpen: () => void
  isTimerOpen: boolean
}

const Navbar: React.FC<PropType> = ({ setIsModalOpen, setIsBgCatalogOpen, setIsTimerOpen, setIsSoundsModalOpen, isTimerOpen }) => {
  const navRef = useRef<HTMLHeadElement | null>(null)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const clickHandler = (e: MouseEvent) => {
    if (navRef.current && navRef.current.contains(e.target as Node)) {
      setIsModalOpen(false)
      setIsBgCatalogOpen(false)
      setIsSoundsModalOpen(false)
      setIsTimerOpen()
    }
  }

  useEffect(() => {
    document.addEventListener("click", clickHandler)
    return () => {
      document.removeEventListener("click", clickHandler)
    }
  }, [])

  return (
    <header className="w-full px-5 sm:p-0">
      <nav className="container mx-auto py-5 flex gap-4">
        <BsArrowsFullscreen
          onClick={toggleFullScreen}
          className={`${duration} text-white hover:text-white/75 duration-300 text-xl cursor-pointer ml-auto`}
        />
        <SlSocialSoundcloud
          onClick={() => setIsSoundsModalOpen(true)}
          className={`${duration} text-white hover:text-white/75 duration-300 text-2xl cursor-pointer`}
        />
        <FaRegImage
          onClick={() => setIsBgCatalogOpen(true)}
          className={`${duration} text-white hover:text-white/75 duration-300 text-2xl cursor-pointer`}
        />
        <LuNotebookPen
          onClick={() => setIsModalOpen(true)}
          className={`${duration} text-white hover:text-white/75 duration-300 text-2xl cursor-pointer`}
        />
        <div className="relative">
          <IoTimerOutline
            onClick={() => setIsTimerOpen()}
            className={`${duration} text-white hover:text-white/75 duration-300 text-2xl cursor-pointer`}
          />
          <Timer
            isTimerOpen={isTimerOpen}
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar