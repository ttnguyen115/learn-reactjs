import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
};

function TodoList({ todoList, onTodoClick }) {
    const handleTodoClick = (todo, id) => {
        if (!onTodoClick) return;

        onTodoClick(todo, id);
    }

    return (
        <ul className='todo-list'>
            {todoList.map((todo, id) => (
                <li key={todo.id} className={classnames({
                    'todo-item': true,
                    completed: todo.status === 'completed'})}
                    onClick={() => handleTodoClick(todo, id)}
                >
                {todo.title}</li>
            ))}
        </ul>
    );
}

export default TodoList;