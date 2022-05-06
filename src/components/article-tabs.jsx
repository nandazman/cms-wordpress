import cn from "classnames";
import { memo, useEffect, useRef, useState } from "react";
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
  const [scrollData, setScrollData] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  const ref = useRef();

  const onMouseDown = (e) => {
    setScrollData((data) => {
      return {
        ...data,
        isScrolling: true,
        clientX: e.clientX,
      };
    });
  };

  const onNotDragging = () => {
    setScrollData((data) => {
      return {
        ...data,
        isScrolling: false,
      };
    });
  };

  const onMouseMove = (e) => {
    const { clientX, scrollX, isScrolling } = scrollData;
    if (!isScrolling) return;
    
    // will scroll pixel by pixel as mouse still dragging
    ref.current.scrollLeft = (scrollX + e.clientX - clientX) * -1;
    setScrollData((data) => {
      return {
        ...data,
        scrollX: data.scrollX + e.clientX - clientX,
        clientX: e.clientX,
      };
    });
  };

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
    <div
      className={cn(style.wrapper, "mb-48px mx-lg-48px mx-20px")}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onNotDragging}
      onMouseMove={onMouseMove}
      onMouseLeave={onNotDragging}
    >
      <div className={style.tabs}>
        {data.map(({ node }) => {
          return (
            <div
              key={node.slug}
              className={cn(style.tab, {
                [style.active]: activeTab === node.slug,
              })}
              onClick={() => {
                if (scrollData.isScrolling || activeTab === node.slug) return;
                setActiveTab(node.slug);
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