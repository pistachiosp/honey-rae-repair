import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=serviceTickets&userId=${customerId}`)
                .then(res => res.json())
                .then(() => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return <section className="customer" >
        <header>{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Specialty: {customer.specialty}</div>
        <div>Rate: {customer.rate}</div>
        <footer>Currently working on {customer?.customerTickets?.length} tickets</footer>
    </section>
}