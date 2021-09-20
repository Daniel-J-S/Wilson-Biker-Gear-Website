import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import logo from "../images/the-wilsons.jpeg"

class About extends React.Component {
    render() {
        return ( 
        <Layout >
            <SEO title="About" keywords={[`leather goods`, `biker gear`, `vests`]} />
            <div className="site-About">
            <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div class="row">
                        <div class="col-sm-2">
                            <img src={logo} alt="Jeff and Rose Wilson" />
                        </div>
                    </div>
                    <h2>About Us</h2>
                    <p>40 years experience in leather goods, sewing and passing on the best prices to customers.  Looking for Biker Gear, accessories or just need your patches sewed on.  I specialize in exceptional quality and precision to ensure they are done right the 1st time.</p>
                    </div>
                </div>
            </div> 
        </div> 
        </Layout >
        )
    }
}
export default About
