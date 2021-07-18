---
title: "Claim AutoFill: Filing a single claim"
experiment: 215
date: "2021-07-18"
permalink: autofill-single-claim
tags: carrierwave, svelte
---

Continuing on with my [claim autofill chrome extension](/posts/chrome-autofill-extension), I got it to the point where it can fill out the entire form.

## Code

For now it uses static data, but the real world the data would come from the database:

```html
<!-- in App.svelte -->
<script>
  let shipments = [
    {
      tracking: '1234000000000000001',
      status: 'pending',
      insuranceFees: 2.20,
      mailingDate: new Date(2021, 2, 22),
      item: {
        name: 'Camera',
        type: '06',
        description: 'Digital camera',
        purchaseDate: new Date(2021, 2, 20)
      },
      claim: {
        reason: 'damage',
        amount: 100
      },
      files: [
        {
          name: 'receipt.png',
          data: 'data:image/png;base64,iVBORw0KGgoA.....'
        }
      ],
      origin: {
        firstName: 'John',
        initial: 'Q',
        lastName: 'Smith',
        company: 'ACME Corporation',
        address1: '1234 Main Street',
        address2: 'Suite 100',
        city: 'New York',
        state: 'NY',
        zip: '11111',
        email: 'jqsmith@acme.com',
        phone: '123-123-1234'
      },
      destination: {
        firstName: 'Jane',
        initial: 'L',
        lastName: 'Smith',
        company: 'ACME Corporation',
        address1: '1234 Main Street',
        address2: 'Suite 100',
        city: 'New York',
        state: 'NY',
        zip: '11111',
        email: 'jqsmith@acme.com',
        phone: '123-123-1234'
      }
    },
    // ... more here
  }
<script>
```

Then when the user clicks "submit" in the extension:

```html
<script>
  let shipments = { /* hardcoded data here */ }

  async function submit(shipment) {
    // open fake USPS site (for testing)
    await sendMessage({
      type: 'open',
      url: 'http://usps.local'
    })

    await sleep(2000)

    // send messages to content script
    await sendMessage({
      type: 'input',
      field: 'tracking',
      value: shipment.tracking
    })

    await sendMessage({
      type: 'input',
      field: 'mailing_date',
      value: format(shipment.mailingDate, "yyyy-MM-dd")
    })

    await sendMessage({
      type: 'select',
      field: 'mail_class',
      value: 'first-class-mail'
    })

    await sendMessage({
      type: 'select',
      field: 'claim_reason',
      value: shipment.claim.reason
    })

    await sendMessage({
      type: 'input',
      field: 'insurance_fees',
      value: shipment.insuranceFees
    })

    await sendMessage({
      type: 'radio',
      field: 'mailer_or_addressee',
      value: 'mailer'
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_first_name',
      value: shipment.origin.firstName
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_middle_initial',
      value: shipment.origin.initial
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_last_name',
      value: shipment.origin.lastName
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_company',
      value: shipment.origin.company
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_address1',
      value: shipment.origin.address1
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_address2',
      value: shipment.origin.address2
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_city',
      value: shipment.origin.city
    })

    await sendMessage({
      type: 'select',
      field: 'mailer_state',
      value: shipment.origin.state
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_zip',
      value: shipment.origin.zip
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_email',
      value: shipment.origin.email
    })

    await sendMessage({
      type: 'input',
      field: 'mailer_tel',
      value: shipment.origin.phone
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_first_name',
      value: shipment.destination.firstName
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_middle_initial',
      value: shipment.destination.initial
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_last_name',
      value: shipment.destination.lastName
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_company',
      value: shipment.destination.company
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_address1',
      value: shipment.destination.address1
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_address2',
      value: shipment.destination.address2
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_city',
      value: shipment.destination.city
    })

    await sendMessage({
      type: 'select',
      field: 'addressee_state',
      value: shipment.destination.state
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_zip',
      value: shipment.destination.zip
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_email',
      value: shipment.destination.email
    })

    await sendMessage({
      type: 'input',
      field: 'addressee_tel',
      value: shipment.destination.phone
    })

    await sendMessage({
      type: 'input',
      field: 'payment_first_name',
      value: shipment.origin.firstName
    })

    await sendMessage({
      type: 'input',
      field: 'payment_middle_initial',
      value: shipment.origin.initial
    })

    await sendMessage({
      type: 'input',
      field: 'payment_last_name',
      value: shipment.origin.lastName
    })

    await sendMessage({
      type: 'input',
      field: 'payment_company',
      value: shipment.origin.company
    })

    await sendMessage({
      type: 'input',
      field: 'payment_address1',
      value: shipment.origin.address1
    })

    await sendMessage({
      type: 'input',
      field: 'payment_address2',
      value: shipment.origin.address2
    })

    await sendMessage({
      type: 'input',
      field: 'payment_city',
      value: shipment.origin.city
    })

    await sendMessage({
      type: 'select',
      field: 'payment_state',
      value: shipment.origin.state
    })

    await sendMessage({
      type: 'input',
      field: 'payment_zip',
      value: shipment.origin.zip
    })

    await sendMessage({
      type: 'input',
      field: 'payment_email',
      value: shipment.origin.email
    })

    await sendMessage({
      type: 'input',
      field: 'payment_tel',
      value: shipment.origin.phone
    })

    await sendMessage({
      type: 'input',
      field: 'item_name',
      value: shipment.item.name
    })

    await sendMessage({
      type: 'select',
      field: 'item_type',
      value: shipment.item.type
    })

    await sendMessage({
      type: 'textarea',
      field: 'item_description',
      value: shipment.item.description
    })

    await sendMessage({
      type: 'input',
      field: 'purchase_date',
      value: format(shipment.item.purchaseDate, "yyyy-MM-dd")
    })

    await sendMessage({
      type: 'input',
      field: 'amount_requested',
      value: shipment.claim.amount
    })

    await sendMessage({
      type: 'file',
      field: 'proof_of_value',
      files: shipment.files
    })

    await sendMessage({
      type: 'input',
      field: 'nickname',
      value: `Claim for #${shipment.tracking}`
    })
  }

  // function to send messages to content script in active tab
  async function sendMessage(message) {
    return new Promise((resolve) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          resolve(response.farewell)
        })
      })
    })
  }

  // utlity function to promisify setTimeout()
  async function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
</script>

<!-- display list of shipments -->
{#each shipments as shipment}
  <div>
    <h2>{shipment.tracking}</h2>
    <button on:click={() => submit(shipment)}>Submit</a>
  </div>
{/each}
```

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626598075/1000experiments.dev/autofill-filing-single-claim_kuzzzp.mp4"/>

## Notes

- Wire up database
- Add login requirement before using extension
- Submit multiple at once
- Think about whether it shoul just fill, or fill and submit in one shot
