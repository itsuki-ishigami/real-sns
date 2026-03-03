import React, { useRef, useState, useContext } from 'react';
import "./Register.css";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        //パスワードと確認用のパスワードがあっているかどうかを確認
        if(password.current.value !== passwordConfirmation.current.value) {
            setError("パスワードが一致しません");
            return;
        }
        
        setIsLoading(true);
        try{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            //registerAPIを叩く
            await axios.post("/auth/register", user);
            
            // 登録成功後、自動的にログイン
            const loginResponse = await axios.post("/auth/login", {
                email: email.current.value,
                password: password.current.value,
            });
            
            // ログイン成功したらContextに保存（自動的にlocalStorageにも保存される）
            dispatch({ type: "LOGIN_SUCCESS", payload: loginResponse.data });
            navigate("/");  // ホームに遷移
        }catch(err){
            console.log(err);
            setError("登録に失敗しました。既に登録されているメールアドレスの可能性があります。");
        }finally{
            setIsLoading(false);
        }
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Real SNS</h3>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMsg">新規登録はこちら</p>
                    <input type="text" className="loginInput" placeholder="ユーザー名" required ref={username}/>
                    <input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInput" placeholder="パスワード" required minLength="6" ref={password}/>
                    <input type="password" className="loginInput" placeholder="確認用パスワード" required minLength="6" ref={passwordConfirmation}/>
                    <button className="loginButton" type="submit" disabled={isLoading}>
                        {isLoading ? "登録中..." : "サインアップ"}
                    </button>
                    {error && <span className="errorMsg">{error}</span>}
                    <span className="loginLinkText">
                        既にアカウントをお持ちですか？ <Link to="/login" className="loginLink">ログイン</Link>
                    </span>
                </form>
            </div>
        </div>
    </div>
  )
}
