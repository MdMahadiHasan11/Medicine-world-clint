import React from 'react';

const PaymentCard = ({ cardItem, index }) => {
//    const  date =new Date(cardItem.date).toLocaleDateString
    return (
        <tbody>
            {/* row */}

            <tr className="hover">
                <td>{index + 1}</td>
                <td>{new Date(cardItem.date).toLocaleDateString()}</td>
                <td>{new Date(cardItem.date).toLocaleTimeString()}</td>
                <td>{cardItem.transactionId}</td>
                <td >-{cardItem.discountPrice}</td>
                <td >{cardItem.grandTotal}</td>
                <td>{cardItem.status}</td>
            </tr>
            {/* row 3 */}

        </tbody>
    );
};

export default PaymentCard;