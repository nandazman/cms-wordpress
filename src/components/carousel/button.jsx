import ChevronIcon from "../icons/chevron";

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
);

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <ChevronIcon
      className="embla__button__svg rotate-180 relative top-0.5"
      variant="rounded"
    />
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <ChevronIcon className="embla__button__svg" variant="rounded" />
  </button>
);
