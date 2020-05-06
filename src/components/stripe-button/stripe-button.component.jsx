import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    const onToken = token =>{
        console.log(token)
        alert('Payment successful')
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
