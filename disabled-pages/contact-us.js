import { Link } from 'gatsby';
import React from 'react';
import Form from '../components/form';
import SEO from '../components/seo';

function Contact ({ location }) {
    function getItemDetails() {
        if(location.state && location.state.itemName && location.state.itemPrice) {
            const {itemName, itemPrice, itemSize} = location.state
            return `Hello there, I'm interested in purchasing your "${itemName}" available for $${itemPrice} in a size "${itemSize}".`
        } else {
            return false
        }
    }

    return (
        <>
            <SEO 
                title="Contact Us" 
                keywords={[`Let us hear from you`, `contact us`, `reach out to us`]} 
                description="Please contact us for any questions regarding our current inventory or if you just want to say hello"
                location={location}
            />
            <div className="Contact-us">
                <div className="container">
                    <h1 className="mb-5">Contact Us</h1>
                    <p className="mb-5 mt-5"><small>Question about returning an item? See our <Link to="/terms-of-service">Terms of Service</Link> page before contacting us</small></p>
                    <Form message={getItemDetails()} />
                </div>
            </div>
        </>
    )
}


export default Contact;
