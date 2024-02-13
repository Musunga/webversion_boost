export const getToken = (price, success = () => {}) => {
  console.log('stripe price', price)
  return new Promise((resolve, reject) => {
    if (window.stripe) {
      const paymentRequest = window.stripe.paymentRequest({
        country: process.env.VUE_APP_COUNTRY,
        currency: process.env.VUE_APP_CURRENCY,
        total: {
          label: process.env.VUE_APP_NAME,
          amount: price * 100
        },
        requestPayerName: false,
        requestShipping: false,
        requestPayerEmail: false
      })
      // Check the availability of the Payment Request API first.
      paymentRequest.canMakePayment().then((result) => {
        console.log('stripepay result', result, paymentRequest)
        if (result) {
          resolve(paymentRequest)
        } else {
          reject(new Error('当前环境不支持'))
        }
      }).catch(error => {
        reject(error)
      })
      paymentRequest.on('token', (ev) => {
        success(ev.token.id, ev)
      })
    } else {
      reject(new Error('stripe还没加载完成'))
    }
  })
}
