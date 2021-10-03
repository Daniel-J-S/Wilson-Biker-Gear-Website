import React from 'react';
import Form from '../components/form';
import SEO from '../components/seo';

function Contact ({ location }) {
    function getItemDetails() {
        if(location.state && location.state.itemName && location.state.itemPrice) {
            const {itemName, itemPrice, itemSize} = location.state
            return `Hello there, I'm interested in purchasing your "${itemName}" available for $${itemPrice} in a size "${itemSize.toLowerCase()}"`
        } else {
            return false
        }
    }

    return (
        <>
            <SEO title="Contact Us" keywords={[`Let us hear from you`, `contact us`, `reach out to us`]} />
            <div className="Contact-us">
                <div className="container">
                    <h1 className="mb-5">Contact Us</h1>
                    <Form message={getItemDetails()} />
                </div>
            </div>
        </>
    )
}


export default Contact;
