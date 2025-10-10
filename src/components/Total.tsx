'use client';

import { useState, useEffect } from 'react';

function Total() {
    const [total, setTotal] = useState([]);

    useEffect(() => {
        async function getTotal() {
            try {
                const res = await fetch('https://api.sheetbest.com/sheets/d9af5cd8-e4ed-40c1-98aa-2d97bebd15ef');
                const data = await res.json();
                const biggie = data.length;
                setTotal(biggie);
            } catch(err) {
                console.error(err);
            }
        }

        getTotal();
    }, [])
    return (
        <div className="fixed bottom-10 right-10 border rounded-2xl py-2 px-3 cursor-pointer hover:bg-zinc-900 opacity-75">
            <p className="text-sm">{total} visitors</p>
        </div>
    )
}

export default Total;