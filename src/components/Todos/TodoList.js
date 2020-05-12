import React from 'react';
import { CardColumns, Button } from 'reactstrap';

import { connect } from 'react-redux';

import { getList, deleteTodo } from '../../actions';

import CardItem from './CardItem';
import SearchBar from '../SearchBar';
import TodoForm from './TodoForm';

const todoList = props => {

    const getTodos = e => {
        e.preventDefault();
        props.getList();
    }

    return (
        <div className='todo-app'>
            <div className='action-bar'>
                <Button onClick={getTodos}>Fetch my todos</Button>
            </div>

            <CardColumns>
                <TodoForm />
                {props.list.map(todo => (
                    <CardItem key={todo.title} props={todo} />
                ))}
            </CardColumns>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        list: state.task,
        error: state.error
    }
}

export default connect(
    mapStateToProps,
    { getList, deleteTodo }
)(todoList);