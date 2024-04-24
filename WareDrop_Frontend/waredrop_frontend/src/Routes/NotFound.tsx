import ErrorPage from "../Components/ErrorPage";

function Notfound() {
    return (
        <div className="app">
            <ErrorPage errorCode={404}/>
        </div>
    )
}
export default Notfound;