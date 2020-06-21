import React from 'react';
import TodoListItem from './TodoListltem'
import './TodoList.scss'
const TodoList = () => {
    return (
        <div className="TodoList">
            <TodoListItem/>
            <TodoListItem/>
            <TodoListItem/>
        </div>
    );
};

export default TodoList;