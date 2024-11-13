import { useState, useMemo } from "react";

interface ToggleHook {
  toggle: boolean;
  setToggle: (value: boolean) => void;
}

export default function useToggle(): ToggleHook {
  const [toggle, setToggle] = useState<boolean>(false);

  return useMemo(
    () => ({
      toggle,
      setToggle,
    }),
    [toggle],
  );
}
