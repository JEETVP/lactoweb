import React, { useEffect, useState } from 'react';

function ToastContainer() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timeoutId;

    const showToast = (event) => {
      window.clearTimeout(timeoutId);
      setToast(event.detail);
      timeoutId = window.setTimeout(() => setToast(null), 2800);
    };

    window.addEventListener('donjuan:toast', showToast);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('donjuan:toast', showToast);
    };
  }, []);

  if (!toast) {
    return null;
  }

  return (
    <div className={`toast toast--${toast.type || 'success'}`} role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.2 2.2 2.2 4.8-5" />
        </svg>
      </span>
      <strong>{toast.message}</strong>
      <button type="button" aria-label="Cerrar notificación" onClick={() => setToast(null)}>
        ×
      </button>
    </div>
  );
}

export default ToastContainer;
