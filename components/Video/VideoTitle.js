import dayjs from "dayjs";
import { useState } from "react";
import Link from "next/link";
import getConfig from "next/config";

const VideoTitle = ({ data }) => {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const [showInfo, setShowInfo] = useState(false);
    function toggle() {
        setShowInfo(!showInfo);
    }

    var channelName = data.video.uploader.replace(/ /g, "_");

    return (
        <div className=" mx-auto min-w-full pt-4">
            <div className="">
                <a className="title-font font-medium text-gray-900 dark:text-white">
                    <span className="text-xl">{data.video.title}</span>
                </a>
            </div>
            <div className="pb-4 flex items-center sm:flex-row flex-col">
                <p
                    className="
              text-sm text-gray-600
              sm:py-2 sm:mt-0
              mt-2
              dark:text-neutral-200
            "
                >
                    <Link href={`/channels/${data.video.uploader}`}>
                        <span>
                            <img
                                className="inline object-cover w-8 h-8 rounded-full"
                                src={`${publicRuntimeConfig.NGINX_URL}/videos/${channelName}/${channelName}.jpg`}
                                alt={`${data.video.uploader} Profile picture.`}
                            />{" "}
                            <a href={`/channels/${data.video.uploader}`}>
                                {data.video.uploader}
                            </a>
                        </span>
                    </Link>{" "}
                    • {dayjs(data.video.upload_date).format("MM/DD/YYYY")} •{" "}
                    {data.video.view_count.toLocaleString()} views
                    <span
                        onClick={toggle}
                        className={`pl-1 inline-flex ${
                            showInfo ? "hidden" : ""
                        }  `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 -5 29 25"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>
                    <span className={showInfo ? "visible" : "invisible"}>
                        {" "}
                        • Archived on{" "}
                        {dayjs(data.video.created_at).format(
                            "MM/DD/YYYY"
                        )} |{" "}
                        <span>
                            {data.video.resolution} • {data.video.fps} FPS •{" "}
                            <span title="Video Codec">{data.video.vcodec}</span>{" "}
                            •{" "}
                            <span title="Audio Codec">{data.video.acodec}</span>
                        </span>
                    </span>
                </p>
                <span
                    className="
              inline-flex
              sm:ml-auto sm:mt-0
              mt-4
              justify-center
              sm:justify-start
              dark:text-neutral-200
            "
                >
                    <a className="text-gray-500 dark:text-neutral-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                    </a>
                    <a className="ml-2 text-gray-500 dark:text-neutral-200">
                        {data.video.like_count.toLocaleString()}
                    </a>
                    {data.video.dislike_count > 0 && (
                        <>
                            <a className="ml-3 text-gray-500 dark:text-neutral-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                                </svg>
                            </a>
                            <a className="ml-2 text-gray-500 dark:text-neutral-200">
                                {data.video.dislike_count.toLocaleString()}
                            </a>
                        </>
                    )}
                    <a
                        className="ml-3 text-gray-500 dark:text-neutral-200"
                        href={data.httpVideoUrl}
                        title="Download Video"
                        target="_blank"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                    </a>
                </span>
            </div>
        </div>
    );
};

export default VideoTitle;
