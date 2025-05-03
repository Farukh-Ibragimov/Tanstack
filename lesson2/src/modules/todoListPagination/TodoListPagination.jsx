import React, {useState} from 'react';
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {todoListApi} from "../api/api.jsx";

const TodoListPagination = () => {
    const [enabled,setEnabled]= useState(false)
    const [page,setPage]= useState(1)


    const {data: todoItems, error, isFetching, isPending,isPlaceholderData,isLoading} = useQuery({
        ...todoListApi.getTodoListQueryOptions({page}),
        placeholderData:keepPreviousData,
        enabled: enabled
    })

    if(isLoading){
        return <div>..loading</div>
    }

    if(error){
        console.log(JSON.stringify(error))
    }
    return (
        <div>
            <button onClick={()=>setEnabled(e=> !e)}>Toggle enabled</button>
            <div style={{opacity : isPlaceholderData ? 0.5 : 1}}>
                {todoItems?.data.map(todo => (
                    <div>{todo.name}</div>
                ))}
            </div>
            <div>
                <button onClick={()=>setPage(p=> Math.max(p-1,1))}>prev</button>
                <button onClick={()=>setPage(p=>Math.min(p+1,todoItems?.pages ?? 1))}>next</button>
            </div>
        </div>
    );
};

export default TodoListPagination;