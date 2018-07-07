import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

// var promise = new Promise(function(resolve, reject) {
//     resolve(true);
//   })
//   promise.then(bool => console.log('Bool is true'))

// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//   console.log(values);
// });
// // expected output: Array [3, 42, "foo"]

// const promises = [
//     new Promise(resolve => setTimeout(resolve, 0, 1)),
//     new Promise(resolve => setTimeout(resolve, 0, 2))
//   ];
//   Promise.all(promises)
//     .then(data => {
//       console.log("First handler", data);
//       return data.map(entry => entry * 10);
//     })
//     .then(data => {
//       console.log("Second handler", data);
//     });


// Promise.all([
//     fetch("https://jsonplaceholder.typicode.com/posts/1").then(response=>response.json()),
//     fetch("https://jsonplaceholder.typicode.com/posts/2"),
//     fetch("https://jsonplaceholder.typicode.com/posts/3")
//   ]).then((allResponses) => {
//     const response1 = allResponses[0].body;
//     const response2 = allResponses[1]
//     const response3 = allResponses[2]
//     console.log()
//   }).catch((err) => {
//       console.log(err);
//   });


// var apiRequest1 = fetch('https://jsonplaceholder.typicode.com/posts/1').then(function(response){
//     return response.json()
// });
// var apiRequest2 = fetch('https://jsonplaceholder.typicode.com/posts/2').then(function(response){
//     return response.json()
// });
// var combinedData = {"apiRequest1":{},"apiRequest2":{}};
// Promise.all([apiRequest1,apiRequest2]).then(function(values){
// combinedData["apiRequest1"] = values[0];
// combinedData["apiRequest2"] = values[1];
// return combinedData;
// });

// fetch('https://jsonplaceholder.typicode.com/posts/2').then(
//   function(response){
//      var val = response.json()
//      return val;
//     }
// ).then(function(jsonData){
//     jsonData;
//     //handle json data processing here
// });


//STEP 1 - Create REDUCER and returns the new state object
const userReducer = (state, action) => {
    state === undefined ? (state = { count: 0 }) : null; //Definition for beginning state value and its structure
    switch (action.type) {
        case "INCREMENT":
            return Object.assign({}, state, { count: state.count + 1 }); //Using non-mutating method
        case "DECREMENT":
            return Object.assign({}, state, { count: state.count - 1 });
        default:
            return state;
    }
};

//STEP 2 - Create STORE
const store = createStore(
    userReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //Redux method
//STEP 3 - Create MAIN CLASS and its methods with using dispatch(action)
class Counter extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.props.actionDecrease}>-</button>
                    <span>{this.props.count}</span>
                    <button onClick={this.props.actionIncrease}>+</button>
                </div>
            </div>
        );
    }
}

//STEP 3a - Create ACTIONS
const actionIncrease = () => ({ type: "INCREMENT" }); //returns an action object for dispatch()
const actionDecrease = () => ({ type: "DECREMENT" });

//STEP 3b - Using for mapping
const mapStateToProps = state => {
    return {
        count: state.count
    };
};
//Using actions here
const mapDispatchToProps = {
    actionIncrease,
    actionDecrease
};

/*
STEP 3c
Create mapping from Redux state to React component
- Redux sate: const state = {count: 0};
- React component: this.props.count
*/
const CounterX = connect(mapStateToProps, mapDispatchToProps)(Counter);

//STEP 4 - Create main React component with Redux store
const App = () => (
    <Provider store={store}>
        <CounterX />
    </Provider>
);

//RENDER your app
render(<App />, document.getElementById("app"));