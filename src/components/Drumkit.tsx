import { FC, useCallback, useEffect, useState } from "react";
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

  const audioElements: { [key: string]: HTMLAudioElement } = {};

  // Preload audio files
  // useEffect(() => {
  //   workSpacesState.boxes.forEach(box => {
  //     const url = box.sample?.filename;
  //     if (url) {
  //       const audio = new Audio(url);
  //       audioElements[url] = audio;
  //     }
  //   });
  // }, [workSpacesState]);

  const onClickOnDrumPad = useCallback((drumpadIndex: number) => {
    const url = workSpacesState.boxes[drumpadIndex].sample?.filename;
    if (url) {
      playAudioWithNewAudioPlayer(url);
    }
    // if (url && audioElements[url]) {
    //   audioElements[url].play();
    // }
  }, [workSpacesState]);

  const onClickOnKitButton = (index: number) => {
    console.log(index);
    setWorkSpacesState(KitsInitialState.kits[index]);
  };
  console.log(workSpacesState)
  return (
    <div>
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
