import React, { useState, useEffect, createContext } from 'react';

export const DataContext = createContext();

export function DataProvider(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {

            await fetch("https://run.mocky.io/v3/f992ae5c-0d86-4d37-a641-3e5dd2d3c892").then(response => response.json()).then(data => setData(data.members))
        }
        getData();
    }, [])
    return (
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    )
}

