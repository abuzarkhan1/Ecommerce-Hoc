import React from 'react'
import Meta from "../../../components/Meta/Meta";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./PrivacyPolicy.css"
const PrivacyPolicy = () => {
  return (
   <>
        <Meta title={"Privacy Policy"} />
      <BreadCrumb title="Privacy Policy" />
        <section className='privacy-policy-wrapper home-wrapper-02'>
            <div className='privacy-policy-container-01'>
            <div className='privacy-policy-row-01'>
             <div className='privacy-policy-coloum-01'>
            <div className='policy'> lorem demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.</div>
             </div>   
            </div>
            </div>
        </section>
   </>
  )
}

export default PrivacyPolicy;