import React, { Component } from "react";
import styled from "styled-components";

import Button from "../../components/Button";
import Sort from "../Sort";
import ListItem from "./ListItem";

const Container = styled.div`
  width: 500px;
  flex-direction: column;
  border-radius: 5px;
`;

class List extends Component {
  state = {
    isPriceSort: true,
    filter: this.props.filter,
    viewList: [],
    list: [],
    count: 5
  };

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      const list = [...this.props.list].sort((a, b) => a.price - b.price);
      const viewList = [...list].splice(0, this.state.count);
      this.setState({
        viewList,
        list
      });
    }
  }

  handleChangeSortType = typePrice => {
    let list;
    if (typePrice) {
      list = [...this.state.list].sort((a, b) => a.price - b.price);
    } else {
      list = [...this.state.list].sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      );
    }
    this.setState({
      isPriceSort: typePrice,
      list,
      viewList: [...list].splice(0, this.state.count)
    });
  };

  handleShowMore = () => {
    this.setState({
      viewList: [...this.state.list].splice(0, this.state.count + 5),
      count: this.state.count + 5
    });
  };

  render() {
    return (
      <Container>
        <Sort
          price={this.state.isPriceSort}
          onClick={this.handleChangeSortType}
        ></Sort>
        {this.state.viewList.map((i, index) => (
          <ListItem ticket={i} key={index} />
        ))}
        {this.state.viewList.length &&
        this.state.viewList.length !== this.state.list.length ? (
          <Button onClick={this.handleShowMore} left right>
            Show more
          </Button>
        ) : null}
      </Container>
    );
  }
}

export default List;
