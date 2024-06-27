import { theme } from "../constants/theme";
import { AudioSample } from "./AudioSampleState";

export const WorkSpacesInitialState1: WorkSpacesState = {
  name: "Original",
  boxes: [
    {
      frenchKey: "a",
      englishKey: "q",
      isSelected: true,
      index: 0,
      sample: { filename: "kick.wav", nickName: "Kick" },
      isPlaying: false,
      color: theme.palette.shinyPurple,
      lowOpacityColor: theme.palette.shinyPurpleLowOpacity,
    },
    {
      frenchKey: "z",
      englishKey: "w",
      isSelected: false,
      index: 1,
      sample: { filename: "snare.wav", nickName: "Snare" },
      isPlaying: false,
      color: theme.palette.darkPink,
      lowOpacityColor: theme.palette.darkPinkLowOpacity,
    },
    {
      frenchKey: "e",
      englishKey: "e",
      isSelected: false,
      index: 2,
      sample: { filename: "hi-hat.wav", nickName: "Hi-Hat" },
      isPlaying: false,
      color: theme.palette.orange,
      lowOpacityColor: theme.palette.orangeLowOpacity,
    },
  ],
  keyBoardLanguage: "English",
};

export const WorkSpacesInitialState2: WorkSpacesState = {
  name: "IA",
  boxes: [
    {
      frenchKey: "a",
      englishKey: "q",
      isSelected: true,
      index: 0,
      sample: { filename: "snare.mp3", nickName: "Kick" },
      isPlaying: false,
      color: theme.palette.shinyPurple,
      lowOpacityColor: theme.palette.shinyPurpleLowOpacity,
    },
    {
      frenchKey: "z",
      englishKey: "w",
      isSelected: false,
      index: 1,
      sample: { filename: "snare.mp3", nickName: "Snare" },
      isPlaying: false,
      color: theme.palette.darkPink,
      lowOpacityColor: theme.palette.darkPinkLowOpacity,
    },
    {
      frenchKey: "e",
      englishKey: "e",
      isSelected: false,
      index: 2,
      sample: { filename: "hi-hat.mp3", nickName: "Hi-Hat" },
      isPlaying: false,
      color: theme.palette.orange,
      lowOpacityColor: theme.palette.orangeLowOpacity,
    },
  ],
  keyBoardLanguage: "English",
};

export const KitsInitialState: KitsState = {
  kits: [WorkSpacesInitialState1, WorkSpacesInitialState2],
};

export type KitsState = {
  kits: WorkSpacesState[];
};

export type WorkSpacesState = {
  name: string;
  boxes: WorkSpaceBoxState[];
  keyBoardLanguage: "French" | "English";
};

export type WorkSpaceBoxState = {
  frenchKey: string;
  englishKey: string;
  index: number;
  isSelected: boolean;
  sample: AudioSample | null;
  isPlaying: boolean;
  color: string;
  lowOpacityColor: string;
};
