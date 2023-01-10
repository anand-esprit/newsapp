import React, { Component } from "react";
// This is a React Router v6 app
import { BrowserRouter } from "react-router-dom";
// import { Menu } from "./config/Constant";
// import NavBar from "./components/NavBar";
// import News from "./components/News";
import Router from "./config/RouterConfig";
import LoadingBar from "react-top-loading-bar";

import "./App.css";
// import RootState from "./Context/Root/RootState";
// import RootContext from "./Context/Root/RootContext";
// import Context from "./Context";
import { AppContext } from "./Context";

export default class App extends Component {
    static contextType = AppContext;

    render() {
        return (
            <>
                <BrowserRouter>
                    <LoadingBar
                        color="#f11946"
                        progress={this.context.state.progress}
                        height={4}
                        loaderSpeed={900}
                        // onLoaderFinished={() => setProgress(0)}
                    />
                    <Router />
                    {/* <NavBar />
                    <Routes>
                        {Menu.map((m, i) => {
                            return (
                                <Route
                                    key={i}
                                    path={m.path}
                                    element={<News category={m.category} />}
                                />
                            );
                        })}
                    </Routes> */}
                </BrowserRouter>
            </>
        );
    }
}

// const withContext = (Component) => {
//     return (props) => {
//         <Context.Consumer>
//             {(context) => {
//                 return <Component {...props} context={context} />;
//             }}
//         </Context.Consumer>;
//     };
// };

// export default withContext(App);
