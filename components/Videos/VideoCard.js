import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import moment from "moment";
import Link from "next/link";

const VideoCard = (props) => {
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  const duration = moment
    .utc(props.video.duration * 1000)
    .format("HH:mm:ss")
    .replace("00:", "");

  const formattedViewCount = numFormatter(props.video.view_count);

  const formattedUploadDate = dayjs(props.video.upload_date).format(
    "MM/DD/YYYY"
  );

  const tempThumbnailPath = encodeURI(props.video.thumbnail_path);
  const escapedThumbnailPath = tempThumbnailPath.replace(/#/g, "%23");

  const [isReady, setIsReady] = useState(false);

  const onLoadCallBack = (e) => {
    setIsReady(true);
    typeof onLoad === "function" && onLoad(e);
  };

  return (
    <div>
      <Link href={`/watch/${props.video.friendly_id}`}>
        <div className="max-w-xs mx-auto overflow-hidden relative">
          <span
            className="
          px-1
          py-1
          ml-1
          mt-1
          bottom-19
          right-1
          text-xs
          absolute
          text-white
          bg-vod-badge
          z-10
        "
          >
            {duration}
          </span>
          <a href={`/watch/${props.video.friendly_id}`}>
            <div
              className={`${
                isReady
                  ? "opacity-100 transition-opacity duration-400"
                  : "opacity-0 transition-opacity"
              }`}
            >
              <Image
                onLoad={onLoadCallBack}
                src={`${process.env.NEXT_PUBLIC_NGINX_URL}${escapedThumbnailPath}`}
                width={242}
                height={136}
              />
            </div>
            <div className="py-1 text-center">
              <p
                title={props.video.title}
                className="
            block
            text-sm
            font-bold
            text-gray-800
            dark:text-white
            line-clamp-2
            text-left
            video-title
            dark:text-gray-100
          "
              >
                {props.video.title}
              </p>

              <div className="">
                <p className="text-sm text-gray-700 dark:text-ytd-200 text-left">
                  {props.channelName}
                </p>
                <p className="text-sm text-gray-700 dark:text-ytd-200 text-left">
                  {formattedViewCount} views • {formattedUploadDate}
                </p>
              </div>
            </div>
          </a>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
