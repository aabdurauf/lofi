import React, { useEffect, useRef, useState } from "react"
import { GoPlay } from "react-icons/go";
import { BsArrowRepeat } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

interface PropsType {
  isTimerOpen: boolean
}

const Timer: React.FC<PropsType> = ({ isTimerOpen }) => {
  const DEFAULT_TIME: number = 25 * 60;

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME)

  const formatTime = (seconds: number) => {
    const minutes: number = Math.floor(seconds / 60)
    const secs: number = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      audioRef.current?.play()
      setIsRunning(false)
      setTimeLeft(DEFAULT_TIME)
    }

    return () => clearInterval(timer)
  }, [isRunning, timeLeft, DEFAULT_TIME])

  return (
    <AnimatePresence initial={false}>
      {isTimerOpen && (
        <motion.div
          initial={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          exit={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          className="absolute right-0 top-10 w-[100px] rounded-lg backdrop-blur-md bg-white/10 text-white py-3 px-4 flex flex-col items-center gap-3"
        >
          <audio src="/sounds/timer-terminer.mp3" ref={audioRef} preload="true" className="hidden"></audio>
          <span>{formatTime(timeLeft)}</span>
          <div className="flex items-center gap-3">
            {isRunning ? (
              <button
                onClick={() => setIsRunning(false)}
                className="cursor-pointer text-md"
              >
                <FaStop />
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(true)}
                className="cursor-pointer text-xl"
              >
                <GoPlay />
              </button>
            )}
            <button
              onClick={() => {
                setTimeLeft(DEFAULT_TIME)
                setIsRunning(false)
              }}
              className="cursor-pointer text-xl"
            >
              <BsArrowRepeat />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Timer