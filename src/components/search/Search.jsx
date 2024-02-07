import React, { useState, useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { debounce } from 'lodash';
import axios from 'axios'
import styled from 'styled-components'
import HomeHeader from '../header/HomeHeader';
import { URL } from '../../lib/apis/constant/path'
import UserList from './UserList';
import searchImage from '../../assets/icons/illustration/Search.webp'

export default function Search() {
    const [ref, inView]= useInView();
    const [search, setSearch]= useState('');
    const [searchData, setSearchData]= useState([]);
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
            <SearchDiv>
                <SearchSection>
                    <List>
                        <Input 
                            type="text" 
                            placeholder='이름, 아이디 검색'
                            value={search}
                            onChange={handle}
                        />
                    
                        {search && userList && (
                            <UserList
                                search= {search}
                                userList= {userList}
                                searchQuery={search}
                            /> 
                        )}
                        <div ref={ref} />
                        <Div></Div>
                    </List>
                </SearchSection>
            </SearchDiv>
        </>
    )
}
const SearchDiv= styled.div`
    width: 100%;
    margin: 100px auto 0;
    background: #f1f2f3;
    box-sizing: border-box;
`
const SearchSection= styled.section`
    position: relative;
    width: 900px;
    margin: 0 auto;
    padding: 190px 0 20px;
`
const Div= styled.div`
    width: 900px;
    height: calc(100vh - 100px);
    background: url(${searchImage}) 50% 100% no-repeat ;
`
const Input= styled.input`
    position: absolute;
    top: 0;
    left: 50%;
    width: calc(100% - 60px);
    height: 60px;
    margin: 130px auto;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #A73121;
    background-color: #f1f2f3;
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    transform: translateX(-50%);
`
const List = styled.div`
    padding: 50px 0 20px;
    overflow-y: visible;
`