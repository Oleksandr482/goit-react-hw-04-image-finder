import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  });

  function onKeydown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  const onCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={onCloseModal}>
      <div className="Modal">
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
