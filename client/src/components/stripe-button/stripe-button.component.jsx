import React from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from 'axios'

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY

    const onToken = token =>{
        console.log(token)
      axios({
          url : 'payment',
          method :'post',
          data: {
              amount : priceForStripe,
              token
          }
      }).then(response => {
          alert('Payment successful')
          console.log(response)
      }).catch(error=> {
          console.log('Payment Error', error)
          alert('Your payment was unsuccessful. Please use the provided credit card')
      })
    }

    return (
        <StripeCheckout
        label={'Pay Now'}
        name={'BRIGHT PORTFOLIO LIMITED'}
        shippingAddress
        billingAddress
        image={'https://svgshare.com/i/CUz.svg'}
        description={`Your Total is ¢${price}`}
        amount={priceForStripe}
        panelLabel={'Pay Now'}
        stripeKey={publishableKey}
        token={onToken}
        />
    )
}

export default StripeCheckoutButton
