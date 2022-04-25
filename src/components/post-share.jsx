import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { popup } from "../lib/utils";
import FacebookIcon from "./icons/facebook";
import LinkIcon from "./icons/link";
import MessengerIcon from "./icons/messenger";
import TwitterIcon from "./icons/twitter";
import WhatsappIcon from "./icons/whatsapp";
import style from "./post-share.module.scss";

export default function PostShare({ link, title }) {
  const affiliateText = `${process.env.NEXT_PUBLIC_WEB_URL}/article/${link}`;
  const linkFacebookMobile = `https://www.facebook.com/dialog/share?display=popup&href=${affiliateText}&redirect_uri=https://komunitasmea.com&app_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`;
  const linkFacebookDesktop = `https://www.facebook.com/v9.0/dialog/feed?app_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&display=popup&link=${affiliateText}&redirect_uri=${process.env.NEXT_PUBLIC_WEB_URL}`;
  return (
    <>
      <div className={style.share} data-testid="share-affiliate-class">
        <p className="mb-16px lg:mb-0 text-light-blue font-bold mr-6">Bagikan Artikel</p>
        <div className="flex gap-x-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              popup(
                window.innerWidth >= 992
                  ? linkFacebookDesktop
                  : linkFacebookMobile,
                "__Affiliate",
                {
                  width: 480,
                  height: 653,
                }
              );
            }}
          >
            <FacebookIcon className="w-100" />
          </div>
          <div
            className="cursor-pointer d-lg-block d-none"
            onClick={() => {
              popup(
                `https://www.facebook.com/v9.0/dialog/send?app_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&display=popup&link=${affiliateText}&redirect_uri=https%3A%2F%2Fkomunitasmea.com#close`,
                "__Affiliate",
                {
                  width: 480,
                  height: 653,
                }
              );
            }}
          >
            <MessengerIcon className="w-100" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() =>
              popup(
                `https://api.whatsapp.com/send?text=${title} ${affiliateText}`,
                "__Affiliate",
                {
                  width: 480,
                  height: 653,
                }
              )
            }
          >
            <WhatsappIcon className="w-100" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() =>
              popup(
                `https://twitter.com/intent/tweet?text=${title} ${affiliateText}`,
                "__Affiliate",
                {
                  width: 480,
                  height: 653,
                }
              )
            }
          >
            <TwitterIcon className="w-100" />
          </div>
          <CopyToClipboard
            text={affiliateText}
            onCopy={() => alert("Link berhasil dicopy")}
          >
            <div className="cursor-pointer">
              <LinkIcon className="w-100" />
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
}
