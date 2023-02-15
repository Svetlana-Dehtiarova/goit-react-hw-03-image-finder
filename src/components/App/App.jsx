import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import imagesApi from '../../services/API.js';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from '../Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    largeImageURL: '',
    currentPage: 1,
    total: 0,
    showModal: false,
    loading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({
      images: [],
      searchQuery: query,
      largeImageURL: '',
      currentPage: 1,
      total: 0,
      showModal: false,
      loading: false,
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ loading: true });

    imagesApi(options)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return Notify.warning(
            'Результат поиска зависит от качества запроса. Давайте попробуем еще раз :)'
          );
        }

        if (totalHits === 0) {
          return Notify.info('Пока-что это всё, что удалось найти...');
        }

        const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = searchId => {
    const image = this.state.images.find(image => image.id === searchId);
    this.setState({ largeImageURL: image.largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, loading, showModal, error, largeImageURL } = this.state;
    return (
      <div className={s.App}>
        {error && Notify.failure('Sorry, there is some error')}
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {loading && <Loader />}

        {images.length > 0 &&
          !loading &&
          images.length !== this.state.total && (
            <Button onClick={this.loadMore} />
          )}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={largeImageURL} />
        )}
      </div>
    );
  }
}

export default App;
