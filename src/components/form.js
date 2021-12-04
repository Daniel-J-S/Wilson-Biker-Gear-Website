import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { useEffect } from 'react';

function Form(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        message: "",
        formSubmitted: false
    });

    const encode = (data) => {
        const {name, email, message} = data
        return `form-name=Wilson+Biker+Gear+Website+Contact+Form&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
    }

    function handleChange(e) {
        setState({...state, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch('/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: encode(state)
        })
        setState({...state, formSubmitted: true});

        setTimeout(() => {
            setState({
                name: "",
                email: "",
                message: "",
                formSubmitted: false
            });
            navigate('/');
            }, 3000)
    }

    useEffect(() => {
        if(props.message) {
            setState(prevState => ({
                ...prevState,
                message: props.message
            }))
        }
    }, [props.message])
    
    return (
        <>
            {state.formSubmitted ? <div className="text-center"><h2>Thank you for contacting us!</h2></div> :
                <form name="Wilson Biker Gear Website Contact Form" data-netlify="true" onSubmit={handleSubmit}>
                    <input type="hidden" name="form-name" value="Wilson Biker Gear Website Contact Form" />
                    <div>
                        <label>Your name
                        <input placeholder="Your full name" type="text" name="name" required value={state.name}  onChange={handleChange}/></label>
                    </div>
                    <div>
                        <label>Your Email: 
                        <input placeholder="name@email.com" type="email" name="email" required value={state.email}  onChange={handleChange}/></label>
                    </div>
                    <div>
                        <label>Message: 
                        <textarea placeholder="Howdy!" name="message" value={state.message} onChange={handleChange} required>
                        </textarea></label>
                    </div>
                    <div>
                        <button className="btn btn-dark" type="submit" required>Send</button>
                    </div>
                </form>
            }
       
        </>
    );
}

export default Form;