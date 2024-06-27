import { FC } from "react";
import Drumkit from "../components/Drumkit";
import { CustomAudioPlayer } from "../components/CustomAudioPlayer";

const Home: FC = () => {
  const yesterdayMaster = "yesterday_master_no_drums.wav";
  return (
    <div className="flex w-screen h-screen p-9 flex-col justify-center bg-black">
      <div className="flex-col">
        {/* <div className="flex text-xl items-center w-full h-4 justify-center text-white">
          Yesterday Drums
        </div> */}
        <div>
          <Drumkit />
        </div>
        <CustomAudioPlayer url={yesterdayMaster} />
      </div>
    </div>
  );
};

export default Home;
