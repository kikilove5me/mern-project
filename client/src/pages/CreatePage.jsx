import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState('');
    const pressHandler = async event => {
        console.log(event.key);
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` });
                //console.log(data);
                navigate(`/detail/${data.link._id}`);
            } catch (e) { }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <input
                    placeholder="enter link"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyDown={pressHandler}
                />
                <label htmlFor="link">enter link</label>
            </div>
        </div>
    )
}
