const question1 = {
  id: 'se-1',
  title: 'Where to find my orders?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Where to find my orders?</h1>
			</header>
			<section>
				<p>There are two kinds of accounts you may have here in ${window.sitename}, A registered account & A facebook account. Please make sure that you have logged in the right account. Once you have done so you may access your order</p>
				<img src="https://dgzfssf1la12s.cloudfront.net/chicme/20210107c/chiquedoll-faq.jpg">
			</section>
		</article>
	`
}

const question2 = {
  id: 'se-2',
  title: 'How do I submit a ticket?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>How do I submit a ticket?</h1>
			</header>
			<section>
				<p>A ticket is used to contact our Customer Support Team. Please submit a ticket if you have any questions regarding your order. Follow the steps below:</p>
				<ol>
					<li>
						<h2>Step1:</h2>
						<p>Log in your account and select " orders". Then please click "contact seller"</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/howdoisubmitaticket.png">
					</li>
					<li>
						<h2>Step2:</h2>
						<p>Select the topic that is most closely related to your issue.And send your message </p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/step2.png">
					</li>
				</ol>
			</section>
		</article>
	`
}

const question3 = {
  id: 'se-3',
  title: 'How do I change details on my '+ window.sitename +' account?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>How do I change details on my ${window.sitename} account?</h1>
			</header>
			<section>
				<p>1.Click "Sign in" on the top right corner of our homepage.</p>
				<p>2.Select "Settings" in your account, then change details.</p>
				<ol>
					<li>
						<p>Change your password:</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/changeyourpwd.png">
					</li>
					<li>
						<p>Edit/Add shipping address:</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/addshipping.png">
					</li>
					<li>
						<p>Change your email address</p>
						<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/changeyouremail.png">
					</li>
					<li>
						<p>Browsing history</p>
					</li>
					<li>
						<p>Delete account</p>
					</li>
				</ol>
			</section>
		</article>
	`
}

const question4 = {
  id: 'se-4',
  title: 'How do I reset my password?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>How do I reset my password?</h1>
			</header>
			<section>
				<p>The password needs to be changed or reset online by customer.You can follow the steps below:</p>
				<ol>
					<li>
						Click "Sign in" on the top right corner of our homepage
					</li>
					<li>
						Select "forgot your password"
					</li>
					<li>
						Enter your registered email address in the provided box.
					</li>
					<li>
						You may receive the reset email and you will create a new password with the link. Please also check your junk mail folder if you cannot locate our mail.
					</li>
					<li>
						Enter the new password to log into your account.
					</li>
				</ol>
			</section>
		</article>
	`
}

const question5 = {
  id: 'se-5',
  title: 'Why can’t I log into my '+ window.sitename +' account?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Why can’t I log into my ${window.sitename} account?</h1>
			</header>
			<section>
				<p>
				Please make sure you have entered the correct email address and password.<br>
				If you sign in by Facebook with the same email address the first time, please log in by your Facebook account.
				</p>
			</section>
		</article>
	`
}

const question6 = {
  id: 'se-6',
  title: 'Can I log in with my Facebook account?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Can I log in with my Facebook account?</h1>
			</header>
			<section>
				<p>
					Signing in with Facebook is another option we offer our customers. It is fast and easy and does not require you to type in your username and password every time. If you do sign in with your Facebook account, you will get access to exclusive offers and deals, such as voting for new designs and sharing your opinion
				</p>
			</section>
		</article>
	`
}

const question7 = {
  id: 'se-7',
  title: 'Do I have to register to place an order?',
  parentId: 'root-1',
  richText: `
		<article>
			<header>
				<h1>Do I have to register to place an order?</h1>
			</header>
			<section>
				<p>
					Registering with ${window.sitename} has many benefits and will make your shopping experience easy and efficient.  Before placing an order you will need to register. To register, enter your email address, create a password and wait for the confirmation email from ${window.sitename}, read the email for further instructions. Please make sure the email address you use is entered correctly
				</p>
			</section>
		</article>
	`
}

const question8 = {
  id: 'se-8',
  title: 'How can I cancel the Paid order?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How can I cancel the Paid order?</h1>
			</header>
			<section>
				<p>
					To cancel a paid order, you will need to submit a ticket by clicking the "My Tickets" button and send all the necessary information.
				</p>
				<p>
					Here at ${window.sitename}, the order just can be canceled before the shipment. In other words, once you receive our shipment notice, the order cannot be canceled. Then please wait for your package to arrive and you may either keep it or contact us to arrange "return for refund".
				</p>
				<p>
					If you feel like you need to cancel the order right away, then please click on the "Online Help" button at the top of the homepage.
				</p>
			</section>
		</article>
	`
}

const question9 = {
  id: 'se-9',
  title: 'Why didn\'t I get an email about my order being shipped?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Why didn\'t I get an email about my order being shipped?</h1>
			</header>
			<section>
				<p>
					It will normally take 3-7 business days for preparation before shipment.
				</p>
				<p>
					We will inform you with an email after shipment or if there is any delay.You can check the junk mail first if you didn’t receive it.
				</p>
				<p>
					If you can't find an email fifteen days after you’ve placed the order, please ${window.sitename} customer service.
				</p>
			</section>
		</article>
	`
}

const question10 = {
  id: 'se-10',
  title: 'How do I change my shipping address once my order is placed?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How do I change my shipping address once my order is placed?</h1>
			</header>
			<section>
				<p>
					We can only update your shipping address before shipment.
				</p>
				<p>
					To ensure that your package can be properly delivered, please ensure that your address is complete and correct with all information including apartment/suite/room numbers.
				</p>
				<p>
					<strong>Once your package shipped, we will not be able to change the shipping address.</strong> And we are unable to cancel an order after shipment. Please keep an eye on your order status by checking "My Orders" to make sure you can receive your order.
				</p>
			</section>
		</article>
	`
}

const question11 = {
  id: 'se-11',
  title: 'How can I change my order?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How can I change my order?</h1>
			</header>
			<section>
				<p>
					Please note that we can help you modify your order before shipment.
				</p>
				<p>
					It includes changing the size or the color of an item, removing an item, changing your shipping address.
				</p>
				<p>
					<strong>Once your package shipped, we will not be able to change anything.</strong>
				</p>
			</section>
		</article>
	`
}

const question12 = {
  id: 'se-12',
  title: 'What should I do if I did not receive a confirmation email?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>What should I do if I did not receive a confirmation email?</h1>
			</header>
			<section>
				<p>
					If you have not received a confirmation email about your order, you may have registered your email incorrectly or the email might be in your spam folder. You may log into your ${window.sitename} account and click "My Orders" button to see your orders. You may also submit a ticket online to find out more information about your order.
				</p>
			</section>
		</article>
	`
}

const question13 = {
  id: 'se-13',
  title: 'How long will it take my order to arrive?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How long will it take my order to arrive?</h1>
			</header>
			<section>
				<p>
					Here at ${window.sitename}, we take pride and strive to make sure all packages are delivered in a timely manner. Normally you will receive your order in 7-25 business days from the date that it is placed.
				</p>
				<p>
					<strong>The delivery days = processing days + shipping days.</strong>
				</p>
				<p>You can check order status under the button "My Orders"</p>
				<p>More information please click this link : <a href="https://www.${window.sitename}.com/fs/shipping-policy?isouter=1">https://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}

const question14 = {
  id: 'se-14',
  title: 'How do I track my orders?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How do I track my orders?</h1>
			</header>
			<section>
				<p>
					Tracking your package is easy .You can log into your ${window.sitename} account and find all your order information. Click on "My Orders" and click on "View Details" and you can find out where your package is. You can also send a ticket to check your order information.
				</p>
			</section>
		</article>
	`
}

const question15 = {
  id: 'se-15',
  title: 'Do I need to pay for the costumes?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Do I need to pay for the costumes?</h1>
			</header>
			<section>
				<p>
					The tax is not included in what you payed to them. We will put the value in invoice as low as we can  , but customer need to pay the tax if there is a tax in shipping.
				</p>
			</section>
		</article>
	`
}

const question16 = {
  id: 'se-16',
  title: 'How to change the billing address?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How to change the billing address?</h1>
			</header>
			<section>
				<p>
					In our system, the billing address will be automatically generated to the same as shipping address.
				</p>
				<p>
					In our system, the billing address will be automatically generated to the same as shipping address.
				</p>
				<p>
					Therefore, the shipping address should be same with the billing address, if you want to change the billing address, you need call your ban for a  check.
				</p>
			</section>
		</article>
	`
}

const question17 = {
  id: 'se-17',
  title: 'Where do I put the discount coupon?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Where do I put the discount coupon?</h1>
			</header>
			<section>
				<p>
					Before check out, you can add the coupon code you have on the coupon blank
				</p>
				<p>
					If you want to change the color or the size of the item you ordered, you need contact our customer service, before the shipment, we can change it for you. 
				</p>
			</section>
		</article>
	`
}

const question18 = {
  id: 'se-18',
  title: 'Why didn’t I get a confirmation about my order?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Why didn’t I get a confirmation about my order?</h1>
			</header>
			<section>
				<p>
					If you sign in with a normal email when you make an order, you will get an order confirmation from us in 24 hours, you can check the junk mail first if you didn’t receive it.If there is still nothing after a  check, you can contact our customer service.
				</p>
			</section>
		</article>
	`
}

const question19 = {
  id: 'se-19',
  title: 'Can I get a discount coupon for my first order?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>Can I get a discount coupon for my first order?</h1>
			</header>
			<section>
				<p>
					If you sign up our website for the first time, you will get an email for the discount coupon, you can add it in the discount coupon blank before you check out
				</p>
			</section>
		</article>
	`
}

const question20 = {
  id: 'se-20',
  title: 'How  can I make an order?  How to make an order?',
  parentId: 'root-2',
  richText: `
		<article>
			<header>
				<h1>How  can I make an order?  How to make an order?</h1>
			</header>
			<section>
				<p>
					This is the step for how to make an order:
				</p>
				<p>
					Step 1:To add an item into your cart, simply select the “Add to Bag” button. Don't forget to choose the size and color before adding an item to your bag.
				</p>
				<p>
					Step 2:Once you complete your selection of items, click on “VIEW BAG” for a preview of your order. From here, you can review your order and change the quantity if necessary,edit address,choose the shipping company 
				</p>
				<p>
					Step 3:Choose paypal or credit card to pay for your order ,and Finally, complete your payment information and click “Pay” to complete your purchase.
				</p>
			</section>
		</article>
	`
}

const question21 = {
  id: 'se-21',
  title: 'Do you accept cash on delivery?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Do you accept cash on delivery?</h1>
			</header>
			<section>
				<p>
					Sorry for this, we don’t accept cash on delivery.The customer needs to pay for it online. We can accept PayPal,Visa and MasterCard.We can’t accept the gift card.
				</p>
			</section>
		</article>
	`
}

const question22 = {
  id: 'se-22',
  title: 'Can I use a gift card to pay?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Can I use a gift card to pay?</h1>
			</header>
			<section>
				<p>
					The customer needs to pay for it online. We can accept PayPal,Visa and MasterCard.We can’t accept the gift card.
				</p>
			</section>
		</article>
	`
}

const question23 = {
  id: 'se-23',
  title: 'Why my payment keeps declined?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Why my payment keeps declined?</h1>
			</header>
			<section>
				<p>
					Due to account safety, the declined reasons might be different.${window.sitename} can accept PayPal,Visa and MasterCard.
				</p>
				<p>
				       Please check the card details on your ${window.sitename} account to make sure the information provided is correct. Pay attention to  billing address, the billing address should be same with shipping address.
                </p>
				<p>
				    Your card issuer may have declined your payment. Because they will not inform us the reason for doing so, it is best to check with your card issuer for details. If possible, we’d also advise you to try paying with PayPal.				
                </p>
			</section>
		</article>
	`
}

const question24 = {
  id: 'se-24',
  title: 'Am I able to apply multiple discount codes?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Am I able to apply multiple discount codes?</h1>
			</header>
			<section>
				<p>
					Only one coupon code is eligible per order.
				</p>
				<p>
				    It is also very convenient to apply the coupon to your order.
                </p>
                <p>
                    After you check out from the shopping cart, under the Order Summary, please enter your coupon code, then apply, the coupon will be applied successfully:
                </p>
                <img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/amienabletopay.png">
			</section>
		</article>
	`
}

const question25 = {
  id: 'se-25',
  title: 'Why is my credits invalid ?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Why is my credits invalid ?</h1>
			</header>
			<section>
				<p>
					Users may receive no more than 200 credits per day, not counting credits received as a result of purchases
				</p>
				<p>
					The amount of credit applied to an order may not exceed 4% of the order's value Credits will be Expired in 12 months
				</p>
				<p>
					100 credits equal $1 USD
				</p>
				<p>
					Credit does not apply toward shipping cost
				</p>
			</section>
		</article>
	`
}
const question26 = {
  id: 'se-26',
  title: 'Why am I being asked to authorize my order?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Why am I being asked to authorize my order?</h1>
			</header>
			<section>
				<p>
					Detailed personal information may be required to authorize your order.  If you have been asked to authorize your order it has been randomly selected and placed on hold by our fraud prevention team for further verification. It is our responsibility to protect our shoppers from any unwanted billings. If the order has not been authorized after one week, we are forced to believe it is fraudulent and the order will be subject to cancellation without further notice.
				</p>
			</section>
		</article>
	`
}

const question27 = {
  id: 'se-27',
  title: 'Am I able to use my '+ window.sitename +' bonus points, Wallet money and a coupon code all at the same time?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Am I able to use my ${window.sitename} bonus points, Wallet money and a coupon code all at the same time?</h1>
			</header>
			<section>
				<p>
					Yes! Of course you may apply all three Bonus points, Wallet money & Coupon code all at the same time.
				</p>
			</section>
		</article>
	`
}

const question28 = {
  id: 'se-28',
  title: 'Why I can’t pay for it by my card?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Why I can’t pay for it by my card?</h1>
			</header>
			<section>
				<p>
					Due to account safety, the declined reasons might be different.
				</p>
				<p>
					Please check the card details on your ${window.sitename} account to make sure the information provided is correct. Pay attention to  billing address, the billing address should be same with shipping address.
				</p>
				<p>
					Your card issuer may have declined your payment. Because they will not inform us the reason for doing so, it is best to check with your card issuer for details. If possible, we’d also advise you to try paying with PayPal.
				</p>
			</section>
		</article>
	`
}

const question29 = {
  id: 'se-29',
  title: 'Why my card keeps declined?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Why my card keeps declined?</h1>
			</header>
			<section>
				<p>
					Due to account safety, the declined reasons might be different.
				</p>
				<p>
					Please check the card details on your ${window.sitename} account to make sure the information provided is correct. Pay attention to  billing address, the billing address should be same with shipping address.
				</p>
				<p>
					Your card issuer may have declined your payment. Because they will not inform us the reason for doing so, it is best to check with your card issuer for details. If possible, we’d also advise you to try paying with PayPal.
				</p>
			</section>
		</article>
	`
}

const question30 = {
  id: 'se-30',
  title: 'Can I use paypal to pay?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Can I use paypal to pay?</h1>
			</header>
			<section>
				<p>
					Yes, you can use paypal to pay, it would be easier than card. The customer needs to pay for it online. We can accept PayPal,Visa and MasterCard.We can’t accept the gift card.
				</p>
			</section>
		</article>
	`
}

const question31 = {
  id: 'se-31',
  title: 'Which the payment you can accept?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Which the payment you can accept?</h1>
			</header>
			<section>
				<p>
					The customer needs to pay for it online. We can accept PayPal,Visa and MasterCard.We can’t accept the gift card.
				</p>
			</section>
		</article>
	`
}

const question32 = {
  id: 'se-32',
  title: 'Can I call you to make an order?',
  parentId: 'root-3',
  richText: `
		<article>
			<header>
				<h1>Can I call you to make an order?</h1>
			</header>
			<section>
				<p>
					We don’t accept order through phone.The customer needs to pay for it online. We can accept PayPal,Visa and MasterCard.We can’t accept the gift card.
				</p>
			</section>
		</article>
	`
}

const question33 = {
  id: 'se-33',
  title: 'Why there are so many one-size products?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Why there are so many one-size products?</h1>
			</header>
			<section>
				<p>
					Usually one-size products design with narrow shoulder and wide hem to show good looking. One-size does not mean it fits everybody but means it has only one size.
				</p>
				<p>
					We sincerely suggest every customer to measure your body figure carefully before ordering. Besides, you can read the size reference in the description and then make a decision.
				</p>
			</section>
		</article>
	`
}
const question34 = {
  id: 'se-34',
  title: 'What does one-size mean?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>What does one-size mean?</h1>
			</header>
			<section>
				<p>
					One size does not mean the item will fit all, However it does mean that the item comes only in one size. In order to meet the satisfaction of every customer, different items will be made in different sizes. The size details will be shown on each product page. Please take the size measurements into consideration before placing an order.
				</p>
			</section>
		</article>
	`
}

const question35 = {
  id: 'se-35',
  title: 'How do I choose the size?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>How do I choose the size?</h1>
			</header>
			<section>
				<p>
					we have the size chart for every item, and please carefully refer to the size chart before buying anyone, and there also will be 1- 3 cm difference.  Our size is Asian size so it may be a little smaller than yours
				</p>
				<p>
				Besides, the items are all in different styles and textures, so there exists differences inevitably. Please give us an understanding 
				</p>
				<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/howdoichoosethesize.png">
			</section>
		</article>
	`
}
const question36 = {
  id: 'se-36',
  title: 'Where are the items made?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Where are the items made?</h1>
			</header>
			<section>
				<p>
					We are from China, we  have the warehouse in US.Products will be sent from one of these warehouses according to the stock availability as well as the principle of proximity.
				</p>
			</section>
		</article>
	`
}

const question37 = {
  id: 'se-37',
  title: 'Where are you located?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Where are you located?</h1>
			</header>
			<section>
				<p>
					We have the warehouse in US.Products will be sent from one of these warehouses according to the stock availability as well as the principle of proximity.
				</p>
			</section>
		</article>
	`
}

const question38 = {
  id: 'se-38',
  title: 'Can I get a difference for a discount item?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Can I get a difference for a discount item?</h1>
			</header>
			<section>
				<p>
					We apologize for this inconvenience, however the price will be changed in different promotion,so we can‘t  refund you about the difference.. ${window.sitename} reserves the right to change the promotion at any time with our sole discretion.
				</p>
			</section>
		</article>
	`
}

const question39 = {
  id: 'se-39',
  title: 'Where can I find your latest products?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Where can I find your latest products?</h1>
			</header>
			<section>
				<p>
					New products are updated every day on our website to cater to the styles of different customers. Find our latest styles by clicking the " What’s new"  on our homepage. 
				</p>
			</section>
		</article>
	`
}

const question40 = {
  id: 'se-40',
  title: 'Will you restock items that have sold out?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Will you restock items that have sold out?</h1>
			</header>
			<section>
				<p>
					If an item is marked as “Sold Out”, we suggest you visit frequently to see if it has been restocked. If the item is still out of stock after a week, it’s most likely to be removed from our inventory.
				</p>
			</section>
		</article>
	`
}

const question41 = {
  id: 'se-41',
  title: 'Do you use animals fur or genuine leather?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Do you use animals fur or genuine leather?</h1>
			</header>
			<section>
				<p>
					Our products are neither real fur nor genuine leather but they are high quality artificial materials.
				</p>
			</section>
		</article>
	`
}

const question42 = {
  id: 'se-42',
  title: 'Why the price for this item goes higher then  I saw before?',
  parentId: 'root-4',
  richText: `
		<article>
			<header>
				<h1>Why the price for this item goes higher then  I saw before?</h1>
			</header>
			<section>
				<p>
					We apologize for this inconvenience, however the price will be changed in different promotion.. ${window.sitename} reserves the right to change the promotion at any time with our sole discretion.
				</p>
			</section>
		</article>
	`
}

const question43 = {
  id: 'se-43',
  title: 'How to change my shipping address?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>How to change my shipping address?</h1>
			</header>
			<section>
				<p>
					If your order is paid successfully, you cannot change it directly on your end.
				</p>
				<p>
					Continue to submit a ticket or contact online-help and we can help you change the shipping address before shipment.
				</p>
				<p>
					If you want to manage your address book for future purchase, sign in your ${window.sitename} account then find "Address Book" to have a detailed check.
				</p>
				<img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/faq/addshipping.png">
			</section>
		</article>
	`
}

const question44 = {
  id: 'se-44',
  title: 'Why is the tracking number not working?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Why is the tracking number not working?</h1>
			</header>
			<section>
				<p>
					When we ship our packages to you there are no further updates from the shipping company due to the fact that your package is in transit. Once it has reached the next sort facility it will update. It may take a couple of days (1-7 days) to see any activity once it has shipped out from our end.
				</p>
			</section>
		</article>
	`
}
const question45 = {
  id: 'se-45',
  title: 'When will my order arrive?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>When will my order arrive?</h1>
			</header>
			<section>
				<p>
					For each shipping method, we need 3-7 business days to prepare the order,Shipment takes approximately 7 to 25 business days to reach destination countries.
				</p>
				<p>
				    Please note: Total Delivery Time = Processing Time + Shipping Time
                </p>
                <p>
                For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a>
                </p>
			</section>
		</article>
	`
}
const question46 = {
  id: 'se-46',
  title: 'Why hasn’t my shipping information been updated?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Why hasn’t my shipping information been updated?</h1>
			</header>
			<section>
				<p>
					After we ship the package to you, the shipping information will be updated after it arrives at the next sorting center which may take a few days. Then you can log in your account and find "My orders" to check the order status and track.
				</p>
				<p>
				    For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a>
                </p>
			</section>
		</article>
	`
}
const question47 = {
  id: 'se-47',
  title: 'Why I am required to pay for the extra charges?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Why I am required to pay for the extra charges?</h1>
			</header>
			<section>
				<p>
					There are different customs and taxes for each country. If you are charged of tariffs, please send us a picture of the receipt, and we will offer you an appropriate compensation.
				</p>
			</section>
		</article>
	`
}
const question48 = {
  id: 'se-48',
  title: 'How come my package shows delivered but I have not received my package?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>How come my package shows delivered but I have not received my package?</h1>
			</header>
			<section>
				<p>
					Packages might be delivered to your mail box or signed by your neighbors. We suggest you check in your mail box and with your neighbors and families first. If you cannot find it, check for your package with the shipping company then. Remember to bring your tracking number! If you still cannot find your package neither, please do not hesitate to contact ${window.sitename} Customer Service.
				</p>
			</section>
		</article>
	`
}
const question49 = {
  id: 'se-49',
  title: 'Why was my order shipped separately?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Why was my order shipped separately?</h1>
			</header>
			<section>
				<p>
					We will send your order as soon as possible. So your order might have shipped separately due to the stock.
				</p>
			</section>
		</article>
	`
}
const question50 = {
  id: 'se-50',
  title: 'Why was my package returned?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Why was my package returned?</h1>
			</header>
			<section>
				<p>
					There are multiple reasons your package might have been returned to us.  
				</p>
				<p>
					 1. Wrong or incomplete address 
				</p>
				<p>
					 2. Invalid phone number 
				</p>
				<p>
					 3. Unable to deliver    
				</p>
				<p>
					 Please contact the shipping company for more information or you may submit a ticket so that we may assist you better. 
				</p>
			</section>
		</article>
	`
}
const question51 = {
  id: 'se-51',
  title: 'Do I need to be at my shipping address when my package is delivered?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Do I need to be at my shipping address when my package is delivered?</h1>
			</header>
			<section>
				<p>
					Sometimes your package requires a signature for it to be delivered. You may contact the shipping company and ask them details about your package with the tracking number we have provided. If you missed the delivery, please contact the shipping company to arrange for them to redeliver or for you to pick up the package.
				</p>
			</section>
		</article>
	`
}
const question52 = {
  id: 'se-52',
  title: 'What should I do when tracking updates show my package was returned?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>What should I do when tracking updates show my package was returned?</h1>
			</header>
			<section>
				<p>
					Please contact the shipping company and remember to provide your tracking number to find out more information. If you still can not find your package, please contact ${window.sitename} customer service as soon as possible by submitting a ticket. We will be more than happy to resolve this issue.
				</p>
			</section>
		</article>
	`
}
const question53 = {
  id: 'se-53',
  title: 'What happens if I am not home when delivery?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>What happens if I am not home when delivery?</h1>
			</header>
			<section>
				<p>
					Signature may be necessary when the package is to be delivered, so it is preferable for you or somebody else to be at home.
				</p>
				<p>
					But if you missed your package, please check with your local shipping company or postal office with the tracking number to pick up your parcel as soon as possible.
                </p>
			</section>
		</article>
	`
}
const question54 = {
  id: 'se-54',
  title: 'Are there any additional fees?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Are there any additional fees?</h1>
			</header>
			<section>
				<p>
					We usually ship with your local post office. There should not be any additional fees when using regular mail. If there are any duties or fees due to customs inspections or any other fees you were charged, please keep the receipt of the payment and contact ${window.sitename} customer service by submitting a ticket.
				</p>
			</section>
		</article>
	`
}
const question55 = {
  id: 'se-55',
  title: 'Why haven’t I received my order?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Why haven’t I received my order?</h1>
			</header>
			<section>
				<p>
					For each shipping method, we need 3-7 business days to prepare the order,Shipment takes approximately 3 to 25 business days to reach destination countries.
				</p>
				<p>Please note: Total Delivery Time = Processing Time + Shipping Time</p>
				<p>For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question56 = {
  id: 'se-56',
  title: 'My order can’t be delivered, what can I do?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>My order can’t be delivered, what can I do?</h1>
			</header>
			<section>
				<p>
					Please contact your local post office or the shipping courier directly asap with your tracking number. If you still cannot find your package, please do not hesitate to contact ${window.sitename} Customer Service.
				</p>
			</section>
		</article>
	`
}
const question57 = {
  id: 'se-57',
  title: 'I am required to pay for the costumes, what can I do?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>I am required to pay for the costumes, what can I do?</h1>
			</header>
			<section>
				<p>
					If you are charged of tariffs, please send us a picture of the receipt, and we will offer you an appropriate compensation.
				</p>
			</section>
		</article>
	`
}
const question58 = {
  id: 'se-58',
  title: 'How long will my order arrive?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>How long will my order arrive?</h1>
			</header>
			<section>
				<p>
					For each shipping method, we need 3-7 business days to prepare the order,Shipment takes approximately 3 to 25 business days to reach destination countries.
				</p>
				<p>Please note: Total Delivery Time = Processing Time + Shipping Time</p>
				<p>For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question59 = {
  id: 'se-59',
  title: 'How much time that I need to wait for my  order to come?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>How much time that I need to wait for my  order to come?</h1>
			</header>
			<section>
				<p>
					For each shipping method, we need 3-7 business days to prepare the order,Shipment takes approximately 3 to 25 business days to reach destination countries.
				</p>
				<p>Please note: Total Delivery Time = Processing Time + Shipping Time</p>
				<p>For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question60 = {
  id: 'se-60',
  title: 'Do you have 2-days delivery?',
  parentId: 'root-5',
  richText: `
		<article>
			<header>
				<h1>Do you have 2-days delivery?</h1>
			</header>
			<section>
			    <p>Sorry, we don’t have 2-days shipping.</p>
				<p>
					For each shipping method, we need 3-7 business days to prepare the order,Shipment takes approximately 3 to 25 business days to reach destination countries.
				</p>
				<p>Please note: Total Delivery Time = Processing Time + Shipping Time</p>
				<p>For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question61 = {
  id: 'se-61',
  title: 'What is your return policy?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What is your return policy?</h1>
			</header>
			<section>
				<p>
					Our Return Policy is as follows:
				</p>
				<p>
					You may return all products within 30 days(from the date you receive the items) of delivery for exchange or refund. The original bag and tag should be intact , not be damaged.
				</p>
				<p>
					For the returned item(s), we will arrange a replacement or issue a refund after we have checked your return tracking number or receipt.
				</p>
				<p>
					Please note the following items cannot be returned or exchanged: Swimsuit, lingerie,bodysuits, swimwear, jewelry, and accessories.
				</p>
				<p>
					We do not accept returned items that were sent back by you directly without checking with us first.
				</p>
				<p>
					Please do not make returns directly to the address on the package received.Only send to the address that our customer service provided.
				</p>
				<p>
					If you wish to return the items to the nearest return address, please contact with us and our customer service will reply to you within 24 hours.
				</p>
				<p>
					Refunds will be issued back to the original form of payment that was used to place your order. Please allow 24 hours with Paypal and 7-15 business days with credit card for your refund to appear.
				</p>
				<p>
					The original shipping fee and insurance are non-refundable.
				</p>
				<p>We do not offer Freight To Collect (FTC) service for the packages returned to us. The returns will be made at your own cost. unless a mistake is made by ${window.sitename}.</p>
			</section>
		</article>
	`
}
const question62 = {
  id: 'se-62',
  title: 'I still haven\'t gotten the refund in card. What is status of my refund?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>I still haven't gotten the refund in card. What is status of my refund?</h1>
			</header>
			<section>
				<p>
					Refund is returned back to your original payment way:
				</p>
				<p>If you have paid by PayPal, the refund will reach your PayPal account within 1-2 working days; if you have paid by credit card, it will take about 7-15 working days for the refund process to be done by your card bank. Please kindly noted that we are unable to control the speed of your card bank.</p>
			    <p>${window.sitename} can't control the processing speed of your card bank. Please ask the card bank for detailed information.</p>
			    <p>We apologize genuinely for the inconvenience caused</p>
			</section>
		</article>
	`
}
const question63 = {
  id: 'se-63',
  title: 'How long does it take for my refund to be processed?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>How long does it take for my refund to be processed?</h1>
			</header>
			<section>
				<p>
					Refund is returned back to your original payment way:
				</p>
				<p>If you have paid by PayPal, the refund will reach your PayPal account within 1-2 working days; if you have paid by credit card, it will take about 7-15 working days for the refund process to be done by your card bank. Please kindly noted that we are unable to control the speed of your card bank.</p>
			</section>
		</article>
	`
}

const question64 = {
  id: 'se-64',
  title: 'How do I return my order?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>How do I return my order?</h1>
			</header>
			<section>
				<p>
					Make sure our team has worked with you on the issue before you return the package. The address on the parcel is not our warehouse address and our team will send return address accordingly.
				</p>
				<p>You can start your return by submitting a support ticket with your return reason, our staff will send you the return address</p>
			</section>
		</article>
	`
}
const question65 = {
  id: 'se-65',
  title: 'Will I get full refund for my return?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Will I get full refund for my return?</h1>
			</header>
			<section>
				<p>
					We will offer a full refund on all items you returned (exclude shipping fee and unreturnable items).
				</p>
			</section>
		</article>
	`
}
const question66 = {
  id: 'se-66',
  title: 'What is the status of my return or exchange?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What is the status of my return or exchange?</h1>
			</header>
			<section>
				<p>
					Make sure our team has worked with you on the issue before you return the package. 
				</p>
				<p>
				You can start your return by submitting a support ticket with your return ,Once your return/exchange has been processed we will reply you.
                </p>
			</section>
		</article>
	`
}
const question67 = {
  id: 'se-67',
  title: 'Which items cannot be returned or refunded?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Which items cannot be returned or refunded?</h1>
			</header>
			<section>
				<p>
					We do not accept returns/exchanges for the following items due to hygienic reasons: Swimsuit, lingerie,bodysuits, swimwear, jewelry, and accessories.
				</p>
			</section>
		</article>
	`
}
const question68 = {
  id: 'se-68',
  title: 'What if I received a defective item?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What if I received a defective item?</h1>
			</header>
			<section>
				<p>
					If you received a defective item, please log into your ${window.sitename} account and submit a ticket within 30 days of delivery. When submitting the ticket, please provide a description of the defected item and a few pictures. Please make sure to submit a ticket before returning anything so we can process the trouble for you.
				</p>
			</section>
		</article>
	`
}
const question69 = {
  id: 'se-69',
  title: 'What if I received a defective/wrong/stained item?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What if I received a defective/wrong/stained item?</h1>
			</header>
			<section>
				<p>
					If you have received a stained, defective item or an item you did not order, please contact Customer Support by submitting a ticket within 30 days of delivery. Please make sure to submit a ticket before returning anything so we can process the trouble for you,When submitting the ticket, please provide a description of the item, SKU number and a few pictures.
				</p>
			</section>
		</article>
	`
}
const question70 = {
  id: 'se-70',
  title: 'Is there a return free label for me to return the order?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Is there a return free label for me to return the order?</h1>
			</header>
			<section>
				<p>
					We don’t have a free return lable to return the order
				</p>
				<p>Make sure our team has worked with you on the issue before you return the package. The address on the parcel is not our warehouse address and our team will send return address accordingly.</p>
				<p>You can start your return by submitting a support ticket with your return reason, our staff will send you the return address</p>
			</section>
		</article>
	`
}
const question71 = {
  id: 'se-71',
  title: 'How do I return an item  that doesn’t fit?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>How do I return an item  that doesn’t fit?</h1>
			</header>
			<section>
				<p>
					Make sure our team has worked with you on the issue before you return the package. 
				</p>
				<p>The address on the parcel is not our warehouse address and our team will send return address accordingly.</p>
			    <p>You can start your return by submitting a support ticket with your return reason, our staff will send you the return address</p>
			</section>
		</article>
	`
}
const question72 = {
  id: 'se-72',
  title: 'I still haven’t received my refund, what is wrong?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>I still haven’t received my refund, what is wrong?</h1>
			</header>
			<section>
				<p>
					refund is returned back to your original payment way:
				</p>
				<p>If you have paid by PayPal, the refund will reach your PayPal account within 1-2 working days; if you have paid by credit card, it will take about 7-15 working days for the refund process to be done by your card bank. Please kindly noted that we are unable to control the speed of your card bank.</p>
				<p>${window.sitename} can't control the processing speed of your card bank. Please ask the card bank for detailed information.</p>
			    <p>We apologize genuinely for the inconvenience caused</p>
			</section>
		</article>
	`
}
const question73 = {
  id: 'se-73',
  title: 'How can I return an item for an  exchange?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>How can I return an item for an  exchange?</h1>
			</header>
			<section>
				<p>
					Make sure our team has worked with you on the issue before you return the package. The address on the parcel is not our warehouse address and our team will send return address accordingly.
				</p>
				<p>You can start your return by submitting a support ticket with your return reason, our staff will send you the return address</p>
			</section>
		</article>
	`
}
const question74 = {
  id: 'se-74',
  title: 'What is the status of my refund?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What is the status of my refund?</h1>
			</header>
			<section>
				<p>
					refund is returned back to your original payment way:
				</p>
				<p>If you have paid by PayPal, the refund will reach your PayPal account within 1-2 working days; if you have paid by credit card, it will take about 7-15 working days for the refund process to be done by your card bank. Please kindly noted that we are unable to control the speed of your card bank.</p>
				<p>${window.sitename} can't control the processing speed of your card bank. Please ask the card bank for detailed information.</p>
			    <p>We apologize genuinely for the inconvenience caused</p>
			</section>
		</article>
	`
}
const question75 = {
  id: 'se-75',
  title: 'Do I need to pay for the shipping fee if I return the items back?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>Do I need to pay for the shipping fee if I return the items back?</h1>
			</header>
			<section>
				<p>
					We do not offer Freight To Collect (FTC) service for the packages returned to us. The returns will be made at your own cost. unless a mistake is made by ${window.sitename}.
				</p>
			</section>
		</article>
	`
}
const question76 = {
  id: 'se-76',
  title: 'What can I do if the item doesn’t fit me?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What can I do if the item doesn’t fit me?</h1>
			</header>
			<section>
				<p>
					If it doesn’t fit, you can submit a support ticket , our staff will solve it for you.
				</p>
			</section>
		</article>
	`
}
const question77 = {
  id: 'se-77',
  title: 'What can I do if the item was damaged?',
  parentId: 'root-6',
  richText: `
		<article>
			<header>
				<h1>What can I do if the item was damaged?</h1>
			</header>
			<section>
				<p>
					You may send a few photos of the label on the wrong package you received and pictures of the defection as reference. The SKU of the item is also needed. Our customer service team will try best to solve your problem.
				</p>
				<p>
				If you return the items without confirming with our customer service first, our staff may not be able to accept the items you returned and the refund request will also not be processed.
                </p>
			</section>
		</article>
	`
}
const question78 = {
  id: 'se-78',
  title: 'Will '+ window.sitename +' save my personal information?',
  parentId: 'root-7',
  richText: `
		<article>
			<header>
				<h1>Will ${window.sitename} save my personal information?</h1>
			</header>
			<section>
				<p>
					We respect your privacy and keep your personal information confidential. 
				</p>
				<p>When you visit our site, the information collected is stored by your browser, such as your name, phone number, postal code, and address. Cookies can be used to recognize your IP address and provide faster access to our site. You can restrict the use of cookies by changing the settings in your browser.</p>
			    <p>Note that this will limit your access to our site.</p>
			</section>
		</article>
	`
}
const question79 = {
  id: 'se-79',
  title: 'Is it safe to order from here?',
  parentId: 'root-7',
  richText: `
		<article>
			<header>
				<h1>Is it safe to order from here?</h1>
			</header>
			<section>
				<p>
				${window.sitename} was founded by people with nearly 10 years in the e-commerce industry. We take your business seriously and, above all, want our customers to be happy. We accept a number of the most-trusted online payment methods available today.
				</p>
			</section>
		</article>
	`
}
const question80 = {
  id: 'se-80',
  title: 'How can I unsubscribe from '+ window.sitename +'?',
  parentId: 'root-7',
  richText: `
		<article>
			<header>
				<h1>How can I unsubscribe from ${window.sitename}?</h1>
			</header>
			<section>
				<p>
					If you do not want to keep up with our latest items and promotions, you may unsubscribe by simply clicking the unsubscribe link at the bottom of every email we send and follow the instructions.
				</p>
			</section>
		</article>
	`
}
const question81 = {
  id: 'se-81',
  title: 'About us ',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>About us </h1>
			</header>
			<section>
				<p>
					${window.sitename} is a unique shopping website with a distinctive tone focusing on women's fashion. We offer high performance-price products including women's clothing, jewelry, beauty & health products, shoes, bags, and more. Our vision is bringing happiness into every woman's life.
				</p>
				<p>Features of ${window.sitename} include, but are not limited to:</p>
				<ul>
				    <li>100,000+ product styles and 500+ daily update styles.We collect information about women's fashion and source relevant products as soon as possible</li>
                    <li>Prices 50-80% cheaper than local.We cooperate with many manufacturers rather than sourcing from middlemen.We purchase in scale so the price is lower than market price.</li>
                    <li>Product recommendations.We recommend popular products to you which you might not be aware of</li>
                    <li>The ability to share your style with friends.Post and share your style to tell your friends how cool you are</li>
                    <li>Secure payment via PayPal or credit card.Sign-up coupons and theme activities</li>
                </ul>
			</section>
		</article>
	`
}
const question82 = {
  id: 'se-82',
  title: 'Where to find '+ window.sitename +'?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Where to find ${window.sitename}?</h1>
			</header>
			<section>
				<p>
					As an online store, you can find ${window.sitename} wherever you can get internet access.
				</p>
				<p>We’re now shipping to most countries worldwide with websites supporting, the United States, Spain, France, Russia, Germany, Italy, Australia and the Middle East. </p>
				<p>If you’d like to know what’s new on ${window.sitename}, simply stay connected with us via our Facebook, Instagram,Youtube, Pinterest,Tumblr !</p>
			</section>
		</article>
	`
}
const question83 = {
  id: 'se-83',
  title: 'Why '+ window.sitename +'?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Why ${window.sitename}?</h1>
			</header>
			<section>
				<ul>
				    <li>Competitive prices;</li>
				    <li>The latest fashion styles;</li>
				    <li>Free shipping and return policy;</li>
				    <li>Exceptional customer service.</li>
                </ul>
                <p>If you signed up for ${window.sitename} using your Facebook ID you may turn off ${window.sitename}'s Facebook privileges using your computer or mobile device.</p>
			    <p>On your computer, visit <a href="http://facebook.com/settings/?tab=applications">http://facebook.com/settings/?tab=applications</a>. Then select the "X" on the ${window.sitename} icon.</p>
			    <p>On your Facebook app, just choose "Account Settings" in the menu. Then choose "Apps" -> "${window.sitename}" -> "Remove ${window.sitename}."</p>
			    <p>Unfortunately there is no option currently available for email-based users who would like to delete their ${window.sitename} account.</p>
			</section>
		</article>
	`
}
const question84 = {
  id: 'se-84',
  title: 'Is the website real?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Is the website real?</h1>
			</header>
			<section>
				<p>
					Yes, it is real.${window.sitename} was founded by people with nearly 10 years in the e-commerce industry. We accept a number of the most-trusted online payment methods available today.
				</p>
			</section>
		</article>
	`
}
const question85 = {
  id: 'se-85',
  title: 'Will it save my card information?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Will it save my card information?</h1>
			</header>
			<section>
				<p>
					We respect your privacy and keep your personal information confidential.And we won’t save your card information, please don’t worry
				</p>
			</section>
		</article>
	`
}
const question86 = {
  id: 'se-86',
  title: 'Where can I find the item that I saved?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Where can I find the item that I saved?</h1>
			</header>
			<section>
				<p>
					Hello,you can find it in your wishlist, please sign in first, then find it under the Me section
				</p>
			</section>
		</article>
	`
}
const question87 = {
  id: 'se-87',
  title: 'How long will I get the 30 credits once the products was shared?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>How long will I get the 30 credits once the products was shared?</h1>
			</header>
			<section>
				<p>
					Hello, after it was shared, it needs 1-2 businees days to send the credtis to your registered email assount.
				</p>
			</section>
		</article>
	`
}
const question88 = {
  id: 'se-88',
  title: 'What is your shipping policy?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>What is your shipping policy?</h1>
			</header>
			<section>
				<p>
					Hello, for each shipping method, we need 3-7 business days to prepare the order,
				</p>
				<p>Shipment takes approximately 3 to 25 business days to reach destination countries.</p>
				<p>Please note: Total Delivery Time = Processing Time + Shipping Time</p>
				<p>For the estimated arrival date, please refer to <a href="http://www.${window.sitename}.com/fs/shipping-policy?isouter=1">http://www.${window.sitename}.com/fs/shipping-policy-pc</a></p>
			</section>
		</article>
	`
}
const question89 = {
  id: 'se-89',
  title: 'Do you do wholesale?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Do you do wholesale?</h1>
			</header>
			<section>
				<p>
					Hello, we have the wholesale policy:http://www.${window.sitename}.com/fs/wholesale-program-pc you can have a look
				</p>
			</section>
		</article>
	`
}
const question90 = {
  id: 'se-90',
  title: 'How can I cooperate with you?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>How can I cooperate with you?</h1>
			</header>
			<section>
				<p>
					Hello,if you want to have a collaboration with us , please contact this email: affiliates@${window.sitename}.com   Our colleague will answer for you.
				</p>
			</section>
		</article>
	`
}
const question91 = {
  id: 'se-91',
  title: 'How can I choose the shipping method?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>How can I choose the shipping method?</h1>
			</header>
			<section>
				<p>
					Hello, After you add the shipping address, you can choose the shipping method you want before check out
				</p>
			</section>
		</article>
	`
}
const question92 = {
  id: 'se-92',
  title: 'Do you have stores?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Do you have stores?</h1>
			</header>
			<section>
				<p>
					Hello, we just do shopping online, we don’t have physical store
				</p>
			</section>
		</article>
	`
}
const question93 = {
  id: 'se-93',
  title: 'Can  you ship to APO?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>Can  you ship to APO?</h1>
			</header>
			<section>
				<p>
					Hello, we can ship to APO, but it just can be shipped by standard shipping
				</p>
			</section>
		</article>
	`
}
const question94 = {
  id: 'se-94',
  title: 'How can I change the currency?',
  parentId: 'root-8',
  richText: `
		<article>
			<header>
				<h1>How can I change the currency?</h1>
			</header>
			<section>
				<p>
					Hello, you can log in our website first, then you can change it in setting
				</p>
			</section>
		</article>
	`
}

const secondaries = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
  question11,
  question12,
  question13,
  question14,
  question15,
  question16,
  question17,
  question18,
  question19,
  question20,
  question21,
  question22,
  question23,
  question24,
  question25,
  question26,
  question27,
  question28,
  question29,
  question30,
  question31,
  question32,
  question33,
  question34,
  question35,
  question36,
  question37,
  question38,
  question39,
  question40,
  question41,
  question42,
  question43,
  question44,
  question45,
  question46,
  question47,
  question48,
  question49,
  question50,
  question51,
  question52,
  question53,
  question54,
  question55,
  question56,
  question57,
  question58,
  question59,
  question60,
  question61,
  question62,
  question63,
  question64,
  question65,
  question66,
  question67,
  question68,
  question69,
  question70,
  question71,
  question72,
  question73,
  question74,
  question75,
  question76,
  question77,
  question78,
  question79,
  question80,
  question81,
  question82,
  question83,
  question84,
  question85,
  question86,
  question87,
  question88,
  question89,
  question90,
  question91,
  question92,
  question93,
  question94

]

const questions = [
  {
    id: 'root-1',
    title: 'Account',
    questions: [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7
    ]
  },
  {
    id: 'root-2',
    title: 'Order',
    questions: [
      question8,
      question9,
      question10,
      question11,
      question12,
      question13,
      question14,
      question15,
      question16,
      question17,
      question18,
      question19,
      question20
    ]
  },
  {
    id: 'root-3',
    title: 'Payment',
    questions: [
      question21,
      question22,
      question23,
      question24,
      question25,
      question26,
      question27,
      question28,
      question29,
      question30,
      question31,
      question32
    ]
  },
  {
    id: 'root-4',
    title: 'Products',
    questions: [
      question33,
      question34,
      question35,
      question36,
      question37,
      question38,
      question39,
      question40,
      question41,
      question42
    ]
  },
  {
    id: 'root-5',
    title: 'Delivery',
    questions: [
      question43,
      question44,
      question45,
      question46,
      question47,
      question48,
      question49,
      question50,
      question51,
      question52,
      question53,
      question54,
      question55,
      question56,
      question57,
      question58,
      question59,
      question60
    ]
  },
  {
    id: 'root-6',
    title: 'Return',
    questions: [
      question61,
      question62,
      question63,
      question64,
      question65,
      question66,
      question67,
      question68,
      question69,
      question70,
      question71,
      question72,
      question73,
      question74,
      question75,
      question76,
      question77
    ]
  },
  {
    id: 'root-7',
    title: 'Security and privacy',
    questions: [
      question78,
      question79,
      question80
    ]
  },
  {
    id: 'root-8',
    title: 'About '+ window.sitename +'',
    questions: [
      question81,
      question82,
      question83,
      question84,
      question85,
      question86,
      question87,
      question88,
      question89,
      question90,
      question91,
      question92,
      question93,
      question94
    ]
  }
]

export default {
  questions,
  secondaries
}
