import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  KitsInitialState,
  WorkSpaceBoxState,
  WorkSpacesState,
} from "../types/WorkSpace";
import { playAudioWithNewAudioPlayer } from "../tools/playAudio";

interface DrumpadProps {
  onClick: (drumpadIndex: number) => void;
  workspaceState: WorkSpaceBoxState;
}

const Drumpad: FC<DrumpadProps> = ({ onClick, workspaceState }) => {
  return (
    <div
      onClick={() => onClick(workspaceState.index)}
      className="flex h-full w-[30%] border-solid border-2 rounded-lg items-center justify-center"
    >
      {workspaceState.sample?.nickName}
    </div>
  );
};

const Drumkit: FC = () => {
  const [workSpacesState, setWorkSpacesState] = useState<WorkSpacesState>(
    KitsInitialState.kits[0]
  );

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<{ [key: string]: AudioBuffer }>({});

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
    audioBuffersRef.current[url] = audioBuffer;
  };

  // Preload audio files into audio buffers
  useEffect(() => {
    const preloadAudio = async () => {
      for (const box of workSpacesState.boxes) {
        const url = box.sample?.filename;
        if (url && !audioBuffersRef.current[url]) {
          await loadAudio(url);
        }
      }
    };
    preloadAudio();
  }, [workSpacesState]);

  const onClickOnDrumPad = useCallback((drumpadIndex: number) => {
    if (!audioContextRef.current) return;

    const url = workSpacesState.boxes[drumpadIndex].sample?.filename;
    if (url && audioBuffersRef.current[url]) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffersRef.current[url];
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  }, [workSpacesState]);

  const onClickOnKitButton = (index: number) => {
    console.log(index);
    setWorkSpacesState(KitsInitialState.kits[index]);
  };
  console.log(workSpacesState)
  return (
    <div onClick={() => audioContextRef.current?.resume()}>
      <div className="flex w-full py-9 h-44 items-center justify-center space-x-4">
        {workSpacesState.boxes.map((box) => (
          <Drumpad
            key={box.index}
            onClick={onClickOnDrumPad}
            workspaceState={box}
          />
        ))}
      </div>
      Kits :
      <div className="flex w-full py-9 h-44 items-center justify-center space-x-4">
        {KitsInitialState.kits.map((kit, index) => (
          <div
            key={index}
            onClick={() => onClickOnKitButton(index)}
            className="flex h-full w-[30%] border-solid border-2 rounded-lg items-center justify-center"
          >
            {kit.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drumkit;
