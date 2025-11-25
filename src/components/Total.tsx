'use client';
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from 'react';

function Total() {
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        async function fetchTotal() {
            const { data, error } = await supabase
                .from("timestamp")
                .select("*");
            if(error) {
                console.error("Error fetching timestamps:", error);
                return;
            }
            setTotal(data.length)
        }
        fetchTotal();
    }, [])
    return (
        <div className="fixed bottom-10 right-10 border rounded-2xl py-2 px-3 cursor-pointer hover:bg-zinc-900 opacity-75">
            <p className="text-sm">{total} visitors</p>
        </div>
    )
}

export default Total;