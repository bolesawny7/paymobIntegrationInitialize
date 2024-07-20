const API = "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RnMk1EYzVMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuQVhLNUZSdU1VdU5ZOGNRVkdTd1NWRi1yMG9oWnZMeXNJOVVMLXdUbzNiSklNMWJCZXgtckR4ZDFYNEdDVE1RRzV0MkxJN1djeDZ5ck1OUTJxQ09zaXc="
const integration_id = 4614432;

async function firstStep() {
    let data = {
        "api_key": API,
    }

    let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API}`
        },
        body: JSON.stringify(data)
    })

    let response = await request.json()
    let token = response.token
    secondStep(token)
}

async function secondStep(token) {
    let data = {
        "auth_token": token,
        "delivery_needed": "false",
        "amount_cents": "100",
        "currency": "EGP",
        "items": [],
    }

    let request = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    let response = await request.json()
    thirdStep(token, response.id)
}

async function thirdStep(token, id) {
    let data = {
        "auth_token": token,
        "amount_cents": "100",
        "expiration": 3600,
        "order_id": id,
        "billing_data": {
            "apartment": "803",
            "email": "claudette09@exa.com",
            "floor": "42",
            "first_name": "Clifford",
            "street": "Ethan Land",
            "building": "8028",
            "phone_number": "+86(8)9135210487",
            "shipping_method": "PKG",
            "postal_code": "01898",
            "city": "Jaskolskiburgh",
            "country": "CR",
            "last_name": "Nicolas",
            "state": "Utah"
        },
        "currency": "EGP",
        "integration_id": integration_id
    }

    let request = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    let response = await request.json()

    cardPayment(response.token)
}

async function cardPayment(token) {
    let iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/857073?payment_token=${token}`

    location.href = iframeUrl

    let request = await fetch("https://accept.paymob.com/api/acceptance/payments/pay", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}
firstStep()
