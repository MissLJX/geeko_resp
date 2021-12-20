export const order_data = {
  id: 0,
  theme: "order",
  children:[
    {
      id: '0-0',
      pid: 0,
      theme: 'order',
      title: 'How can I change or modify my order?',
      content: `
                <p>Shipping address or items can be modified by contacting customer service before being shipped out.</p>
                <br/>
                <p>Note: Once the order is shipped out, logistics courier will not support to modify since it was mixed in tremendous packages.</p>
               `,          
      import: 'by contacting customer service',
      importStyle: 'color:red',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '0-1','0-2','1-1','1-2'
      ]
    },
    {
      id: '0-1',
      pid: 0,
      theme: 'order',
      title: 'How can I modify my shipping address?',
      content: `
                <p>If the order has not been shipped/assigned a tracking number, you can contact the customer service to modify.</p>
                <br/>
                <p>Please attention: Once the order is shipped out, logistics courier will not support to modify</p>
               `,
      import: '',
      importStyle: '',
      link: 'customer service',
      link_url: '',
      link_app_url: '',
      related:[
          '0-0','0-2','5-4'
      ]
    },
    {
      id: '0-2',
      pid: 0,
      theme: 'order',
      title: 'Can I cancel my order?',
      content: `
                <p>Please contact our customer service if you want to cancel this order.	</p>
                <br/>
                <p>Note: Once the order has been shipped out, it can not be canceled anymore!</p>
               `, 
      import: '',
      link: 'customer service',
      link_url: '',
      related:[
          '2-4', '2-1', '2-2'
      ]
    },
    {
      id: '0-3',
      pid: 0,
      theme: 'order',
      title: 'How can I place an order？',
      content: `
                <p>Here are the steps:</p>
                <br/>
                <p>Step 1: Log in your ChicMe account.</p>
                <p>Step 2: Add some item(s) into your Shopping Bag</p>
                <p>Step 3: click VIEW BAG when item selection is completed.</p>
                <p>Step 4: Complete shipping information.</p>
                <p>Step 5: Fill in payment information and then click the CHECK OUT button to complete the purchase.	</p>
               `,      
      import: '',
      link: '',
      link_url: '',
      related:[
          '1-8', '3-2', '3-3', '1-4', '4-2'
      ]
    },
    {
      id: '0-4',
      pid: 0,
      theme: 'order',
      title: 'Why is my order not shipped yet?',
      content: `
                <p>Hi, normally it takes 3-7 working days to process the order. It is recommended that you wait patiently, thank you for your understanding</p>
                <br/>
                <p>Please note: Total Delivery Time = Processing Time + Shipping Time</p>
               `,               	
      import: '3-7 working days',
      link: '',
      link_url: '',
      related:[
          '1-0', '1-1', '1-3'
      ]
    },
    {
      id: '0-5',
      pid: 0,
      theme: 'order',
      title: "Why I didn't get a confirmation email about my order ?",
      content: `
                <p>Normally, an confirmation email with product details will be sent to your account email address after your payment is successful.</p>
                <p>If you did not receive the email:</p>
                <br/>
                <p>1. Please check if you loged in the valid ChicMe account.</p>
                <p>2. Please check your junk emails and if your email address shielded our email.</p>
               `,        
      import: '',
      link: '',
      link_url: '',
      related:[
          '1-0', '5-4', '1-1'
      ]
    },
  ]
}

export const logistics_data = {
  id: 1,
  theme: "logistics",
  children:[
    {
      id: '1-0',
      pid: 1,
      theme: 'logistics',
      title: "Why didn't I get an email about my order being shipped?",
      content: `
                <p>Normally, an email with tracking number will be sent to your account email address after the order is shipped out in 24 hours.</p>
                <br/>
                <p>If you did not receive the email:</p>
                <br/>
                <p>1. Please visit "My orders" to check the order status, it could be still in processing.</p>
                <p>2. Please check if you loged in the correct ChicMe account, the email is sent to the contacted email address.</p>
                <p>3. Please check your junk emails and if your email address shielded our email. </p> 
               `,          
      import: '',
      importStyle: '',
      link: 'My orders',
      link_url: '',
      link_app_url: '',
      related:[
          '5-4', '1-1', '0-4'
      ]
    },
    {
      id: '1-1',
      pid: 1,
      theme: 'logistics',
      title: "Where is my order?",
      content: `
                <p>If there has no updates on page Track after your order is shipped out.The reason is due to your order was sent from our overseas warehouses. Parcels need to arrive your country by plane from overseas, then local shipping company will pick up parcels from airport in working days.</p>
                <br/>
                <p>Please give some time for the courier to update the latest tracking info after reaching next station, hope you will receive your package soon and love the wonderful item.</p>
                <br/>
                <p>Note: Tracking details can be found in "My Orders", or you can use the order tracking number to check here: https://www.17track.net/en. </p>   
               `,          
      import: '',
      importStyle: '',
      link: 'My orders',
      link_url: '',
      link_app_url: '',
      related:[
          '1-0','5-4','0-5','1-2','1-3','1-6','1-7'
      ]
    },
    {
      id: '1-2',
      pid: 1,
      theme: 'logistics',
      title: "How long will the order take to arrive?",
      content: `
                <p>Hi, normally it takes 3-7 working days to process the order.</p>
                <br/>
                <p>Once your order is shipped out,there will be an email sent out regarding tracking info for your order, you can track the order status in "My orders".</p>
                <br/>
                <p>For more details on shipping time to your country, please refer to: Shipping info</p>  
                <br/>
                <p>Based on our international shipment methods, it will take some days to be delivered to you, the shipping time is also based on shipping company.</p>
               `,          
      import: '3-7 working days',
      importStyle: 'color:red',
      link: ['My orders','Shipping info'],
      link_url: ['',''],
      link_app_url: ['',''],
      related:[
          '1-1','1-3'
      ]
    },
    {
      id: '1-3',
      pid: 1,
      theme: 'logistics',
      title: "Why there is no tracking updated?",
      content: `
                <p>When orders are shipped from our warehouse, it needs days to arrive your country by plane first.</p>
                <p>There is no updated information for your package as it is in transit to the shipping company's next facility. Sometimes the tracking information will not be updated for a couple of days because the package is in transit.</p>
                <p>Once the package arrives at local, the order status will be updated immediately.</p> 
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '1-1','1-2'
      ]
    },
    {
      id: '1-4',
      pid: 1,
      theme: 'logistics',
      title: "Will I be charged for customs, taxes, VATs, or other extra fees?",
      content: `
                <p>
                  We do not collect fees for any costs other than the products we sell and shipping. in some unique cases, it is possible your local post office may request additional fees for customs, taxes or VATs. If you have any questions regarding such fees, please contact your local post office.
                </p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '3-2','1-5','1-8','3-3'
      ]
    },
    {
      id: '1-5',
      pid: 1,
      theme: 'logistics',
      title: "Can you ship to my country?",
      content: `
                <p>Hi, we do shipping to most countries in worldwide but not all of them.</p>
                <p>For more info please refer to: Shipping info. Then you can check if we ship to your country and more shipping details. Thank you.</p>
               `,          
      import: '',
      importStyle: '',
      link: 'Shipping info',
      link_url: '',
      link_app_url: '',
      related:[
          '1-4','1-8','3-2','3-3'
      ]
    },
    {
      id: '1-6',
      pid: 1,
      theme: 'logistics',
      title: "Why was my order divided into two or more packages?",
      content: `
                <p>Hi, we will do partial shipping for your order in the following conditions:</p>
                <br/>
                <p>1) Items are from different warehouses.</p>
                <br/>
                <p>2) Different preparing time for items.</p>
                <br/>
                <p>3) Weight limit of custom or courier, to avoid extra fee</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '1-7','1-0','2-3'
      ]
    },
    {
      id: '1-7',
      pid: 1,
      theme: 'logistics',
      title: "What if confirm delivery before delivered?",
      content: `
                <p>It won't affect the shipping and delivery even you click "confirm order" button in advance.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '4-1',
      ]
    },
    {
      id: '1-8',
      pid: 1,
      theme: 'logistics',
      title: "Is shopping with Chic Me safe?",
      content: `
                <p>Chic Me was founded by people with nearly 10 years in the e-commerce industry. We take your business seriously and, above all, want our customers to be happy. We accept a number of the most-trusted online payment methods available today.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '4-2','3-2','3-3'
      ]
    },
  ]
}

export const return_data = {
  id: 2,
  theme: "return",
  children:[
    {
      id: '2-0',
      pid: 2,
      theme: 'return',
      title: "Can I exchange the item I received for a different size?",
      content: `
                <p>According to our return policy, you can return the item and change the size, but please be sure to contact customer service to confirm the specific exchange information and return process.</p>
                <p>For more details on shipping time to your country, please refer to: Return Policy</p>
               `,          
      import: '',
      importStyle: '',
      link: 'Return Policy',
      link_url: '',
      link_app_url: '',
      related:[
          '2-1','2-2', '0-0'
      ]
    },
    {
      id: '2-1',
      pid: 2,
      theme: 'return',
      title: "What is your return policy?",
      content: `
                <p> We accept return within 7 days of receipt for most items in new condition. Please check here for more details: Return policy.</p>
               `,          
      import: '',
      importStyle: '',
      link: 'Return Policy',
      link_url: '',
      link_app_url: '',
      related:[
          '2-2','2-4','2-5'
      ]
    },
    {
      id: '2-2',
      pid: 1,
      theme: 'return',
      title: "How can I return items?",
      content: `
                <p>Sorry that our products did not meet your expectation. Please contact our customer service and tell us which items you want to return.</p>
                <br/>
                <p>Note: Item sku is needed, so that our agent can process your return request and offer the return address for you.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '2-1','2-4'
      ]
    },
    {
      id: '2-3',
      pid: 1,
      theme: 'return',
      title: "Why is my item missing?",
      content: `
                <p>Sorry for this, maybe your order was shipped out in different packages separately, you can check details via "My orders".</p>
                <br/>
                <p>If not, please contact our manual service for more help.</p>
                <br/>
                <p>Note: here are some info needed:</p>
                <br/>
                <p>1. Pictures of the whole outer package including shipping label and all items you received.</p>
                <br/>
                <p>2. SKU or item name of missing item</p>
               `,          
      import: '',
      importStyle: '',
      link: 'My orders',
      link_url: '',
      link_app_url: '',
      related:[
          '1-6','2-1'
      ]
    },
    {
      id: '2-4',
      pid: 1,
      theme: 'return',
      title: "How long does it take for the refund to be processed?",
      content: `
                <p>Refunds will be issued back to the original form of payment that was used to place your order.</p>
                <br/>
                <p>PayPal：24H</p>
                <p>Debit/Credit card：7-15 busines days</p>
                <p>Klarna：within 14 busines days</p>
                <p>Afterpay/Clearpay：1-3  busines days </p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '2-1','2-2'
      ]
    },
    {
      id: '2-5',
      pid: 1,
      theme: 'return',
      title: "What if I received an item damaged or with craft or fabric issue?",
      content: `
                <p>We do apologize for the inconvenience, kindly suggest you to contact customer service to check for details if necessary.</p>
                <br/>
                <p>Note: Picture and Item name or Item sku of the item are needed.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '2-1','2-2'
      ]
    },
  ]
}

export const payment_data = {
  id: 3,
  theme: "payment",
  children:[
    {
      id: '3-0',
      pid: 1,
      theme: 'payment',
      title: "Where can I find points that I gain?",
      content: `
                <p>To check how many points you have accumulated：</p>
                <p>1. Please log into your ChicMe account.</p>
                <p>2. Select the drop down list below your name in the right hand corner.</p>
                <p>3. Click on the "My points" button to check how many points in your account.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '3-2','3-3'
      ]
    },
    {
      id: '3-1',
      pid: 1,
      theme: 'payment',
      title: "Why was my payment declined?",
      content: `
                <p>It might be the below reasons:</p>
                <p>1. Card info are incorrect, kindly check expiration date, billing address, and security code (Security code on the back of your Visa/Master card).</p>
                <p>2. Card issuer bank declined your payment.</p>
                <p>3. No enough balance on the card.</p>
                <p>If possible, we advise you to try paying with PayPal.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '3-2','3-3','1-8','0-3'
      ]
    },
    {
      id: '3-2',
      pid: 1,
      theme: 'payment',
      title: "What kind of payment methods do you have?",
      content: `
                <p>Hi, we support Credit/Debit Card , PayPal , Online bank transfer，klarna and afterpay. Usually, customers pay orders with their cards and PayPal.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '3-3','1-8','0-3'
      ]
    },
    {
      id: '3-3',
      pid: 1,
      theme: 'payment',
      title: "Can I pay with local currency?",
      content: `
                <p>We accept most currency for payment. You can check and select the "Currency" listed on the upper right corner of Website. It is the same way for country/language.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '3-2','1-5','1-8','0-3'
      ]
    },
  ]
}

export const product_data = {
  id: 4,
  theme: "product",
  children:[
    {
      id: '4-0',
      pid: 1,
      theme: 'product',
      title: "Can I use ChicMe pictures on my own website?",
      content: `
                <p>Hi, thanks for your like and support for ChicMe. Regarding to the dropshipper, please contact our customer service for the details of cooperation.</p>
                <br/>
                <p>Note: ChicMe picture, item details, main intention of picture usage are needed.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-1',
      ]
    },
    {
      id: '4-1',
      pid: 1,
      theme: 'product',
      title: "How do I leave a review?",
      content: `
                <p>You may earn points simply from writing reviews on the products you bought. In addition, extra points can be earned by submitting a photo with the review.</p>
                <br/>
                <p>Please follow the steps below:</p>
                <br/>
                <p>1. Locate the order in "My orders"</p>
                <p>2. Click the "Confirm order" button after receiving</p>
                <p>3. Click the "Review" button to leave a review on the item(s) you've purchased</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-3','5-4',
      ]
    },
    {
      id: '4-2',
      pid: 1,
      theme: 'product',
      title: "How do I choose my size?",
      content: `
                <p>We're excited to introduce our new sizing feature! Please see 'Size guide' on each product page.You may then enter your personal information to get a size suggestion.</p>
                <p>Note: Most items have this function, but not all. We also recommend taking your measurements to compare with our Size Chart.  </p>
                <p><img src='' /></p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '3-2','1-5','1-8','3-3','0-3'
      ]
    },
  ]
}

export const account_data = {
  id: 5,
  theme: "account",
  children:[
    {
      id: '5-0',
      pid: 5,
      theme: 'account',
      title: "How do I delete my ChicMe account?",
      content: `
                <p>If you signed up for ChicMe using your Facebook ID you may turn off ChicMe's Facebook privileges using your computer or mobile device.</p>
                <p>On your computer, visit http://facebook.com/settings/?tab=applications. Then select the "X" on the Chic Me icon.</p>
                <p>On your Facebook app, just choose "Account Settings" in the menu. Then choose "Apps" -> "Chic Me" -> "Remove ChicMe."</p>
                <p>If you want to delete other types of ChicMe accounts, please contact customer service. </p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-3','5-2'
      ]
    },
    {
      id: '5-1',
      pid: 5,
      theme: 'account',
      title: "Why can’t I log into my account?",
      content: `
                <p>1. Kindly check if the account email address and password are correct.</p>
                <p>2. We support three login methods: Email address,  Facebook account, please make sure the correct login.</p>
                <p>3. If you forgot password, click the button“Forgot Your Password”on login page for help.</p>
                <p>Note: If the registered email address was wrong, you can contact us for more help.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-2','5-4'
      ]
    },
    {
      id: '5-2',
      pid: 5,
      theme: 'account',
      title: "How to edit or reset my password?",
      content: `
                <p>Hi, you can edit or reset password via clicking "Change Password " button in "My Account".</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-1','5-0','5-4'
      ]
    },
    {
      id: '5-3',
      pid: 5,
      theme: 'account',
      title: "How do I stop receiving emails?",
      content: `
                <p>Hi, there is a "unsubscribe" button at the bottom of each promotion email, you may try it. Also, our customer service can help you unsubscribe.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-0',
      ]
    },
    {
      id: '5-4',
      pid: 5,
      theme: 'account',
      title: "I can't find my order in my account",
      content: `
                <p>ChicMe support 2 kinds of login methods: Email address and Facebook account, please make sure you log in the correct accout or you login in with the correct mail address.</p>
                <br/>
                <p>If you still can not find your order after done this, please contact us for help.</p>
               `,          
      import: '',
      importStyle: '',
      link: '',
      link_url: '',
      link_app_url: '',
      related:[
          '5-1','1-1','1-2'
      ]
    },
  ]
}

export const questions_new = [
  order_data,
  logistics_data,
  return_data,
  payment_data,
  product_data,
  account_data
]