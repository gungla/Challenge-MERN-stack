import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Loader from './Loader';

function Notfound() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);

    return (
        <>
        {loading && <Loader/>}
        {!loading && (   
        <div className='text-center mt-4 mb-4'>
            <img className="not" src="https://cdn3.iconfinder.com/data/icons/network-and-communications-10/32/network_Error_lost_no_page_not_found-1024.png" alt="Página no encontrada"/>
            <p>
                Los sentimos producto o página no encontrada!!!
            </p>
            <p>
                <Link className="btn btn-primary" to="/">
                    Volver el sitio
                </Link>
            </p>
        </div>
        )}
        </>
    )
}

export default Notfound
