import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ReactGA from 'react-ga';

import axios from 'axios';

import BookmarksSelector from '../../components/BookmarksSelector';
import PatternCardList from '../../components/PatternCardList';
import { Layout, PageTitle } from '../../style/GlobalStyle';

export default function FavoritesPage() {
  const [loading, setLoading] = useState(false);
  const [patternsList, setPatterns] = useState([]);
  const [isFavoriteList, setFavoriteList] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState(JSON.parse(localStorage.getItem('favorites')));
  const [bookmarkIds, setBookmarkIds] = useState(JSON.parse(localStorage.getItem('bookmarks')));

  useEffect(() => {
    setLoading(true);
    document.title = 'Favorites';
    ReactGA.pageview('/bookmarks/favourites');

    axios.get(`${process.env.REACT_APP_URL}/patterns`).then((res) => {
      setPatterns(res.data);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const updateListView = (newIsFavoriteList) => {
    if (newIsFavoriteList === isFavoriteList) return;
    setFavoriteList(newIsFavoriteList);
    ReactGA.pageview(`/bookmarks/${newIsFavoriteList ? 'favourites' : 'saved'}`);
  };

  const favoriteList = favoriteIds ? patternsList.filter(
    (e) => favoriteIds[e.id],
  ) : [];

  const readlaterIds = JSON.parse(localStorage.getItem('bookmarks'));
  const readlaterList = bookmarkIds ? patternsList.filter(
    (e) => readlaterIds[e.id],
  ) : [];

  if (loading) {
    return (
      <Layout>
        <Row className="mb-4">
          <Col md="8">
            <PageTitle> Favorites </PageTitle>
          </Col>
          <BookmarksSelector updateListView={updateListView} />
        </Row>
        <Row className="mt-5 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      </Layout>
    );
  }
  return (
    <Layout>
      <Row className="mb-4">
        <Col md="8">
          <PageTitle> Favorites </PageTitle>
        </Col>
        <BookmarksSelector updateListView={updateListView} />
      </Row>
      { (isFavoriteList ? (favoriteList.length > 0) : (readlaterList.length > 0))
        ? (
          <PatternCardList
            patterns={isFavoriteList ? favoriteList : readlaterList}
            setFavoriteIds={setFavoriteIds}
            setBookmarkIds={setBookmarkIds}
          />
        )
        : (
          <p>
            You have no favorite patterns.
          </p>
        )}
    </Layout>
  );
}
