import { FC, useRef, useState } from "react"
import { IoCloseSharp } from "react-icons/io5"
import { modalStyles } from "../styles/styles"
import { soundsArr } from "../constants"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"

interface PropType {
  isSoundsModalOpen: boolean
  setIsSoundsModalOpen: (isOpen: boolean) => void
}

const SoundsModal: FC<PropType> = ({ isSoundsModalOpen, setIsSoundsModalOpen }) => {
  const [, setPlaying] = useState<{ [key: number]: boolean }>({});
  const [, setVolume] = useState<{ [key: number]: number }>({});
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  const togglePlay = (id: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      if (audio.paused) {
        audio.play();
        setPlaying((prev) => ({ ...prev, [id]: true }));
      } else {
        audio.pause();
        setPlaying((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isSoundsModalOpen ? (
        <motion.div
          initial={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          exit={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          className={`w-full h-[calc(100vh-100px)] ${modalStyles}`}
        >
          <button
            className="mb-2 ml-auto block"
            onClick={() => setIsSoundsModalOpen(false)}
          >
            <IoCloseSharp className="text-white text-2xl cursor-pointer" />
          </button>
          <div className="h-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-scroll hide-scrollbar">
            {soundsArr.map((sound) => (
              <div key={sound.id} className="h-[270px] flex justify-center cursor-pointer relative">
                <Image
                  width={500}
                  height={500}
                  loading="lazy"
                  className="w-full h-full rounded-lg"
                  src={sound.imgPath}
                  onClick={() => togglePlay(sound.id)}
                  alt="img"
                />
                <audio
                  src={sound.soundPath}
                  ref={el => {
                    audioRefs.current[sound.id] = el
                  }}
                  preload="true"
                  loop
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className={`w-[80%] absolute bottom-10 cursor-pointer`}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value)
                    setVolume(prev => ({ ...prev, [sound.id]: newVolume }))
                    const audio = audioRefs.current[sound.id]
                    if (audio) audio.volume = newVolume
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )
        :
        null
      }
    </AnimatePresence>
  )
}

export default SoundsModal