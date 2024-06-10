import React from 'react';

const PaymentHistoryCard = ({cardItem,index}) => {
    return (
        <tbody>
            {/* row */}

            <tr className="hover">
                <td>{cardItem.medicinesName}</td>
                <td>{cardItem.quantity}</td>
                <td>{cardItem.totalPrice}</td>
                <td >
                    {(cardItem.totalPrice-cardItem.revenue)?.toFixed(2)}
                </td>
                <th>{cardItem.revenue}</th>
                <th>{cardItem.status}</th>
            </tr>
            {/* row 3 */}

        </tbody>
    );
};

export default PaymentHistoryCard;