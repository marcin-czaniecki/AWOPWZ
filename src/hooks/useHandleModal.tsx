import { useState, useRef, useEffect } from "react";

const useHandleModal = (init: boolean = false) => {
  const [visible, setVisible] = useState(init);
  const ref = useRef<any>(null);

  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const inverse = () => setVisible(!visible);

  useEffect(() => {
    const closeNavigationIfClickOtherElement = (e: MouseEvent) => {
      const { current } = ref;
      if (visible && current) {
        let clickInNavigation: boolean = current.contains(e.target as Node);
        if (!clickInNavigation) {
          setVisible(false);
        }
      }
    };
    document.addEventListener("click", closeNavigationIfClickOtherElement);
    return () => {
      document.removeEventListener("click", closeNavigationIfClickOtherElement);
    };
  }, [visible]);

  return { visible, setVisible, ref, close, open, inverse };
};

export default useHandleModal;
