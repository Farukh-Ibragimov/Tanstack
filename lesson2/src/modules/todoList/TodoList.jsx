import React, {useCallback, useRef, useState} from 'react';
import {useInfiniteQuery, useMutation} from "@tanstack/react-query";
import {todoListApi} from "../api/api.jsx";
import {useTodoList} from "../useTodoList/UseTodoList.jsx";
import {nanoid} from "nanoid";

const TodoList = () => {
    const {cursor,error,todoItem,isLoading}= useTodoList()
    const createTodoMutation = useMutation({
        mutationFn: todoListApi.createTodo
    })
    const handleCreate = (e)=>{

        const formData = new FormData(e.currentTarget)
        const text = String(formData.get('text') ?? '')
        createTodoMutation.mutate({
            text: text,
            userId: "1",
            done: false,
            id: nanoid(),
        })

    }
    if(isLoading){
        return <div>Loading..</div>
    }
    if(error){
        console.log(JSON.stringify(error))
    }

    return (
        <div>
           <h1>TodoList</h1>
            <form onSubmit={handleCreate}>
                <input type="text" name="text"/>
                <button>create</button>
            </form>
            <div>
                {todoItem?.map(todo=>(
                    <div key={todo.id}>{todo.text}</div>
                ))}
            </div>
            {cursor}
        </div>
    );
};

export default TodoList;


