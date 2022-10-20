import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { SearchError } from './SearchError/SearchError';
import { fetchArticles } from 'js/fetchArticles';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery && page) {
      setStatus('pending');

      fetchArticles(searchQuery, page)
        .then(r => {
          const images = r.hits.map(image => {
            return {
              id: image.id,
              webformatURL: image.webformatURL,
              tags: image.tags,
              largeImageURL: image.largeImageURL,
            };
          });

          setImages(prevState => [...prevState, ...images]);
          setStatus('resolved');
          setTotalPages(Math.ceil(r.totalHits / 12));
        })
        .catch(e => {
          setStatus('rejected');
        });
    }
  }, [page, searchQuery]);

  const fetchImages = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <>
      <Searchbar onSubmit={fetchImages} />
      {status === 'rejected' && (
        <SearchError
          message={`Sorry, we did not find any results for "${searchQuery}"`}
        />
      )}
      {images.length > 0 && <ImageGallery results={images} />}
      {images.length > 0 && status === 'resolved' && page !== totalPages && (
        <Button onClick={loadMore} />
      )}
      {status === 'pending' && (
        <ThreeDots
          height="80"
          width="80"
          radius="12"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperClass="Loader"
          visible={true}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
