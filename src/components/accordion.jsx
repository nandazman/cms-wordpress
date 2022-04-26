import { domToReact } from "html-react-parser";
import { useState } from "react";

export default function Accordion({ children }) {
  const [open, setOpen] = useState(false);

  const element = {};
  const filteredChildren = children.filter(({ type, attribs, children}) => {
    if (type === "tag") {
      element[attribs.role] = children;
      return true;
    }
    return false;
  });
  console.log({ children, filteredChildren });

  const dom = filteredChildren.map((item) => {
    return domToReact([item], {
      library: {
        createElement(type, props, children) {
          if (props.role === "tab") {
            return (
              <div {...props} onClick={(e) => {
                e.preventDefault()
                setOpen((o) => !o)
              }}>
                {domToReact(element.tab)}
              </div>
            );
          }
          if (props.role === "tabpanel") {
            return (
              <div
                {...props}
                className="overflow-hidden max-h-0 block transition-all"
                style={{ maxHeight: open ? "1000px" : "" }}
                onClick={() => console.log("TESTSTSzs 2")}
              >
                {domToReact(element.tabpanel)}
              </div>
            );
          }
        },
      },
    });
  });

  return <div className="accordion-item">{dom}</div>;
}
