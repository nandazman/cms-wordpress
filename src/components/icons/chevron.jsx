import { memo } from "react";

function ChevronIcon({ variant }) {
  if (variant === "rounded") {
    return (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="12"
          height="12"
          rx="6"
          transform="matrix(1 0 0 -1 0 12.9585)"
          fill="white"
        />
        <path
          d="M7.89139 7.22416L4.86148 10.254C4.7914 10.3242 4.69785 10.3628 4.5981 10.3628C4.49835 10.3628 4.4048 10.3242 4.33473 10.254L4.11159 10.0309C3.9664 9.88559 3.9664 9.64933 4.11159 9.5042L6.65589 6.9599L4.10877 4.41278C4.03869 4.34265 4 4.24915 4 4.14946C4 4.04966 4.03869 3.95616 4.10877 3.88597L4.3319 3.66295C4.40204 3.59282 4.49553 3.55418 4.59528 3.55418C4.69503 3.55418 4.78857 3.59282 4.85865 3.66295L7.89139 6.69558C7.96164 6.76594 8.00022 6.85987 8 6.95973C8.00022 7.05998 7.96164 7.15386 7.89139 7.22416Z"
          fill="#2D3356"
        />
      </svg>
    );

  }
  return (
    <svg
      className="inline"
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.2154 5.0683L1.76527 0.618251C1.66235 0.515244 1.52495 0.458496 1.37845 0.458496C1.23195 0.458496 1.09455 0.515244 0.991622 0.618251L0.663901 0.94589C0.450651 1.15938 0.450651 1.50637 0.663901 1.71954L4.40078 5.45642L0.659755 9.19745C0.556829 9.30046 0.5 9.43777 0.5 9.58419C0.5 9.73078 0.556829 9.86809 0.659755 9.97118L0.987476 10.2987C1.09048 10.4017 1.2278 10.4585 1.3743 10.4585C1.5208 10.4585 1.6582 10.4017 1.76113 10.2987L6.2154 5.84463C6.31857 5.7413 6.37524 5.60333 6.37491 5.45667C6.37524 5.30943 6.31857 5.17155 6.2154 5.0683Z"
        fill="#2D3356"
      />
    </svg>
  );
}

export default memo(ChevronIcon)