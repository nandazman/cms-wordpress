import cn from "classnames";
import { domToReact } from "html-react-parser";
import { Fragment, useState } from "react";
import ChevronIcon from "./icons/chevron";

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

  const dom = filteredChildren.map((item, index) => {
    return (
      <Fragment key={index}>
        {domToReact([item], {
          library: {
            createElement(type, props, children) {
              if (props.role === "tab") {
                return (
                  <div
                    {...props}
                    className="text-tosca-blue font-semibold relative cursor-pointer py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen((o) => !o);
                    }}
                  >
                    {domToReact(element.tab)}
                    <span
                      className={cn(
                        "absolute top-0 right-0 transition-all",
                        {
                          "rotate-90": !open,
                        },
                        { "-rotate-90": open }
                      )}
                    >
                      <ChevronIcon />
                    </span>
                  </div>
                );
              }
              if (props.role === "tabpanel") {
                return (
                  <div
                    {...props}
                    className="overflow-hidden max-h-0 block transition-all"
                    style={{ maxHeight: open ? "1000px" : "" }}
                  >
                    {domToReact(element.tabpanel)}
                  </div>
                );
              }
            },
          },
        })}
      </Fragment>
    );
  });

  return <div className="accordion-item py-2">{dom}</div>;
}
