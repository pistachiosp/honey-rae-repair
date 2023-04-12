import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("hpassfield7@netvibes.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
//when the button is clicked
//makes a fetch call to json server looks at user collection and finds the matching email in state
        return fetch(`http://localhost:8088/users?email=${email}`)
        //get response parse json and convert back to js array
            .then(res => res.json())
            .then(foundUsers => {
                //if the length of the foundUsers js array has one item
                if (foundUsers.length === 1) {
                    //the store the user found at index 0 in a variable
                    const user = foundUsers[0]
                    //set user object in local storage
                    localStorage.setItem("honey_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))
                    //then navigate back to the root of the application
                    navigate("/")
                }
                else {
                    //if not valid, then throw error alert
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Honey Rae Repairs</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

