function useEscapeClose(isOpen, closeActiveModal) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isOpen, closeActiveModal]);
}

export default useEscapeClose;
