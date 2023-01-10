import React, { Component } from "react";

export class Spinner extends Component {
    render() {
        return (
            <div
                className="spinner-border text-dark"
                role="status"
                style={{ marginLeft: "50%" }}
            >
                <span className="sr-only"></span>
            </div>
        );
    }
}

export default Spinner;
