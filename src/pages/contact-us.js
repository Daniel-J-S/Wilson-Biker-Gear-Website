import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
        <Layout>
            <SEO title="Contact Us" keywords={[`Let us hear from you`, `contact us`, `reach out to us`]} />
            <div className="Contact-us">
                <div className="container">
                    {/* To make form work, use your own formspree credentials in action="" */}
                    <form action="https://formspree.io/f/mqkwnyao" method="POST" name="contact">
                        <div>
                            <label>Your name
                            <input type="text" name="name" required /></label>
                        </div>
                        <div>
                            <label>Your Email: 
                            <input type="email" name="email" required /></label>
                        </div>
                        <div>
                            <label>Message: 
                            <textarea defaultValue={getItemDetails() || ""} name="message" required>
                            </textarea></label>
                        </div>
                        <div>
                            <button type="submit" required>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}


export default Contact
