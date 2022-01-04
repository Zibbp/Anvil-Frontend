import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";
import Error from "next/error";
import VideoPlayer from "../../components/Video/VideoPlayer";
import VideoTitle from "../../components/Video/VideoTitle";
import VideoDescription from "../../components/Video/VideoDescription";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  } else {
    return res.json();
  }
};

const ChannelPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch channel data from Anvil API
  //   const { data, error } = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/channels/${id}`,
  //     fetcher
  //   );
  const { data, error } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_API_URL}/video/${id}`,
    fetcher
  );

  //   Fetch channel videos from Anvil API
  //   const fetchChannelVideos = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/videos/${id}?page=${page}&pageSize=${pageSize}`,
  //     fetcher
  //   );

  console.log(error);
  if (error) return <Error statusCode={error.status} />;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-10 2xl:col-span-10 xl:col-span-10 lg:col-span-10 md:col-span-12 sm:col-span-12">
          <VideoPlayer data={data} />
          <VideoTitle data={data} />
          <VideoDescription data={data} />
        </div>
        <div class="col-span-2 2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-12 sm:col-span-12 h-screen">
          recommended videos go here
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
