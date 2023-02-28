import React, {Component} from 'react';
import './index.css'
import PubSub from "pubsub-js";

export default class Footer extends Component {
    state = {complete: 0,total:0}
    componentDidMount(){
        this.token = PubSub.subscribe('toFooter',(_,stateObj)=>{
            this.setState({complete: stateObj.complete,total:stateObj.total})
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
    }
    handleCheckAll = () => {
        return (event)=>{
            PubSub.publish('update', {done:event.target.checked,flag:"checkAll"})
        }
    }
    clearCompletedTasks = () => {
        PubSub.publish('update', {flag:"cleanAllDone"})
    }

    render() {
        const {complete,total} = this.state
        return (
            <div className={"row mt-4 mb-4 justify-content-between"}>
                <div className={"col-3"}>
                    <input type="checkbox" onChange={this.handleCheckAll()}
                           checked={complete === total && total !== 0} style={{marginLeft:"5px"}}/>
                    <span style={{marginLeft:"15px"}}><span>{complete}</span> / {total}</span>
                </div>
                <button style={{marginRight:"15px"}} onClick={() => this.clearCompletedTasks()} className="btn btn-danger col-4">Clear completed tasks</button>
            </div>
        );
    }
}
