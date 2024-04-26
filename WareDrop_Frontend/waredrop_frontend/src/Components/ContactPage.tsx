function ContactPage () {
    return (
        <div className="contact-container">
            <div style={{justifyContent: "center"}} className="align-horizontal align-vertical clickable">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div className="image-logo"/></a>
            </div>
            <div style={{height: "100px", justifyContent: "center"}} className="align-horizontal align-vertical">
                <div className="image-email"/>
                <h1 className="text-spaced">donko.hunor.attila@gmail.com</h1>
            </div>
            <div style={{height: "100px", justifyContent: "center"}} className="align-horizontal align-vertical">
                <div className="image-email"/>
                <h1 className="text-spaced">attilapataki13@gmail.com</h1>
            </div>
            <div style={{height: "100px", justifyContent: "center"}} className="align-horizontal align-vertical">
                <div className="image-email"/>
                <h1 className="text-spaced">peetya.77@gmail.com</h1>
            </div>
            <div style={{height: "100px"}}/>
        </div>
    )
}

export default ContactPage;