import React, {Component} from 'react';
import Item from "../Item";
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {

    state = {
        todos: [
            {id: '001', name: 'eat', done: true, level:'primary'},
            {id: '002', name: 'sleep', done: true,level:'warning'},
            {id: '003', name: 'write code', done: false,level:'danger'},
            {id: '004', name: 'find job', done: false,level:'primary'}
        ]
    }

    componentDidMount(){
        this.token = PubSub.subscribe('update',(_,stateObj)=>{
            //Get original todos
            const {todos} = this.state
            let newTodos=[]

            // Add to-do list
            if(stateObj.flag==="add"){
                //Append a to-do
                newTodos = [stateObj.todo, ...todos]
            }

            // Update to-do list
            if(stateObj.flag==="update"){
                newTodos = todos.map((todoObj) => {
                    if (todoObj.id === stateObj.id) return {...todoObj, done: stateObj.done}
                    return todoObj
                })
            }

            // Delete to-do list
            if(stateObj.flag==="delete"){
                newTodos=todos.filter((todoObj)=>{
                    return todoObj.id !== stateObj.id
                })
            }

            // check all
            if(stateObj.flag==="checkAll"){
                newTodos=todos.map((todoObj) => {
                    return {...todoObj, done: stateObj.done}
                })
            }

            // clean all done
            if(stateObj.flag==="cleanAllDone"){
                newTodos=todos.filter((todoObj)=>{
                    return todoObj.done === false
                })
            }

            //update status
            this.setState({todos: newTodos})

            // Calculate the number of current to-do list
            const completed = newTodos.reduce((pre, current) => {
                return pre + (current.done ? 1 : 0)
            }, 0)
            const total = newTodos.length
            PubSub.publish('toFooter', {complete: completed, total:total})
        })


    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
    }

    handleMouse = (flag) => {
        return () => {
            this.setState({mouse: flag})
        }
    }
    handleCheck = (id) => {
        return (event) => {
            this.props.updateTodo(id, event.target.checked);
        }
    }

    handleDelete = (id) => {
        if (window.confirm('Do you want delete it?')) {
            this.props.deleteTodo(id)
        }
    }

    render() {
        const {todos} = this.state
        return (
            <div className={"mt-4"}>
                <ul className="list-group">
                {
                    todos.map((todo) => {
                        return <Item key={todo.id} {...todo}/>
                    })
                }
            </ul>
            </div>
        );
    }
}
