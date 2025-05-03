import {useInfiniteQuery} from "@tanstack/react-query";
import {todoListApi} from "../api/api.jsx";
import React, {useCallback, useRef} from "react";

export function useTodoList() {

    const {data:todoItem,error,isPlaceholderData,isPending,isLoading,fetchNextPage,hasNextPage,isFetchingNextPage} = useInfiniteQuery({
        ...todoListApi.getTodoListInfiniteQueryOptions(),
    })
    const cursorRef = useIntersection(()=> {
            fetchNextPage()
        }
    )
    const cursor = (
    <div ref={cursorRef}>
        {!hasNextPage && <div>Нет данных для загрузки !</div>}
        {isFetchingNextPage && <div>...loading</div>}
    </div>
    )
    return {error, todoItem, cursor,isLoading}
}

export function useIntersection(onIntersect ){
    const unsubscribe = useRef(()=>{})
    return useCallback((el)=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(intersection =>{
                if(intersection.isIntersecting){
                    onIntersect()
                }
            })
        })
        if(el){
            observer.observe(el)
            unsubscribe.current = ()=> observer.disconnect()
        }else{
            unsubscribe.current()
        }
    },[])
}