import React, {Component} from 'react';
import Header from "./component/Header";
import List from "./component/List";
import Footer from "./component/Footer";
import './App.css'

export default class App extends Component {
    render() {
        return (
            <div className={"container box"}>
                <Header/>
                <List/>
                <Footer/>
            </div>
        );
    }
}
