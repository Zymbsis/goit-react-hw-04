import './App.css';
import splashRequest from '../splash-api';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Notifications from './Notifications/Notifications';

function App() {
  const [imageArray, setImageArray] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueForSearch, setValueForSearch] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const imgGalleryRef = useRef(null);

  useEffect(() => {
    if (!valueForSearch.length) {
      return;
    }
    const fetchFunction = async () => {
      try {
        setLoadMoreButton(false);
        setLoading(true);
        setError(false);
        const data = await splashRequest(currentPage, valueForSearch);
        setImageArray(prev =>
          prev ? prev.concat(data.results) : data.results
        );
        if (data.total_pages > currentPage) {
          setLoadMoreButton(true);
        } else if (data.total_pages === currentPage || data.total_pages === 0) {
          setNotification(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFunction();
  }, [valueForSearch, currentPage]);

  useLayoutEffect(() => {
    if (imgGalleryRef.current !== null && currentPage > 1) {
      const elemHeight =
        imgGalleryRef.current.lastChild.getBoundingClientRect().height;
      const valueForScrollWindow = Math.ceil(elemHeight * 2.5);
      window.scrollBy({ top: valueForScrollWindow, behavior: 'smooth' });
    }
  }, [imageArray, currentPage]);

  const onSearch = value => {
    if (value === valueForSearch) {
      return;
    }
    setNotification(false);
    setCurrentPage(1);
    setValueForSearch(value);
    setImageArray(null);
  };

  const onClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onImageClick = obj => {
    setIsModalOpen(true);
    setModalImage(obj);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <div className="img-container">
        {Array.isArray(imageArray) && imageArray.length && (
          <ImageGallery
            imgData={imageArray}
            ref={imgGalleryRef}
            onClick={onImageClick}
          />
        )}
        {loading && <Loader />}
        {notification && <Notifications condition={imageArray} />}
        {loadMoreButton && <LoadMoreBtn onClick={onClick} />}
        {error && <ErrorMessage />}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        image={modalImage}
        setter={setIsModalOpen}
      />
    </>
  );
}

export default App;
