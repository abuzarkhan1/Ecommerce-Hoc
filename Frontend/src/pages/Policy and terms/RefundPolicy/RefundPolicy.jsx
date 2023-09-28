import React from 'react'
import Meta from "../../../components/Meta/Meta";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./RefundPolicy.css"
const RefundPolicy = () => {
  return (
   <>
        <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <section className='refund-policy-wrapper home-wrapper-02'>
            <div className='refund-policy-container-01'>
            <div className='refund-policy-row-01'>
             <div className='refund-policy-coloum-01'>
            <div className='policy'>lorem demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.</div>
             </div>   
            </div>
            </div>
        </section>
   </>
  )
}

export default RefundPolicy;