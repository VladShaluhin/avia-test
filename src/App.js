import React, { Component, Fragment } from "react";
import GlobalStyle from "./globalStyle";
import styled from "styled-components";

import Logo from "./components/Logo";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Totop from "./components/Totop";

import Filter from "./modules/Filter";
import List from "./modules/List";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  width: 750px;
  justify-content: space-between;
  margin: auto;
  align-items: flex-start;
`;

const Aside = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  state = {
    allChecked: true,
    stops: [
      { id: 0, value: "Бeз пересадок", isChecked: true },
      { id: 1, value: "1 пересадка", isChecked: true },
      { id: 2, value: "2 пересадки", isChecked: true },
      { id: 3, value: "3 пересадки", isChecked: true }
    ],
    tickets: [],
    loading: false,
    searchId: null,
    error: null,
    loaded: false
  };

  handleLoad = async key => {
    if (!key) {
      this.setState({
        error: "Need searchId"
      });
      return;
    }
    if (this.state.loaded) {
      this.setState({
        error: "Full list loaded"
      });
      return;
    }
    this.setState({
      loading: true
    });

    try {
      const r = await fetch(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${key}`
      );
      const response = await r.json();
      if (!response.stop) {
        this.setState({
          loading: false,
          tickets: [...this.state.tickets, ...response.tickets]
        });
      } else {
        this.setState({
          loading: false,
          tickets: [...this.state.tickets, ...response.tickets],
          loaded: true
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: "Something went wrong"
      });
    }
  };

  handleAllCheck = event => {
    let stops = [...this.state.stops];
    stops.forEach(stop => (stop.isChecked = event.target.checked));
    this.setState({ stops: stops });
    this.setState({ allChecked: event.target.checked });
  };

  handleCheck = event => {
    let stops = [...this.state.stops];
    stops.forEach(stop => {
      if (stop.value === event.target.value)
        stop.isChecked = event.target.checked;
    });
    this.setState({ stops: stops }, () => {
      if (stops.some(i => !i.isChecked)) {
        this.setState({
          allChecked: false
        });
      } else {
        this.setState({
          allChecked: true
        });
      }
    });
  };

  getFilteredTickets = () => {
    if (this.state.allChecked) {
      return this.state.tickets;
    }

    return this.state.tickets.filter(i => {
      const toStop = i.segments[0].stops.length;
      const fromStop = i.segments[1].stops.length;

      return (
        this.state.stops.find(i => i.id === toStop).isChecked &&
        this.state.stops.find(i => i.id === fromStop).isChecked
      );
    })
  };

  componentDidMount() {
    if (!this.state.searchId) {
      this.setState({ loading: true });
      fetch("https://front-test.beta.aviasales.ru/search")
        .then(res => res.json())
        .then(res => this.setState({ searchId: res.searchId, loading: false }))
        .catch(err => this.setState({ error: "Something went wrong" }));
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchId !== prevState.searchId) {
      this.handleLoad(this.state.searchId);
    }
  }

  render() {
    return (
      <Fragment>
        <GlobalStyle />
        {this.state.loading ? <Loader /> : null}
        <Layout>
          <ButtonHolder>
            <Logo
              onClick={() => {
                this.handleLoad(this.state.searchId);
              }}
            ></Logo>
          </ButtonHolder>
          <Container>
            <Aside>
              <Filter
                allChecked={this.state.allChecked}
                handleCheck={this.handleCheck}
                handleAllCheck={this.handleAllCheck}
                stops={this.state.stops}
              />
            </Aside>
            <Main>
              {this.state.tickets ? (
                <List list={this.getFilteredTickets()}></List>
              ) : null}
              {this.state.error ? (
                <Message
                  error
                  text={this.state.error}
                  onClose={() => this.setState({ error: "" })}
                ></Message>
              ) : null}
            </Main>
          </Container>
        </Layout>
        <Totop />
      </Fragment>
    );
  }
}

export default App;
