import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ smallImg, onClick, largeImageURL }) {
  return (
    <li className={s.item} onClick={() => onClick(largeImageURL)}>
      <img className={s.itemImage} src={smallImg} alt="" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string,
};
