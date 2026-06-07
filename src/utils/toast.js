export function showSuccessToast(message) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent('donjuan:toast', {
      detail: {
        message,
        type: 'success',
      },
    }),
  );
}
