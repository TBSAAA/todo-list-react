import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import {nanoid} from 'nanoid'
import './index.css'

export default class Header extends Component {
    addTodo = () => {
        const {choice: {value: choice}} = this
        const {todo: {value: todo}} = this
        const todoObj = {id: nanoid(), name: todo, done: false, level: choice}
        PubSub.publish('update', {todo: todoObj, flag:"add"})
        this.todo.value = ''
    }

    render() {
        return (
            <div className={"mt-3"}>
                <div className={"flag"}>
                    <span className="badge rounded-pill bg-primary mx-1">Normal</span>
                    <span className="badge rounded-pill bg-danger mx-1">Urgent</span>
                    <span className="badge rounded-pill text-bg-warning mx-1">Non urgent</span>
                </div>
                <input type="text" ref={(todo) => {
                    this.todo = todo
                }} className="form-control mt-3" placeholder="Please enter to do things!"/>

                <div className="row mt-3 justify-content-between">
                    <div className={"col-5"}>
                        <select className="form-select" ref={(choice) => {
                            this.choice = choice
                        }}>
                            <option value="primary">Normal</option>
                            <option value="danger">Urgent</option>
                            <option value="warning">Non urgent</option>
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary col-2 mx-3" onClick={this.addTodo}>Add to-do
                    </button>
                </div>
            </div>
        );
    }
}
