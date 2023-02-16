import React from "react";
import {
  Player,
  DefaultUi,
  Video
} from "@vime/react";

const VideoPlayer = () =>  { 

  return (
    <div className="player">
    <Player>
      //this inserts our video into the app.
      <Video crossOrigin=""  poster="https://media.vimejs.com/poster.png">
        //specify location of video to be used
        <source data-src="http://localhost:8080/practice-course/v1/course/get-video" type="video/mp4" />
        <track
          default
          kind="subtitles"
          src="https://media.vimejs.com/subs/english.vtt"
          srcLang="en"
          label="English"
        />
      </Video>
      //this loads the default UI of the vime framework
      <DefaultUi ></DefaultUi>
    </Player>
    </div>
  );
}


export default VideoPlayer;