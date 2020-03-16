import { useState, useMemo } from 'react';

export default function useToggle() {
  const [toggle, setToggle] = useState(false);

  return useMemo(() => ({
    toggle,
    setToggle,
  }));
}
