import { FC, useEffect, useRef, useState } from "react";
import { FaPlay, FaBackward, FaForward, FaStop } from "react-icons/fa";
import { musicPath } from "../constants";
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { musicActions } from "../lib/features/musicSlice";
import CircularProgress from '@mui/material/CircularProgress';

const Player: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const currentMusicIndex = useAppSelector(state => state.musicIndex.currentIndex)
  const dispatch = useAppDispatch()

  const handlePlay = () => {
    audioRef.current?.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const playNext = () => {
    dispatch(musicActions.nextTrack(musicPath.length))
    handlePlay()
  }

  const playPrev = () => {
    dispatch(musicActions.prevTrack(musicPath.length))
    handlePlay()
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicPath[currentMusicIndex].path;
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentMusicIndex])

  return (
    <div className="sm:w-[323px] rounded-lg absolute bottom-10 left-5 right-5  sm:right-0 backdrop-blur-md bg-white/10 p-5">
      <div className="flex flex-col gap-3 justify-between">
        {isLoading ? (
          <div className="text-center">
            <CircularProgress
              size={30}
              color="inherit"
              className="text-white"
            />
          </div>
        ) : (
          <h1 className="text-center text-white font-bold text-xl">{musicPath[currentMusicIndex].title}</h1>
        )}
        <audio
          ref={audioRef}
          onEnded={playNext}
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          preload="true"
        />
        <div className="flex items-center gap-3 mx-auto">
          <FaBackward onClick={playPrev} className="text-white cursor-pointer" />
          {isPlaying ? (
            <FaStop onClick={handlePause} className="text-white cursor-pointer" />
          ) : (
            <FaPlay onClick={handlePlay} className="text-white cursor-pointer" />
          )}
          <FaForward onClick={playNext} className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Player