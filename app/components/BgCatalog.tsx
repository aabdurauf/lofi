import { FC } from "react"
import { imgsPath } from "../constants";
import { useAppDispatch } from "../lib/hooks";
import { bgImgActions } from "../lib/features/bgImgSlice";
import { IoCloseSharp } from "react-icons/io5";
import { modalStyles } from "../styles/styles";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

interface PropType {
  isBgCatalogOpen: boolean
  setIsBgCatalogOpen: (isOpen: boolean) => void
}

const BgCatalog: FC<PropType> = ({ isBgCatalogOpen, setIsBgCatalogOpen }) => {
  const dispatch = useAppDispatch()

  const handleBgChange = (index: number) => {
    dispatch(bgImgActions.changeBg(index))
  }

  return (
    <AnimatePresence initial={false}>
      {isBgCatalogOpen && (
        <motion.div
          initial={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          exit={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          className={`w-full h-[calc(100vh-100px)] ${modalStyles}`}
        >
          <button
            className="mb-2 ml-auto block"
            onClick={() => setIsBgCatalogOpen(false)}
          >
            <IoCloseSharp className="text-white text-2xl cursor-pointer" />
          </button>
          <div className="h-[95%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-scroll hide-scrollbar">
            {imgsPath.map((imgPath, index) => (
              <Image
                width={500}
                height={500}
                key={index}
                src={imgPath.src}
                alt={imgPath.alt}
                className="cursor-pointer w-full h-[250px] rounded-lg"
                onClick={() => handleBgChange(index)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BgCatalog