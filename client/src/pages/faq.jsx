import { useEffect, useState } from 'react';
import { getFAQs } from '../api/faqApis';
import { Html } from "@react-three/drei";
import downArrow from '../assets/downArrow.svg';
import upArrow from '../assets/upArrow.svg';

const FAQs = () => {
  const [faqs, setFaqs] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getFAQs()
      .then( data => {
        setFaqs(data.faqs)
      })
      .catch(err => console.log(err))
  }, [])

  const handleShowAnswer = (index) => {
    if(index === selected)
      setSelected(null)
    else
      setSelected(index)
  } 

  return (
    <Html style={{width: "70vw", height: "auto", transform: "translate(calc(-35vw), -50%)"}}>
      <div className="faqs-container window">
          {
            faqs && Array.isArray(faqs) && faqs.map( (faq, index) => {
              return (
                <div key={index} className="faq window" onClick={() => handleShowAnswer(index)}>
                  <div className="question window">
                    <div>
                      {faq.question}
                    </div>
                    <img src={index === selected? upArrow: downArrow} alt="collapseIcon"/>
                  </div>
                  <div className={`answer ${index===selected?"open": "closed"}`}>
                    {faq.answer}
                  </div>
                </div>
              )
            })
          }
      </div>
    </Html>
  )
}

export default FAQs