interface TransactionDisplayProps{
    transId: number;
    transOrigin: string;
    transDestination: string;
    transPost: string;
    transArrived: string;
    handleClick: (id: number) => void;
}

function TransactionDisplay({transId, transOrigin, transDestination, transPost, transArrived, handleClick}: TransactionDisplayProps){
    return (
        <div className="item-container transaction-line align-horizontal" onClick={() => handleClick(transId)}>
            <p className="transaction-location" title={transOrigin}>{transOrigin}</p>
            <p className="transaction-location" title={transDestination}>{transDestination}</p>
            <p className="transaction-date" title={transPost.substring(11,19)}>{transPost.substring(0,10)}</p>
            <p className="transaction-date" title={transArrived.substring(11,19)}>{transArrived.substring(0,10)}</p>
        </div>
    )
}
export default TransactionDisplay;