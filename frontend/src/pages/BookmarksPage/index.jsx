import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactGA from 'react-ga';

import axios from 'axios';

import BookmarksSelector from '../../components/BookmarksSelector';
import PatternCardList from '../../components/PatternCardList';
import { Layout, PageTitle } from '../../style/GlobalStyle';

export default function BookmarksPage() {
  const [patternsList, setPatterns] = useState([]);
  const [isFavoriteList, setFavoriteList] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState(JSON.parse(localStorage.getItem('favorites')));
  const [bookmarkIds, setBookmarkIds] = useState(JSON.parse(localStorage.getItem('bookmarks')));

  useEffect(() => {
    document.title = 'Bookmarks';
    ReactGA.pageview('/bookmarks/favourites');

    axios.get(`${process.env.REACT_APP_URL}/patterns`).then((res) => {
      setPatterns(res.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const updateListView = (newIsFavoriteList) => {
    if (newIsFavoriteList === isFavoriteList) return;
    setFavoriteList(newIsFavoriteList);
    ReactGA.pageview(`/bookmarks/${newIsFavoriteList ? 'favourites' : 'saved'}`);
  };

  const updatePattern = (pattern) => {
    const index = patternsList.findIndex((item) => item.id === pattern.id);
    const list = patternsList;
    list.splice(index, 1, pattern);
    setPatterns([...list]);
  };

  const favoriteList = favoriteIds ? patternsList.filter(
    (e) => favoriteIds[e.id],
  ) : [];

  const readlaterIds = JSON.parse(localStorage.getItem('bookmarks'));
  const readlaterList = bookmarkIds ? patternsList.filter(
    (e) => readlaterIds[e.id],
  ) : [];

  return (
    <Layout>
      <Row className="mb-4">
        <Col md="8">
          <PageTitle> Bookmarks </PageTitle>
        </Col>
        <BookmarksSelector
          md="4"
          setFavoriteList={updateListView}
          isFavoriteList={isFavoriteList}
        />
      </Row>
      {
        (isFavoriteList ? (favoriteList.length > 0) : (readlaterList.length > 0))
          ? (
            <PatternCardList
              patterns={isFavoriteList ? favoriteList : readlaterList}
              updatePattern={updatePattern}
              setFavoriteIds={setFavoriteIds}
              setBookmarkIds={setBookmarkIds}
            />
          )
          : (
            <p>
              You have no
              { isFavoriteList ? ' favourited ' : ' bookmarked ' }
              patterns.
            </p>
          )
       }
    </Layout>
  );
}
