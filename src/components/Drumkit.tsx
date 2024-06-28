import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  KitsInitialState,
  WorkSpaceBoxState,
  WorkSpacesState,
} from "../types/WorkSpace";
import { playAudioWithNewAudioPlayer } from "../tools/playAudio";
import { useKeyPress } from "../hooks/UseKeyPress";

interface DrumpadProps {
  onClick: (drumpadIndex: number) => void;
  workSpaceBoxState: WorkSpaceBoxState;
}

const Drumpad: FC<DrumpadProps> = ({ onClick, workSpaceBoxState }) => {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);

  useEffect(() => {
    if (isPlayed) {
      setTimeout(() => {
        setIsPlayed(false);
      }, 100);
    }
  }, [isPlayed]);

  const onKeyPressed = (event: any) => {
    if (workSpaceBoxState.sample) {
      if (workSpaceBoxState.englishKey === event.key) {
        const url = workSpaceBoxState.sample.filename;
        if (url) {
          playAudioWithNewAudioPlayer(url);
        }
      }
    }
  };
  const onTouchEndDrumPad = (index: number) => {
    onClick(index);
    setIsPlayed(true);
  };

  useKeyPress(["a", "z", "e", "r", "q", "s", "d", "f", "q", "w"], onKeyPressed);
  return (
    <div
      // onClick={() => onClick(workSpaceBoxState.index)}
      onTouchEnd={() => {
        onTouchEndDrumPad(workSpaceBoxState.index);
      }}
      className="flex h-full w-[30%] border-solid border-2 rounded-lg items-center justify-center"
      style={{ backgroundColor: isPlayed ? "#c5bebe" : "black" }}
    >
      {workSpaceBoxState.sample?.nickName}
    </div>
  );
};

const Drumkit: FC = () => {
  const [workSpacesState, setWorkSpacesState] = useState<WorkSpacesState>(
    KitsInitialState.kits[0]
  );
  const [currentKitIndex, setCurrentKitIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<{ [key: string]: AudioBuffer }>({});

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }, []);

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current!.decodeAudioData(
      arrayBuffer
    );
    audioBuffersRef.current[url] = audioBuffer;
  };

  // Preload audio files into audio buffers
  useEffect(() => {
    setIsLoading(true);
    const preloadAudio = async () => {
      for (const box of workSpacesState.boxes) {
        const url = box.sample?.filename;
        if (url && !audioBuffersRef.current[url]) {
          await loadAudio(url);
        }
      }
    };
    preloadAudio();
    setIsLoading(false);
  }, [workSpacesState]);

  const onClickOnDrumPad = useCallback(
    (drumpadIndex: number) => {
      if (!audioContextRef.current) return;

      const url = workSpacesState.boxes[drumpadIndex].sample?.filename;
      if (url && audioBuffersRef.current[url]) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffersRef.current[url];
        source.connect(audioContextRef.current.destination);
        source.start(0);
      }
    },
    [workSpacesState]
  );

  const onClickOnKitButton = (index: number) => {
    setCurrentKitIndex(index);
    setWorkSpacesState(KitsInitialState.kits[index]);
  };
  return (
    <div onClick={() => audioContextRef.current?.resume()}>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <div className="flex w-full py-9 h-44 items-center justify-center space-x-4 text-white">
            {workSpacesState.boxes.map((box) => (
              <Drumpad
                key={box.index}
                onClick={onClickOnDrumPad}
                workSpaceBoxState={box}
              />
            ))}
          </div>
          <div className="flex w-full py-9 h-44 items-center justify-center space-x-4">
            {KitsInitialState.kits.map((kit, index) => (
              <div
                key={index}
                onClick={() => onClickOnKitButton(index)}
                className="flex h-full w-[30%] border-solid border-2 rounded-lg items-center justify-center text-white"
                style={{
                  backgroundColor:
                    currentKitIndex === index ? "white" : "black",
                  color: currentKitIndex === index ? "black" : "white",
                }}
              >
                {kit.name} kit
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Drumkit;
