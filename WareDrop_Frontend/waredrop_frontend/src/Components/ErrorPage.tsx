interface ErrorPageProps{
    errorCode: number;
}
function ErrorPage({errorCode}: ErrorPageProps){

    return (
        <>
            <div className="error-page-top"></div>
            <div className={errorCode === 404? "error-notfound" : "error-unauthorized"}/>
            <div className="error-page-bottom"></div>
        </>
    )
}

export default ErrorPage;