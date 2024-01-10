import React, { useState, useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { debounce } from 'lodash';
import axios from 'axios'
import styled from 'styled-components'

import HomeHeader from '../header/HomeHeader';
import { URL } from '../../lib/apis/constant/path'
import UserList from './UserList';

export default function Search() {
    const [ref, inView]= useInView();

    // 내가 검색한 키워드
    const [search, setSearch]= useState('');
    // 모든 유저목록
    const [searchData, setSearchData]= useState([]);
    // 사용자에게 보여지는 유저목록
    const [userList, setUserList]= useState([]);

    const [pages, setPages]= useState(0);
    const [isLoading, setIsLoading]= useState(false);
    const token= localStorage.getItem('Access Token');

    const sendQuery= async(q)=>{
        if(!isLoading){
            setIsLoading(true);
        }
        delayLoading();

        if(q.length === 0) return;

        const res= await axios.get(`${URL}/user/searchuser/?keyword=${q}`,{
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json"
            }
        })
        const data= res?.data;
        setSearchData(data);
        setUserList(data.slice(pages * 20, pages * 20 + 20));
        setPages(pages + 1)
    };

    const delayedSearch = useCallback(
        debounce((q) => sendQuery(q), 400),
        []
    );
    
    const delayLoading = useCallback(debounce((q) => setIsLoading(false), 500));

    const handle= (e)=> {
        setSearch(e.target.value);
        if(e.target.value === ''){
            setSearchData('');
            setUserList('');
            return;
        }
        delayedSearch(e.target.value);
    }

    const addShowUser= ()=> {
        const addUserList= searchData.slice(pages * 20, pages * 20 + 20);
        setUserList([...userList, ...addUserList]);
        setPages(pages + 1);
    };

    useEffect(()=>{
        if(inView){
            addShowUser();
        }
    },[inView])

    return (
        <>
            <HomeHeader/>
            <SearchWrap>
                <SearchDiv>
                    {isLoading && (
                            <Loading>
                            </Loading>
                        )}
                    <Div>
                        <Input 
                            type="text" 
                            placeholder='이름, 아이디 검색'
                            value={search}
                            onChange={handle}
                        />
                    </Div>

                    <List>
                        {search && userList && (
                            <UserList
                                search= {search}
                                userList= {userList}
                                searchQuery={search}
                            />
                        )}
                        <div ref={ref}></div>

                        <SearchIcon>
                            <img src=""/>
                        </SearchIcon>
                    </List>
                </SearchDiv>
            </SearchWrap>
        </>
    )
}
const SearchWrap= styled.div`
    background-color: #f1f2f3;
`
const SearchDiv= styled.div`
    position: relative;
    width: 820px;
    height: calc(100vh - 350px);
    margin: 0 auto;
    padding: 190px 0 20px;
`
const Div= styled.div`
    border-bottom: 2px solid #A73121;
`
const Input= styled.input`
    position: absolute;
    font-family: "Noto_Sans_KR-400";
    top: 0;
    left: 50%;
    width: calc(100% - 60px);
    height: 60px;
    margin: 130px auto;
    font-size: 20px;
    border: none;
    transform: translateX(-50%);
    background-color: #f1f2f3;
`

const Loading = styled.div``
const List = styled.div`
    margin-top: 10px;
    overflow-y: visible;
`
const Button = styled.button``
const SearchIcon= styled.label``