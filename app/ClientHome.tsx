"use client"

import { useState } from "react";
import { imgsPath } from "./constants";
import { useAppSelector } from "./lib/hooks";
import { BgCatalog, Navbar, Player, SoundsModal, TodoModal } from "./components";

type ModalType = "todo" | "bg" | "sounds" | "timer";

export default function ClientHome() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isBgCatalogOpen, setIsBgCatalogOpen] = useState<boolean>(false)
  const [isSoundsModalOpen, setIsSoundsModalOpen] = useState<boolean>(false)
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false)

  const currentBgIndex = useAppSelector(state => state.bgImgIndex.currentIndex)

  const handleOpenModal = (modal: ModalType) => {
    setIsModalOpen(modal === "todo")
    setIsBgCatalogOpen(modal === "bg")
    setIsSoundsModalOpen(modal === "sounds")
    setIsTimerOpen(modal === "timer" ? !isTimerOpen : false)
  }

  return (
    <div
      className="w-screen h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${imgsPath[currentBgIndex].src})` }}
    >
      <Navbar
        setIsModalOpen={() => handleOpenModal("todo")}
        setIsBgCatalogOpen={() => handleOpenModal("bg")}
        setIsTimerOpen={() => handleOpenModal("timer")}
        setIsSoundsModalOpen={() => handleOpenModal("sounds")}
        isTimerOpen={isTimerOpen}
      />
      <div className="container mx-auto px-5 sm:px-0">
        <SoundsModal
          isSoundsModalOpen={isSoundsModalOpen}
          setIsSoundsModalOpen={() => setIsSoundsModalOpen(false)}
        />
        <BgCatalog
          isBgCatalogOpen={isBgCatalogOpen}
          setIsBgCatalogOpen={() => setIsBgCatalogOpen(false)}
        />
        <TodoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={() => setIsModalOpen(false)}
        />
        <Player />
      </div>
    </div>
  );
}
