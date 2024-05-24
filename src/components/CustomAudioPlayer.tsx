import { FC } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface CustomAudioPlayerProps {
  url: any;
}

export const CustomAudioPlayer: FC<CustomAudioPlayerProps> = ({ url }) => {
  console.log(url);
  return (
    <div>
      <AudioPlayer
        showSkipControls={false}
        showFilledVolume={false}
        showJumpControls={false}
        onPlay={(e) => console.log(e)}
        src={url}
      />
    </div>
  );
};
