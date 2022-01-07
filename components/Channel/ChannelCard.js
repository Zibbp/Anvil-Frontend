import Image from "next/image";
import Link from "next/link";
import getConfig from "next/config";

const ChannelCard = (props) => {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    var channelName = props.channel.name.replace(/ /g, "_");
    var imageLoaded = false;
    return (
        <Link href={`/channels/${props.channel.name}`} passHref>
            <div
                className=" dark:bg-dark-black-700 max-w-sm mb-5"
                style={{ maxWidth: "13rem", minWidth: "13rem" }}
            >
                <a href={`/channels/${props.channel.name}`}>
                    <Image
                        src={`${publicRuntimeConfig.NGINX_URL}/videos/${channelName}/${channelName}.jpg`}
                        alt={`${props.channel.name} channel logo`}
                        className={`rounded-lg`}
                        height={208}
                        width={208}
                        placeholder={"blur"}
                        blurDataURL={`data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`}
                    />
                </a>
                <div className="pb-2">
                    <a href={`/channels/${props.channel.name}`}>
                        <h5 className="text-gray-900 dark:text-gray-300 font-bold text-center text-2xl tracking-tight max-w-sm">
                            {props.channel.name}
                        </h5>
                    </a>
                </div>
            </div>
        </Link>
    );
};

export default ChannelCard;
