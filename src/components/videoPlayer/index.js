import React from "react";
import {
  Player,
  DefaultUi,
  Video
} from "@vime/react";

const VideoPlayer = (props) =>  { 
const {courseId} = props;
  return (
    <div className="player">
    <Player>
      //this inserts our video into the app.
      <Video crossOrigin=""  poster="https://media.vimejs.com/poster.png">
        //specify location of video to be used
        <source data-src={`${process.env.URL}practice-course/v1/course/get-video/${courseId}`} type="video/mp4" />
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