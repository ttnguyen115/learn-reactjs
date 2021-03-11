import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';

TodoFeature.propTypes = {
    
};

function TodoFeature(props) {
    const todoList = [
        {
            id: 1,
            title: 'Sleep'
        },
        {
            id: 2,
            title: 'Code'
        },
        {
            id: 3,
            title: 'Eat'
        },
    ]

    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={ todoList } />
        </div>
    );
}

export default TodoFeature;