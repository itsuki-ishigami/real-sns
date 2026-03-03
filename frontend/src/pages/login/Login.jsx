import React, { useContext, useEffect, useRef } from 'react';
import "./Login.css";
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email.current.value);
        // console.log(password.current.value);
        loginCall(
            {
                email: email.current.value,
                password: password.current.value
            },
            dispatch
        );
    };

    useEffect(() => {
//   console.log("userが更新された:", user);
}, [user]);

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Real SNS</h3>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMsg">ログインはこちら</p>
                    <input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInput" placeholder="パスワード" required minLength="6" ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        {isFetching ? "ログイン中..." : "ログイン"}
                    </button>
                    {error && <span className="errorMsg">ログインに失敗しました。メールアドレスまたはパスワードが間違っています。</span>}
                    <span className="loginForgot">パスワードを忘れた方へ</span>
                    <span className="loginLinkText">
                        アカウントをお持ちでない方は <Link to="/register" className="loginLink">こちら</Link>
                    </span>
                </form>
            </div>
        </div>
    </div>
  )
}
