import RootContext from "./RootContext";

const RootState = (props) => {
    const state = {
        progress: 0,
    };

    return (
        <RootContext.Provider value={state}>
            {props.children}
        </RootContext.Provider>
    );
};

export default RootState;
