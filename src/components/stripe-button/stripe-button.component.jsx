import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100
    const publishableKey = 'pk_test_voJdSQARyylVgu0zBJ6mtPbi00NU81wBzJ'
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
