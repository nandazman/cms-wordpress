export default function LinkIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="link-icon"
    >
      <g filter="url(#filter0_d)">
        <rect x="4" width="64" height="64" rx="32" fill="white" />
        <path
          d="M34.4561 33.5441C35.2752 34.3632 36.3862 34.8234 37.5446 34.8234C38.703 34.8234 39.8139 34.3632 40.6331 33.5441L43.7211 30.4561C44.5272 29.6343 44.9764 28.5275 44.9708 27.3763C44.9653 26.2251 44.5056 25.1227 43.6915 24.3087C42.8775 23.4946 41.7751 23.0349 40.6239 23.0293C39.4727 23.0238 38.3659 23.473 37.5441 24.2791L36.0001 25.8231M37.5441 30.4561C36.7249 29.6374 35.6142 29.1774 34.4561 29.1774C33.2979 29.1774 32.1872 29.6374 31.3681 30.4561L28.2791 33.5441C27.4599 34.3633 26.9998 35.4742 26.9998 36.6326C26.9998 37.791 27.4599 38.902 28.2791 39.7211C29.0982 40.5403 30.2091 41.0004 31.3676 41.0004C32.526 41.0004 33.6369 40.5403 34.4561 39.7211L36.0001 38.1771L37.5441 30.4561Z"
          stroke="#E87F2F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="4.5"
          y="0.5"
          width="63"
          height="63"
          rx="31.5"
          stroke="#E87F2F"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="72"
          height="72"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}