export const useHandleKeyDown = () => {
  const enterKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, func: () => void) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      if (event.nativeEvent.isComposing) {
        return;
      }
      func();
    }
  };
  return { enterKeyDown };
};
