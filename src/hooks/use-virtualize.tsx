import { useState, useEffect, useRef, useCallback, Ref } from "react";

interface UseVirtualizeOptions<T> {
  items: T[];
  itemHeight: number;
  bufferItems?: number;
}

interface UseVirtualizeResult<T> {
  containerRef: Ref<HTMLDivElement>;
  visibleItems: T[];
  totalHeight: number;
  getItemIndex: (item: T) => number;
}

export function useVirtualize<T>({
  items,
  itemHeight,
}: UseVirtualizeOptions<T>): UseVirtualizeResult<T> {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0 || !containerRef.current) return;

    const bufferItems = 1;
    const containerHeight = containerRef.current.clientHeight;
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - bufferItems
    );
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + bufferItems
    );

    const visibleItems = items.slice(startIndex, endIndex + 1);
    setVisibleItems(visibleItems);
  }, [scrollTop, items]);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, containerRef.current]);

  const totalHeight = items.length * itemHeight;

  const getItemIndex = useCallback(
    (item: T) => {
      return items.indexOf(item);
    },
    [items]
  );

  return {
    containerRef,
    visibleItems,
    totalHeight,
    getItemIndex,
  };
}
