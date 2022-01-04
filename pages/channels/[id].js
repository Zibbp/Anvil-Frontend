import { useRouter } from "next/router";
import useSWR from "swr";
import Videos from "../../components/Videos/Videos";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ChannelPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Pagination settings
  var page = 1;
  var pageSize = 20;

  // Fetch channel data from Anvil API
  //   const { data, error } = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/channels/${id}`,
  //     fetcher
  //   );
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/${id}`,
    fetcher
  );

  //   Fetch channel videos from Anvil API
  //   const fetchChannelVideos = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/videos/${id}?page=${page}&pageSize=${pageSize}`,
  //     fetcher
  //   );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Videos channelId={data.id} channelName={data.name} channel={data} />
    </div>
  );
};

export default ChannelPage;
