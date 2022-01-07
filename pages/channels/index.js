import useSWR from "swr";
import ChannelCard from "../../components/Channel/ChannelCard";
import getConfig from "next/config";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Channels = () => {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const { data, error } = useSWR(
        `${publicRuntimeConfig.API_URL}/channels`,
        fetcher
    );

    if (error) return <div>Failed to load data...</div>;
    if (!data)
        return (
            <div className="flex justify-center items-center">
                <div
                    className="
        loader
        ease-linear
        border-8 border-t-8 border-gray-200
        h-32
        w-32
      "
                ></div>
            </div>
        );

    return (
        <div>
            <div className="mt-6 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {data.map((channel, index) => {
                        return (
                            <div key={index} className="flex justify-center ">
                                <ChannelCard channel={channel} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Channels;
