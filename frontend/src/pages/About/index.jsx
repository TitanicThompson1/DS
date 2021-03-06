/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import ReactGA from 'react-ga';

import ContributeModal from '../../components/ContributePopup/index';
import SubSubTitleText from '../../components/SubSubTitleText/index';
import SubTitleText from '../../components/SubTitleText/index';
import { Layout, PageTitle } from '../../style/GlobalStyle';
import { Title, Text, ContributeButton } from './style';

export default function About() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'About';
    ReactGA.pageview('/about');
  }, []);

  const openModal = () => {
    setShowModal(true);
    ReactGA.modalview('/about/contribute');
  };

  return (
    <Layout>
      <Row className="g-0 justify-content-between">
        <Col xs={12} md={6} className="pe-md-5">
          <PageTitle className="mb-4">About</PageTitle>
          <SubTitleText title="Scrum">
            Scrum is about helping small teams create, build, and evolve a
            product, one slice at a time. Scrum is as much about people as it
            is about the products they build and use. It defines a work
            environment where teams can challenge themselves to become better
            and better at their work over time. Scrum is not a development
            method, but rather a product development framework. A method
            prescribes steps that transform a problem definition into a
            solution. Scrum, on the other hand, is a framework for the team to
            continuously evaluate its product and evolve it into a better
            solution.
          </SubTitleText>
          <SubTitleText title="Pattern">
            A pattern is a repeatably applicable solution to a problem that
            arises in a specific context. We share this fundamental view of
            the world, that says when you build something you must also repair
            and make better the world around it. The world at large then
            gradually improves, becomes more coherent and more Whole. A set of
            patterns that work together to this end is called a pattern
            language. Each pattern describes the context of those patterns
            that are prerequisites for the current one. And each pattern also
            advises us about what other patterns might further refine our
            Whole to help complete this one. These relationships, or
            connections, form a structure, a grammar, a language. This app
            presents two such languages: Product Organization, and Value
            Stream.
          </SubTitleText>
          <SubSubTitleText title="Product Organization">
            Builds the relationships between the people and teams in a Scrum
            organization.
          </SubSubTitleText>
          <SubSubTitleText title="Value Stream">
            Builds relationships between steps of product construction, and
            the artifacts that represent parts of the process.
          </SubSubTitleText>
        </Col>
        <Col xs={12} md={6} className="ps-md-5">
          <Title className="mb-4 mt-sm-0 mt-3">
            <img width="150px" height="auto" src="/favicon.ico" alt="logo" />
          </Title>
          <Text>
            This app is inspired in a book about
            Scrum - a simple but powerful way for people to work together. {' '}
            <i>A Scrum book: The Spirit of the Game</i> is available {' '}
            <a href="https://www.amazon.com/Scrum-Book-Spirit-Game/dp/1680506714">here</a>.<br />
            Credits to the authors of the book <i>A Scrum book: The Spirit of the Game</i>,
            in which this app was inspired, are in order.<br /><br />
            <b>Book authors</b>:{' '}
            Jeff Sutherland,
            James O. Coplien,
            Lachlan Heasman,
            Mark den Hollander,
            Ces??rio Ramos.<br />
            <b>The Scrum Patterns Group</b>:{' '}
            Ademar Aguiar,
            Esther Vervloed,
            Neil Harrison,
            Kiro Harada,
            Joseph Yoder,
            June Kim,
            Alan O&apos;Callaghan,
            Mike Beedle,
            Gertrud Bj??rnvig,
            Dina Friis,
            Ville Reijonen,
            Gabrielle Benefield,
            Jens ??stergaard,
            Veli-Pekka Eloranta,
            Evan Leonard.
          </Text>
          <Text className="mt-4">
            Have an idea for a pattern? Contribute to the book!{' '}
          </Text>
          <ContributeButton className="md-4" onClick={openModal}>I want to contribute</ContributeButton>
          <ContributeModal
            show={showModal}
            setShow={setShowModal}
            onHide={() => setShowModal(false)}
          />
          <SubTitleText title="The Team">
            This app was developed in context of Large Scale Software Development,
            a discipline teached in the Master in Informatics and Computer Engineering of
            the Faculty of Engineering University of Porto by
            Ademar Aguiar and Hugo Sereno Ferreira.<br /><br />
            <b>The developers of the app: {' '}</b>
            Ana Teresa Cruz,
            Andr?? Nascimento,
            Ant??nio Bezerra,
            Breno Accioly,
            Catarina Fernandes,
            Daniel Gon??alves,
            Diogo Nunes,
            Gon??alo Alves,
            In??s Quarteu,
            In??s Silva,
            Jo??o Castro Pinto,
            Jo??o Rom??o,
            Jo??o Gon??alves,
            Jos?? Macedo,
            Jos?? Lu??s Sousa Tavares,
            Andr?? Assun????o,
            M??rcio Duarte,
            Mariana Truta,
            Mariana Ramos,
            Nuno Resende,
            Pedro Seixas,
            Rafael Cristino,
            Ricardo Nunes,
            Ricardo Carvalho,
            Rita Peixoto,
            Tiago Alves,
            Xavier Pisco
          </SubTitleText>
        </Col>
      </Row>
    </Layout>
  );
}
