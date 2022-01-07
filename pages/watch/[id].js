import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";
import Error from "next/error";
import VideoPlayer from "../../components/Video/VideoPlayer";
import VideoTitle from "../../components/Video/VideoTitle";
import VideoDescription from "../../components/Video/VideoDescription";
import getConfig from "next/config";

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
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWRImmutable(
        `${publicRuntimeConfig.API_URL}/video/${id}`,
        fetcher
    );

    console.log(error);
    if (error) return <Error statusCode={error.status} />;
    if (!data) return <div>loading...</div>;

    return (
        <div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-10 2xl:col-span-10 xl:col-span-10 lg:col-span-10 md:col-span-12 sm:col-span-12">
                    <VideoPlayer data={data} />
                    <div class="container mx-auto px-12 min-w-full w-full">
                        <VideoTitle data={data} />
                        <VideoDescription data={data} />
                    </div>
                </div>
                <div className="col-span-2 2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-12 sm:col-span-12 h-screen">
                    recommended videos go here
                </div>
            </div>
        </div>
    );
};

export default ChannelPage;
