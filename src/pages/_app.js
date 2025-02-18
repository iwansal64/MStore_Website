import "../styles/globals.css";
import "./App.css";
import dynamic from "next/dynamic";

const ClientSideRender = dynamic(() => import("./clientRouter"), {
    ssr: false,
});

function App() {
    return <ClientSideRender />;
}

export default App;
