import React, { useState, useEffect, useMemo } from 'react';
import TodoList from '../../components/TodoList';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {};

function ListPage(props) {
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
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTotoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all';
    });

    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status || 'all');
    }, [location.search]);

    // handle functions
    const handleTodoClick = (todo, id) => {
        const newTodoList = [...todoList]; 

        newTodoList[id] = {
            ...newTodoList[id],
            status: newTodoList[id].status === 'new' ? 'completed' : 'new', 
        };

        setTotoList(newTodoList);
    }

    const handleShowAllClick = () => {
        setFilteredStatus('all');

        const queryParams = { status: 'all' };
        history.push({
           pathname: match.path,
           search: queryString.stringify(queryParams),
        });
    }

    const handleShowCompletedClick = () => {
        setFilteredStatus('completed');

        const queryParams = { status: 'completed' };
        history.push({
           pathname: match.path,
           search: queryString.stringify(queryParams),
        });
    }

    const handleShowNewClick = () => {
        setFilteredStatus('new');

        const queryParams = { status: 'new' };
        history.push({
           pathname: match.path,
           search: queryString.stringify(queryParams),
        });
    }

    const renderedTodoList = useMemo(() => {
        return todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);
    }, [todoList, filteredStatus]);

    const handleTodoFormSubmit = (values) => {
        console.log('Form submit: ', values);

        const newTodo = {
            id: todoList.length + 1,
            title: values.title,
            status: 'new'
        }

        const newTodoList = [...todoList, newTodo];

        setTotoList(newTodoList);
    };

    return (
        <div>
            <h3>Todo Form</h3>
            <TodoForm onSubmit={ handleTodoFormSubmit } />

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

export default ListPage;