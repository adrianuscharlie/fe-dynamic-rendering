import { createBrowserRouter } from "react-router-dom";
import SubmissionPage from "./pages/Submission";
import App from "./App";


export const router = createBrowserRouter([
    {
        path: 'submission/:appId',
        element: <SubmissionPage />
    },
    {
        path: "/",
        element: <App />
    }
])