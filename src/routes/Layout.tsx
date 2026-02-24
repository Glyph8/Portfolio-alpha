import { Outlet } from "react-router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { setUser } from "../store/authSlice";

export default function Layout() {
    const dispatch = useDispatch();
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            dispatch(setUser(session?.user ?? null));
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                dispatch(setUser(session?.user ?? null));
            }
        );

        return () => subscription.unsubscribe();
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}