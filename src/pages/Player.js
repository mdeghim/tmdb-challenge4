// @todo: import MediaPlayer from SDK
import {Lightning, Utils, MediaPlayer} from "wpe-lightning-sdk";
import {formatDuration, getProgressBarPosition} from "../lib/tools";

export default class Player extends Lightning.Component {
    static _template() {
        const timingFunction = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';
        return {
            /**
             * @todo:
             * - Add MediaPlayer component (that you've imported via SDK)
             * - Add a rectangle overlay with gradient color to the bottom of the screen
             * - Add A Controls:{} Wrapper that hosts the following components:
             *   - PlayPause button image (see static/mediaplayer folder)
             *   - A skip button (see static/mediaplayer folder)
             *   - Progress bar (2 rectangles?)
             *   - add duration label
             *   - add text label for currentTime
             */
             MediaPlayer: {
               type: MediaPlayer
             },

            Controls: {
              //visible: false,
              y : 1000,
              /* flex: {},*/
              TogglePlayPause: {
                x: 60,
                mountY: 0.3,
                src: Utils.asset("mediaplayer/pause.png"),
              },
              Time: {
                x: 90,
                y:-7,
                text: {text: '0:00 / 0: 00', fontSize: 20, fontFace: "SourceSansPro-Regular"}
              },
              Full: {
                rect: true,x: 200, w: 1400, h: 10, color: 0x80ffffff,
              },
              Elapsed: {
                rect: true, x: 200, w: 0, h: 10, color: 0xffffffff,
                transitions: {
                    w: {duration: 1, timingFunction}
                }
              }
            },
        };
    }

    _init() {
        /**
         * @todo:
         * tag MediaPlayer component and set correct consumer
         */
         this.tag('MediaPlayer').updateSettings({consumer: this});
    }

    /**
     *@todo:
     * add focus and unfocus handlers
     * focus => show controls
     * unfocus => hide controls
     */


    /**
     * @todo:
     * When your App is in Main state, call this method
     * and play the video loop (also looped)
     * @param src
     * @param loop
     */
  _active() {
    this.application.emit("playback");
  }

  _inactive() {
    this.tag('MediaPlayer').close()
  }

   _firstActive() {
       this.tag('MediaPlayer').open(this._item.videoPath);
       this.tag('MediaPlayer').loop = true;
       this._setState('onPlay');
   }

    set item(v){
        this._item = v;
    }

    /**
     * @todo:
     * - add _handleEnter() method and make sure the video Pauses
     */
    _handleEnter(){
      this.tag("MediaPlayer").playPause();
    }

    /**
     * This will be automatically called when the mediaplayer pause event is triggerd
     * @todo:
     * - Add this Component in a Paused state
     */
    $mediaplayerPause() {

    }

    $mediaplayerLoadedData() {
      console.log("Data loaded");
    }

    $mediaplayerStart(){
      console.log("Can play stream");
      this._handleEnter()
    }
    $mediaplayerProgress(playTime) {
        console.log(playTime);
        let elapsed = formatDuration(playTime.currentTime)//
        let full = formatDuration(playTime.duration)
        let progress = getProgressBarPosition(playTime,1500);
        this.tag('Elapsed').setSmooth('w', progress, {duration: 0.01});
      this.patch({
        Controls: {
          Time: {
            text: `${elapsed} | ${full}`,
          }
        }
      })
    }

    static _states(){
        return [
            /**
             * @todo:
             * - Add paused state
             * - on enter change the play to pause button (see static/mediaplayer folder)
             * - on _handleEnter() play the asset again
             * - reset state on play
             */
            class onPause extends this{
                $enter(){
                    this.tag("TogglePlayPause").src = Utils.asset("mediaplayer/play.png");
                }
                _handleEnter(){
                    this.tag("MediaPlayer").playPause();
                    this._setState('onPlay');
                }
            },

            class onPlay extends this{
                $enter(){
                    this.tag("TogglePlayPause").src = Utils.asset("mediaplayer/pause.png");
                }
                _handleEnter(){
                    this.tag("MediaPlayer").playPause();
                    this._setState('onPause');
                }
            }
        ]
    }
}
