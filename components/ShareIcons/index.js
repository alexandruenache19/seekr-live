import React, { useState } from "react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "antd/lib/typography";
import message from "antd/lib/message";
import Button from "antd/lib/button";
import { withAuthModal } from "components/Auth";
import {
  CloudDownloadOutlined,
  LinkOutlined,
  LoadingOutlined,
  InstagramOutlined
} from "@ant-design/icons";

const { Text } = Typography;

export const ShareIcons = ({
  auth,
  podcastTitle,
  url,
  title,
  wrapperStyle,
  videoURL,
  snippet,
  openAuthModal
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{ ...styles.shareLayer, ...wrapperStyle }}
      className="share-icons"
    >
      {loading && (
        <div style={styles.loadingDiv}>
          <LoadingOutlined style={styles.loadingIcon} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Text style={styles.shareTitle}>{title}</Text>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: title ? "2rem" : 0
          }}
        >
          <Button
            style={{
              ...styles.downloadBtn,
              ...styles.shareBtn,
              cursor: "pointer",
              backgroundColor: "#072AC8"
            }}
            onClick={() => {
              if (auth.user === null) {
                openAuthModal();
              }
            }}
          >
            <InstagramOutlined style={{ fontSize: 18, color: "#FFFFFF" }} />
          </Button>
          <CopyToClipboard text={url} onCopy={() => message.success("Copied!")}>
            <div
              style={{
                ...styles.downloadBtn,
                ...styles.shareBtn,
                cursor: "pointer",
                backgroundColor: "#072AC8"
              }}
            >
              <LinkOutlined style={{ fontSize: 18, color: "#FFFFFF" }} />
            </div>
          </CopyToClipboard>
          <FacebookShareButton style={styles.shareBtn} url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            style={styles.shareBtn}
            title={`A snippet from ${podcastTitle} via @snippet_club`}
            url={url}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton style={styles.shareBtn} url={url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <RedditShareButton style={styles.shareBtn} url={url}>
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
      </div>
    </div>
  );
};

const styles = {
  shareLayer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem",
    marginTop: "3rem"
  },
  shareBtn: {
    marginRight: "0.5rem"
  },
  shareTitle: {
    color: "#FFFFFF",
    fontSize: 16
  },
  downloadBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#2EC4B6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingIcon: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  loadingDiv: {
    zIndex: 1000,
    backdropFilter: "blur(6px)",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.3)",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};
export default withAuthModal(ShareIcons);
