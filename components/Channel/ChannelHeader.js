import Image from "next/image";

const ChannelHeader = ({ channel }) => {
    if (!channel) return null;

    var channelName = channel.name.replace(/ /g, "_");

    return (
        <div className="-mt-1 dark:bg-ytd-800 bg-gray-100">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4 px-16">
                    <div className="flex items-center">
                        <div className="w-24 h-24 rounded-full relative">
                            <Image
                                className={"rounded-full"}
                                src={`${process.env.NEXT_PUBLIC_NGINX_URL}/videos/${channelName}/${channelName}.jpg`}
                                alt={`${channel.name} channel logo`}
                                layout={"fill"}
                                objectFit={"contain"}
                            />
                        </div>
                        <div className="ml-6">
                            <div className="text-2xl font-normal flex items-center dark:text-gray-100">
                                <span className="mr-2">{channel.name}</span>
                            </div>
                            <p className="mt-2 font-hairline text-sm dark:text-ytd-200">
                                {channel.video_count} videos
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-16">
                    <ul className="list-reset flex">
                        <li className="text-center py-3 px-8 border-b-2 border-solid border-grey-dark">
                            <a href="#" c>
                                Videos
                            </a>
                        </li>
                        <li className="text-center py-3 px-8">
                            <a href="#" className="hover:text-black">
                                Playlists
                            </a>
                        </li>
                        <li className="text-center py-3 px-8">
                            <a href="#" className="hover:text-black">
                                Community
                            </a>
                        </li>
                        <li className="text-center py-3 px-8">
                            <a href="#" className="hover:text-black">
                                Channels
                            </a>
                        </li>
                        <li className="text-center py-3 px-8">
                            <a href="#" className="hover:text-black">
                                About
                            </a>
                        </li>
                        <li className="text-center py-3 px-8">
                            <i className="fa fa-search fa-lg text-grey-dark"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChannelHeader;
