import cn from "classnames";
import { memo, useEffect, useState } from "react";
import { fetchCategories } from "../lib/api";
import style from "./article-tab.module.scss";

const defaultTab = [
  {
    node: {
      name: "Artikel Terbaru",
      slug: "artikel-terbaru",
    },
  },
];

function ArticleTabs({ onChangeActiveTab }) {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("artikel-terbaru");

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      const filteredData = data.filter(
        (item) => item.node.slug !== "uncategorized"
      );
      setData([...defaultTab, ...filteredData] || []);
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (!data.length) return <></>;

  return (
    <div className={cn(style.wrapper, "mb-48px")}>
      <div className={style.tabs}>
        {data.map(({ node }) => {
          return (
            <div
              key={node.slug}
              className={cn(style.tab, {
                [style.active]: activeTab === node.slug,
              })}
              onClick={() => {
                setActiveTab(node.slug)
                onChangeActiveTab(node.slug);
              }}
            >
              {node.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ArticleTabs);