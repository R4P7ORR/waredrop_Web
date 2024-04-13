import TransactionDisplay from "../../Displays/TransactionDisplay";
import axios from "axios";

interface TransactionProps{
    loginToken: string;
}

function Transaction({loginToken}: TransactionProps){
    axios.get('http://localhost:3001/transactions', {
        headers: {authorization: "Bearer " + loginToken},
    }).then(res => {
        console.log(res)
    })

    return (
        <></>
    )
}
export default Transaction;