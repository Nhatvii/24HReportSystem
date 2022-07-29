import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Passers, // Pass the same wrappers to every children components
  share, // share(<P title="prop-passer"/>) instead of manually writing object {title: "prop-passer"}
  P, // The cost of using them is 70 bytes per each.
} from "prop-passer";

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
} from "react-share";
import postApi from "../../../../api/postApi";
import styled from "styled-components";
import { toast } from "react-toastify";
const CopyLink = styled.div`
  :hover {
    cursor: pointer;
  }
`;
export default class SocialShare extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: "",
    url: "",
    id: "",
  };
  render() {
    const currentUrl = window.location.href;
    async function updateShareCount(id) {
      try {
        const params = { postID: id };
        const response = await postApi.updateShareCount(params);
        if (response.statusCode === 200) {
          // TODO:
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    const ShareList = Passers(
      share(<P url={this.props.url} className="network__share-button" />)
    )({ className: "network" })("span");
    return (
      <section className="c-network">
        <ShareList>
          <FacebookShareButton
            quote={this.props.title}
            hashtag="#report24h"
            className="pt-1 pl-1 pr-1 pb-1"
            onShareWindowClose={() => updateShareCount(this.props.id)}
          >
            <FacebookIcon size={"2rem"} round /> Chia sẻ lên Facebook
          </FacebookShareButton>
          <br />
          <TwitterShareButton
            quote={this.props.title}
            hashtag="#report24h"
            className="pt-1 pl-1 pr-1 pb-1"
            onShareWindowClose={() => updateShareCount(this.props.id)}
          >
            <TwitterIcon size={"2rem"} round /> Chia sẻ lên Twitter
          </TwitterShareButton>
          <br />
          <TelegramShareButton
            quote={this.props.title}
            hashtag="#report24h"
            className="pt-1 pl-1 pr-1 pb-1"
            onShareWindowClose={() => updateShareCount(this.props.id)}
          >
            <TelegramIcon size={"2rem"} round /> Chia sẻ lên Telegram
          </TelegramShareButton>
        </ShareList>
        {/* Copylink */}
        <CopyLink
          className="pt-1 pl-1 pr-1 pb-1"
          onClick={() => (
            navigator.clipboard.writeText(currentUrl),
            updateShareCount(this.props.id)
          )}
        >
          <span
            class="fa fa-stack fa-lg align-middle"
            style={{ verticalAlign: "top" }}
            onClick={() => (
              navigator.clipboard.writeText(currentUrl),
              updateShareCount(this.props.id)
            )}
          >
            <i
              class="fa fa-solid fa-circle fa-stack-2x"
              style={{ color: "#1da1f2" }}
            ></i>
            <i
              class="fa fa-solid fa-link fa-stack-1x fa-inverse"
              style={{ color: "#fff" }}
            ></i>
          </span>{" "}
          <span
            className="align-middle"
            onClick={() => (
              navigator.clipboard.writeText(currentUrl),
              updateShareCount(this.props.id)
            )}
          >
            Sao chép liên kết
          </span>
        </CopyLink>
      </section>
    );
  }
}
