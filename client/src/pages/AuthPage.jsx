import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message);
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
        } catch (e) {

        }
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Shorter your link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Log in</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                    value={form.email}
                                    className="yellow-input"
                                />
                                <label className="active" htmlFor="email">Email</label>
                            </div>


                            <div className="input-field">
                                <input
                                    placeholder="enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    value={form.password}
                                    className="yellow-input"
                                />
                                <label className="active" htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {/* login Button */}
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            log in
                        </button>

                        {/* register Button */}
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

