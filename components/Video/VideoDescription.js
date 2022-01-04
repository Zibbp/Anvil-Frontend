import eventBus from "../../utils/EventBus";

const VideoDescription = ({ data }) => {
  const formatLinks = `<a class="description-body dark:text-light-900">${data.video.description.replace(
    /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
    function (match, space, url) {
      var hyperlink = url;
      if (!hyperlink.match("^https?://")) {
        hyperlink = "http://" + hyperlink;
      }
      return (
        space +
        '<a class="description-link" target="_blank" href="' +
        hyperlink +
        '">' +
        url +
        "</a>"
      );
    }
  )}</a>`;
  const formattedDescription = formatLinks.replace(
    /(?:(?:([01]?\d):)?([0-5]?\d))?:([0-5]?\d)/gi,
    function (match) {
      return "<a>" + match + "</a>";
    }
  );

  function toTimestamp(time) {
    console.log("clicked to timestamp with time: ", time);
    eventBus.dispatch;
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
    <div class="container pt-2 mx-auto">
      <div
        class="
        text-md text-gray-900
        dark:text-light-900
        text-left
        description-text
        max-w-5xl
      "
      >
        <div
          // @click="clickTimestamp"
          class="a dark:text-gray-100"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        ></div>
      </div>
    </div>
  );
};

export default VideoDescription;
