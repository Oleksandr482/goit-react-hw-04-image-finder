// import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, tegs, largeImageURL }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(state => !state);
  };

  return (
    <>
      <li className="ImageGalleryItem" onClick={toggleModal}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tegs} />
      </li>
      {isOpen && <Modal url={largeImageURL} alt={tegs} onClose={toggleModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tegs: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
