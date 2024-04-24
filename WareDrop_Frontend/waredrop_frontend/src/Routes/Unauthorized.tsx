import ErrorPage from "../Components/ErrorPage";

function Unauthorized(){
    return (
        <div className="app">
            <ErrorPage errorCode={401}/>
        </div>
    )
}
export default Unauthorized;