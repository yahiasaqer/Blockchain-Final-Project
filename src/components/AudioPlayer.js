import useAudio from "../hooks/useAudio";
import {Slider} from "antd"; //importing sthe slider from ant design
import { useIPFS } from "../hooks/useIPFS"; //used as a gateway, and it's used in the etherum boilerplate
import "./AudioPlayer.css";
import { SoundOutlined, StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled} from "@ant-design/icons";


const Player = ({ url }) => {
  const {resolveLink} = useIPFS(); //fetching all hooks
  const [
    playing,
    duration,
    toggle,
    toNextTrack,
    toPrevTrack,
    trackProgress,
    onSearch,
    onSearchEnd,
    onVolume,
    trackIndex
  ] = useAudio(url);

  
  const minSec = (secs) => { //converting seconds to minutes and seconds to display.
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <>
    {/*displaying the cover, name and album of the song in the player*/}
    <div className="buttons" style={{width:"300px", justifyContent:"start"}}>
        <img className="cover" src={resolveLink(JSON.parse(url[trackIndex].metadata).image)} alt="currentCover" />
        <div>
        <div className="songTitle">{JSON.parse(url[trackIndex].metadata).name}</div>
        <div className="songAlbum">{url[trackIndex].name}</div>
        </div>
    </div>
    <div>
      {/*music player controls and slider. */}
      <div className="buttons">
        <StepBackwardOutlined className="forback" onClick={toPrevTrack} />
        {playing ? 
            <PauseCircleFilled className="pauseplay" onClick={toggle} /> :
            <PlayCircleFilled className="pauseplay" onClick={toggle} />
        }
        <StepForwardOutlined className="forback" onClick={toNextTrack} />
      </div>
      <div className="buttons">
      {minSec(trackProgress)}
      {/*step for progressing 1 second at time, min for starting at 0, max for completion, onChange for controling the slider
      and onAfterChange for playing the track after controling the slider*/}
      <Slider
        value={trackProgress}
        step={1} 
        min={0}
        max={duration ? duration : 0}
        className="progress" 
        tooltipVisible={false}
        onChange={(value) => onSearch(value)}
        onAfterChange={onSearchEnd}
      />
      {duration ? minSec(Math.round(duration)) : "00:00"}
      </div>
    </div>
    <div className="soundDiv">
      {/*for controling the volume slider, value ranges from 0 to 1, so we divide by 100*/}
          <SoundOutlined />
          <Slider 
            className="volume" 
            defaultValue={100} 
            tooltipVisible={false}
            onChange={(value) => onVolume(value/100)}
          />
    </div>
    </>
  );
};

export default Player;
