import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customer, setCustomer] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff!=true`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomer(customerArray)
                })
        },
        []
    )

    return <article className="customer">
        {
            customer.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id}
                fullName={customer.fullName}
                address={customer.address}
                phoneNumber={customer.phoneNumber}
            />)
        }
    </article>
}