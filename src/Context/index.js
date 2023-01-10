import React from "react";

export const AppContext = React.createContext();

class Context extends React.Component {
    state = {
        progress: 10,
    };

    setProgress = (progress) => {
        this.setState({
            progress: progress,
        });
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    setProgress: (p) => {
                        this.setProgress(p);
                    },
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default Context;
