import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { forwardRef } from 'react';

const ImageGallery = forwardRef(({ imgData, onClick }, ref) => {
  return (
    <ul className={css.imgList}>
      {imgData.map(item => {
        return (
          <li key={item.id} ref={ref}>
            <ImageCard imgData={item} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
});
ImageGallery.displayName = ImageGallery;

export default ImageGallery;
