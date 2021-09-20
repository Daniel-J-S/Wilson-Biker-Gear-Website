import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
    render() {
        return ( <
            Layout >
            <SEO title="About" keywords={[`leather goods`, `biker gear`, `vests`]} /> <
            div className = "site-About" >
            <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h2>About Us</h2>
                    <p>40 years experience in leather goods, sewing and passing on the best prices to customers.  Looking for Biker Gear, accessories or just need your patches sewed on.  I specialize in exceptional quality and precision to ensure they are done right the 1st time.</p>
                    <p><a href="https://rohitgupta.design/oneshopper-gatsby-site" target="_blank" rel="noopener noreferrer">https://rohitgupta.design/oneshopper-gatsby-site</a></p>
                    <h2>Author</h2>
                    <div class="row">
                        <div class="col-sm-2">
                            <img src="https://images.ctfassets.net/hwhhx381e090/5IlJCTvfaBL5TZ1U56ykpb/098bdd3b3f918aa29708f28fec7fdde9/rohitgupta.jpg?w=200&h=200&q=50&fit=fill" alt="Rohit Gupta" />
                        </div>
                        <div class="col-sm-8">
                            <h2 class="mb-1">Rohit Gupta</h2>
                            <p class="mb-0">
                                <a href="https://rohitgupta.netlify.app/" target="_blank" rel="noopener noreferrer">Website</a>
                            </p>
                            <p class="mb-0">
                                <a href="mailto:rohitguptab33@gmail.com">Gmail</a>
                            </p>
                            <p class="mb-0">
                                <a href="https://github.com/rohitguptab" target="_blank" rel="noopener noreferrer">Github</a>
                            </p>
                            <p class="mb-0">
                                <a href="https://twitter.com/_rohitguptab" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </p>
                        </div>
                    </div>
                    <h2>Features</h2>
                    <ul>
                        <li>Blog post listing with for each blog post.</li>
                        <li>Store page with all Product with few good features like Rating, Price, Checkout, More then one Product images with tabbing.</li>
                        <li>Contact form with Email notification.</li>
                        <li>Index pages design with Latest Post, Latest Blog and Deal of week and Banner.</li>
                        <li>So many other Good features</li>
                    </ul>
                    </div>
                </div>
            </div> 
        </div> 
        </Layout >
        )
    }
}
export default About
