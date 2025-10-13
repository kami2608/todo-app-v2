import { useEffect } from "react";

type ClickOutsideProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  state: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useClickOutside({
  ref,
  state,
  handle,
}: ClickOutsideProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handle(false);
      }
    }

    if (state) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, state, handle]);
}
