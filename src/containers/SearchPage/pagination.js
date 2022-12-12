/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
const defaultProps = {
  initialPage: 1,
};
const PaginationStyle = styled.div`
  a {
    cursor: pointer;
  }
  .pagination {
    display: block;
  }
  .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }
  .pagination a.active {
    background-color: #4caf50;
    color: white;
  }
  .pagination a:hover:not(.active) {
    background-color: #ddd;
  }
`;
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.items !== this.props.items) {
      this.setPage(this.props.initialPage, nextProps.items);
    }
  };
  componentWillMount() {
    this.setPage(this.props.initialPage);
  }
  setPage(page, items) {
    // eslint-disable-next-line
    var items = items || this.props.items;
    var pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get new pager object for specified page
    pager = this.getPager(items.length, page);
    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    // update state
    this.setState({ pager: pager });
    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;
    // default page size is 10
    pageSize = pageSize || 4;
    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);
    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  render() {
    var pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }
    return (
      <PaginationStyle>
        <ul className="pagination">
          <li className={pager.currentPage === 1 ? "disabled" : ""}>
            <a href="# " onClick={() => this.setPage(1)}>
              <i className="fa fa-solid fa-angles-left" />
            </a>
          </li>
          <li className={pager.currentPage === 1 ? "disabled" : ""}>
            <a href="# " onClick={() => this.setPage(pager.currentPage - 1)}>
              <i className="fa fa-solid fa-angle-left" />
            </a>
          </li>
          {pager.pages.map((page, index) => (
            <a
              href="# "
              key={index}
              onClick={() => this.setPage(page)}
              className={pager.currentPage === page ? "active" : ""}
            >
              {page}
            </a>
          ))}
          <li
            className={pager.currentPage === pager.totalPages ? "disabled" : ""}
          >
            <a href="# " onClick={() => this.setPage(pager.currentPage + 1)}>
              <i className="fa fa-solid fa-angle-right" />
            </a>
          </li>
          <li
            className={pager.currentPage === pager.totalPages ? "disabled" : ""}
          >
            <a href="# " onClick={() => this.setPage(pager.totalPages)}>
              <i className="fa fa-solid fa-angles-right" />
            </a>
          </li>
        </ul>
      </PaginationStyle>
    );
  }
}
Pagination.defaultProps = defaultProps;
export default Pagination;
