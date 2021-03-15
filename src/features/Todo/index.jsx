import React, { useState } from 'react';
import TodoList from './components/TodoList';

TodoFeature.propTypes = {};

function TodoFeature(props) {
    // Declaration
    const initTodoList = [
        {
            id: 1,
            title: 'Sleep',
            status: 'new',
        },
        {
            id: 2,
            title: 'Code',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Eat',
            status: 'new',
        },
    ]

    // set State
    const [todoList, setTotoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState('all');

    // handle functions
    const handleTodoClick = (todo, id) => {
        const newTodoList = [...todoList];

        console.log(todo, id);

        newTodoList[id] = {
            ...newTodoList[id],
            status: newTodoList[id].status === 'new' ? 'completed' : 'new', 
        };

        setTotoList(newTodoList);
    }

    const handleShowAllClick = () => {
        setFilteredStatus('all');
    }

    const handleShowCompletedClick = () => {
        setFilteredStatus('completed');
    }

    const handleShowNewClick = () => {
        setFilteredStatus('new');
    }

    const renderedTodoList = todoList.filter(todo => 
        filteredStatus === 'all' || filteredStatus === todo.status
    );


    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={ renderedTodoList } onTodoClick={ handleTodoClick } />

            <div>
                <button onClick={ handleShowAllClick }>Show All</button>
                <button onClick={ handleShowCompletedClick }>Show Completed</button>
                <button onClick={ handleShowNewClick }>Show New</button>
            </div>
        </div>
    );
}

export default TodoFeature;