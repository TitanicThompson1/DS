import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import PatternCardList from '../../components/PatternCardList';
import SearchBar from '../../components/SearchBar';
import patterns from '../../placeholders/PlaceholderPatterns';
import { Layout, PageTitle } from '../../style';
import { SearchBarContainer } from './style';

export default function SearchPage() {
  const [text, setText] = useState('');
  const [patternsList, setPatterns] = useState(patterns);

  const updatePattern = (pattern) => {
    const index = patternsList.findIndex((item) => item.id === pattern.id);
    const list = patternsList;
    list.splice(index, 1, pattern);
    setPatterns([...list]);
  };

  return (
    <Layout>
      <Row>
        <Col>
          <PageTitle> Search </PageTitle>
        </Col>
      </Row>
      <SearchBarContainer>
        <SearchBar text={text} setText={setText} />
      </SearchBarContainer>
      {text !== '' ? (
        <p>
          Showing results for &quot;
          {text}
          &quot;.
        </p>
      ) : undefined}
      <PatternCardList patterns={patternsList} updatePattern={updatePattern} />
    </Layout>
  );
}