import Portfolio from "../pages/portfolio/Portfolio";
import PortfolioDetail from "../pages/portfolio-detail/PortfolioDetail";
import { createBrowserRouter } from "react-router";
import PortfolioPost from "../pages/portfolio-post/PortfolioPost";
import Layout from "./Layout";
import NotFound from "../components/error/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            { index: true, element: <Portfolio /> },
            { path: "portfolio", element: <Portfolio /> },
            { path: "projects/:id", element: <PortfolioDetail /> },
            { path: "projects/new", element: <PortfolioPost /> },
            { path: "*", element: <NotFound/> }
        ]
    }
])