import { FC } from "react";
import Drumkit from "../components/Drumkit";
import { CustomAudioPlayer } from "../components/CustomAudioPlayer";

const Home: FC = () => {
  const yesterdayMaster = "yesterday_master_no_drums.wav";
  return (
    <div className="flex w-screen h-screen p-9 flex-col justify-between">
      <div className="flex-col">
        <div className="flex items-center w-full h-4 justify-center">
          Viktor music
        </div>
        <div>
          <Drumkit />
        </div>
      </div>
      <CustomAudioPlayer url={yesterdayMaster} />
    </div>
  );
};

export default Home;
