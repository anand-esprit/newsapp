import React, { Component } from "react";
// import parse from "html-react-parser";

export class Pagination extends Component {
    render() {
        let { pagination, getNewsApiData } = this.props;
        let paginationArray = [];

        function paginationSubElements() {
            for (
                let index = pagination.minPage;
                index <= pagination.maxPage;
                index++
            ) {
                paginationArray.push(
                    <li
                        key={index}
                        className={
                            "page-item" +
                            (pagination.page === index ? " active" : "")
                        }
                    >
                        <button
                            className={
                                "page-link text-warning" +
                                (pagination.page === index
                                    ? " bg-dark border-warning"
                                    : "")
                            }
                            onClick={() => {
                                getNewsApiData(index);
                            }}
                        >
                            {index}
                        </button>
                    </li>
                );
            }
        }
        paginationSubElements();
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item">
                        <button
                            className="btn btn-dark text-warning"
                            onClick={() => {
                                let page = pagination.page - 1;
                                getNewsApiData(page);
                            }}
                            disabled={pagination.page <= pagination.minPage}
                            type="button"
                        >
                            Previous
                        </button>
                    </li>
                    {paginationArray.map((data) => {
                        return data;
                    })}
                    <li className="page-item">
                        <button
                            className="btn btn-dark text-warning"
                            onClick={() => {
                                let page = pagination.page + 1;
                                getNewsApiData(page);
                            }}
                            disabled={pagination.page >= pagination.maxPage}
                            type="button"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;
