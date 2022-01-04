import useSWR from "swr";
import { useState } from "react";
import ChannelHeader from "../Channel/ChannelHeader";
import VideoCard from "./VideoCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Videos = (props) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [show, setShow] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/${props.channelId}?page=${pageIndex}&limit=${pageSize}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        <div>
          <ChannelHeader channel={props.channel} />
        </div>
      </div>
    );

  return (
    <div>
      <ChannelHeader channel={props.channel} />
      {/* Pagination */}
      <div>
        <div className="mt-4 justify-center flex items-center space-x-1">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            className="disabled:opacity-50 disabled:hover-none px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
            disabled={pageIndex === data.meta.first_page}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
          </button>
          {data.meta.current_page > data.meta.first_page ? (
            <div>
              {" "}
              <button
                onClick={() => setPageIndex(data.meta.first_page)}
                className="px-4 py-2 mr-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
              >
                {data.meta.first_page}
              </button>
              <button className="px-4 py-2 mr-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                ...
              </button>
              <button
                onClick={() => setPageIndex(pageIndex - 1)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
              >
                {data.meta.current_page - 1}
              </button>
            </div>
          ) : (
            ""
          )}
          <button className="px-4 py-2 text-gray-700 bg-blue-500 rounded-md hover:bg-blue-400 hover:text-white">
            {data.meta.current_page}
          </button>
          {data.meta.current_page < data.meta.last_page ? (
            <div>
              <button
                onClick={() => setPageIndex(pageIndex + 1)}
                className="px-4 py-2 mr-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
              >
                {data.meta.current_page + 1}
              </button>
              <button
                href="#"
                className="px-4 py-2 mr-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
              >
                ...
              </button>
              <button
                onClick={() => setPageIndex(data.meta.last_page)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
              >
                {data.meta.last_page}
              </button>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            className="disabled:opacity-50 disabled:hover-none px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
            disabled={pageIndex === data.meta.last_page}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
        <div className=" container mx-auto justify-end flex items-end space-x-1">
          <div className="relative">
            <div
              className=" flex items-center justify-between border dark:border-ytd-700 rounded border-gray-300 dark:border-gray-700 w-auto cursor-pointer"
              onClick={() => setShow(!show)}
            >
              <p className="pl-3 py-3 text-gray-600 dark:text-ytd-700 text-sm leading-3 tracking-normal font-normal">
                {pageSize}
              </p>
              <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3">
                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-up"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 15 12 9 18 15" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-up"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
            </div>
            {show && (
              <ul className="visible z-20 transition duration-300 opacity-100 bg-white dark:bg-ytd-800 shadow rounded mt-2 pb-1 w-auto absolute">
                <li
                  onClick={() => setPageSize(20)}
                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                >
                  20
                </li>
                <li
                  onClick={() => setPageSize(40)}
                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                >
                  40
                </li>
                <li
                  onClick={() => setPageSize(60)}
                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                >
                  60
                </li>
                <li
                  onClick={() => setPageSize(80)}
                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                >
                  80
                </li>
                <li
                  onClick={() => setPageSize(100)}
                  className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                >
                  100
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* pagination */}
      {/* Map videos */}
      {data.data ? (
        <div className="container mx-auto mt-4">
          <div
            className="
        h-auto
        grid grid-cols-1
        gap-4
        2xl:grid-cols-6
        xl:grid-cols-5
        lg:grid-cols-4
        md:grid-cols-2
        sm:grid-cols-1
      "
          >
            {data.data.map((video, index) => {
              return (
                <VideoCard
                  key={index}
                  video={video}
                  channelName={props.channelName}
                />
                // <div key={index}>
                //   {video.title}
                //   <Image
                //     src={`${process.env.NEXT_PUBLIC_NGINX_URL}${video.thumbnail_path}`}
                //     width={720}
                //     height={480}
                //     placeholder={blur}
                //   />
                // </div>
              );
            })}
          </div>
        </div>
      ) : (
        "loading..."
      )}
      {/* Map videos */}
    </div>
  );
};

export default Videos;
