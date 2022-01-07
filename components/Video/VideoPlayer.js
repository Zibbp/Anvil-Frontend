import { useEffect } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import eventBus from "../../utils/EventBus";
import getConfig from "next/config";

const VideoPlayer = (props) => {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const options = {
        controls: [
            "rewind",
            "play",
            "fast-forward",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            "settings",
            "fullscreen",
        ],
        captions: false,
    };
    const subtitles = [];
    // If subtitles are available, add them to the player
    if (props.data.video.generated_subtitles_path) {
        const escapedSubtitlePath =
            props.data.video.generated_subtitles_path.replace(/#/g, "%23");
        const subtitleObject = {
            kind: "captions",
            label: `${props.data.video.generated_subtitles_path.slice(
                -6,
                -4
            )}-auto-generated`,
            srclang: `${props.data.video.generated_subtitles_path.slice(
                -6,
                -4
            )}`,
            src: `${publicRuntimeConfig.NGINX_URL}${escapedSubtitlePath}`,
        };
        subtitles.push(subtitleObject);
    }
    if (props.data.video.subtitles_path) {
        const escapedSubtitlePath = props.data.video.subtitles_path.replace(
            /#/g,
            "%23"
        );
        const subtitleObject = {
            kind: "captions",
            label: `${props.data.video.subtitles_path.slice(-9, -7)}`,
            srclang: `${props.data.video.subtitles_path.slice(-9, -7)}`,
            src: `${publicRuntimeConfig.NGINX_URL}${escapedSubtitlePath}`,
        };
        subtitles.push(subtitleObject);
    }

    const sources = {
        type: "video",
        sources: [
            {
                src: props.data.httpVideoUrl,
                type: "video/webm",
                size: 1080,
            },
        ],
        poster: props.data.httpThumbnailUrl,
        tracks: subtitles,
    };
    useEffect(() => {
        const player = new Plyr(".js-plyr", options);
        player.source = sources;
        eventBus.on("seekToTimestamp", (timestamp) => {
            player.currentTime = timestamp;
        });
        return function cleanup() {
            player.destroy();
        };
    });

    return (
        <div>
            <video crossOrigin="true" className={`js-plyr plyr`} />
        </div>
    );
};

export default VideoPlayer;
