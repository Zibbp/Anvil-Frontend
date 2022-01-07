import eventBus from "../../utils/EventBus";
import * as processString from "react-process-string";

const VideoDescription = ({ data }) => {
    let config = [
        {
            regex: /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
            fn: (key, result) => (
                <span key={key}>
                    <a
                        class="description-link"
                        target="_blank"
                        href={result[0]}
                    >
                        {result[0]}
                    </a>
                </span>
            ),
        },
        {
            regex: /(?:(?:([01]?\d):)?([0-5]?\d))?:([0-5]?\d)/gi,
            fn: (key, result) => (
                <span key={key}>
                    <a
                        class="description-timestamp"
                        onClick={() => toTimestamp(result[0])}
                        href="#"
                    >
                        {result[0]}
                    </a>
                </span>
            ),
        },
    ];

    let processed = processString(config)(data.video.description);

    console.log(data.video.description);
    function toTimestamp(time) {
        console.log(hmsToSecondsOnly(time));
        eventBus.dispatch("seekToTimestamp", hmsToSecondsOnly(time));
    }

    function hmsToSecondsOnly(str) {
        /* eslint-disable */
        var p = str.split(":"),
            s = 0,
            m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        return s;
        /* eslint-enable */
    }

    return (
        <div
            className="max-w-screen-xl	dark:text-gray-100"
            style={{ whiteSpace: "pre-wrap" }}
        >
            {processed}
        </div>
    );
};

export default VideoDescription;
