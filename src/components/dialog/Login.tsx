import { useState } from "react";
import CustomDialog from "./CustomDialog";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { supabase } from "../../libs/supabaseClient";

interface LoginProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ isOpen, setIsOpen }: LoginProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            return;
        }

        navigate('/projects/new');
    };

    return (
        <div>
            <CustomDialog
                open={isOpen}
                setOpen={setIsOpen}
                title="로그인"
                description="프로젝트 추가 수정 삭제를 위해 로그인이 필요합니다.">

                <form className={styles.loginBody} onSubmit={handleSubmit}>
                    <div className={styles.loginInput}>
                        <label htmlFor="idInput">
                            아이디
                        </label>
                        <input id="idInput" type="text" placeholder="아이디" className={styles.idInput} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="passwordInput">
                            비밀번호
                        </label>
                        <input id="passwordInput" type="password" placeholder="비밀번호" className={styles.passwordInput} 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button className={styles.loginButton}>로그인</button>
                </form>


            </CustomDialog>
        </div>
    )
}
