var stripeScript
export default {
  methods: {
    loadStripeScript () {
      if (!stripeScript) {
        stripeScript = window.document.createElement('script')
        stripeScript.src = 'https://js.stripe.com/v3/'
        stripeScript.onload = () => {
          window.stripe = Stripe(process.env.VUE_APP_STRIPE_ID)
          window.stripeElements = window.stripe.elements()
        }
        var head = window.document.head || window.document.getElementsByTagName('head')[0] || window.document.documentElement
        head.insertBefore(stripeScript, head.firstChild)
      } else {
        window.stripe = Stripe(process.env.VUE_APP_STRIPE_ID)
        window.stripeElements = window.stripe.elements()
      }
    }
  }
}
