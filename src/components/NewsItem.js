import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsRouteID, item } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <span
                        className="position-absolute top-0 badge rounded-pill bg-dark text-warning"
                        style={{
                            right: "0%",
                            transform: "translate(10%,-50%)",
                        }}
                    >
                        {item.source.name}
                    </span>
                    <img src={imgUrl} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                By{" "}
                                <span className="text-danger">
                                    `{item.author}`
                                </span>{" "}
                                on {new Date(item.date).toDateString()}
                            </small>
                        </p>
                        <a
                            href={newsRouteID}
                            rel="_blank"
                            className="btn btn-sm btn-dark text-warning"
                        >
                            Read More...
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
