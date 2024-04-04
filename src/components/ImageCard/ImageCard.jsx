import css from './ImageCard.module.css';

const ImageCard = ({
  imgData: {
    urls: { small, regular },
    alt_description,
  },
  onClick,
}) => {
  return (
    <>
      <div className={css.imgWrapper}>
        <img
          src={small}
          alt={alt_description}
          width={300}
          height={250}
          onClick={() => onClick({ regular, alt_description })}
        />
      </div>
    </>
  );
};
export default ImageCard;
