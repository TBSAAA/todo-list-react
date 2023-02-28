import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import './index.css'

export default class Item extends Component {

    state = {mouse: false}
    handleMouse = (flag) => {
        return () => {
            this.setState({mouse: flag})
        }
    }
    handleCheck = (id) => {
        return (event) => {
            PubSub.publish('update', {id: id, done: event.target.checked, flag:"update"})
        }
    }

    handleDelete = (id) => {
        if (window.confirm('Do you want delete it?')) {
            PubSub.publish('update', {id: id, flag:"delete"})
        }
    }

    render() {
        const {id, name, done,level} = this.props
        const {mouse} = this.state
        return (

            <li className={["list-group-item list-group-item-action ","list-group-item-",level].join('')}
                onMouseEnter={this.handleMouse(true)}
                onMouseLeave={this.handleMouse(false)} style={{cursor: "pointer", height:"47px"}} >
                <label>
                    <input className="form-check-input me-1" type="checkbox" checked={done}
                           onChange={this.handleCheck(id)}/>
                    <span style={{color:"black", marginLeft:"5px"}}>{name}</span>
                </label>
                <button onClick={() => this.handleDelete(id)} className="btn btn-danger btn-sm"
                        style={{display: mouse ? 'block' : 'none', float: "right"}}>Delete
                </button>
            </li>
        );
    }
}
