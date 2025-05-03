import {infiniteQueryOptions, queryOptions} from "@tanstack/react-query";
import {jsonApiInstance} from "../../shared/api/apiInstance.js";


export const todoListApi = {

    getTodoListQueryOptions: ({page})=>{
        return queryOptions({
            queryKey:['tasks','list',{page}],
            queryFn:meta => jsonApiInstance(`/tasks?_page=${page}&_per_page=10`,{signal:meta.signal}),
        })
    },


    getTodoListInfiniteQueryOptions: ()=>{
        return infiniteQueryOptions({
            queryKey:['tasks','list'],
            queryFn:meta => jsonApiInstance(`/tasks?_page=${meta.pageParam}&_per_page=25`,{signal:meta.signal}),
            initialPageParam:1,
            getNextPageParam: (result)=> result.next,
            select:result => result.pages.flatMap(page => page.data),
        })
    },
    createTodo : (data)=>{
       return  jsonApiInstance('/tasks',{
            method: "POST",
            json: data
        })
    },
    updateTodo : (data,id)=>{
        return  jsonApiInstance(`/tasks/${id}`,{
            method: "PATCH",
            json: data
        })
    },
    deleteTodo : (id)=>{
        return  jsonApiInstance(`/tasks/${id}`,{
            method: "DELETE",
        })
    }
}


