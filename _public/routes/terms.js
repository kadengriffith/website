// Author: Kaden Griffith

'use strict';

const $ = require('kbrew_hypertxt'),
  Name = 'terms',
  Template = 'templates/index-white.html',
  Generator = require('../objects/Generator');

const File = $.getElement({
  class: 'grid',
  contains: $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Terms of Use'
  }) + $.getElement({
    class: 'bold text',
    contains: 'Effective: 6 September 2018'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'These Terms of Use ("Terms") are a contract between you ("Client", "you", "your") and Byte Wave, LLC ("Bytewave"). They govern your use of Bytewave’s sites, services, mobile apps, products, and content ("Services").'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'By using Bytewave software, you agree to these Terms. If you don’t agree to any of the Terms, you can’t use this site or any entity or Service associated with Bytewave.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'We can change these Terms at any time. A record of all changes to our Terms are available for review on this site, listed below. If a change is material, we’ll let you know before they take effect. By using Bytewave software on or after the effective date, you agree to the new Terms. If you don’t agree to them, you should refrain from accessing this software before they take effect, otherwise your use of the site and content will be subject to the new Terms.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'Bytewave offers no rights to users for redistribution of content found on this site. All work found on this site is available for free.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'You’re responsible for the content you post (e.g. comments). This means you assume all risks related to it, including someone else’s reliance on its accuracy, or claims relating to intellectual property or other legal rights.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'You’re welcome to post or link content on Bytewave software that you’ve published elsewhere, as long as you have the rights you need to do so. By posting content to this site, you represent that doing so doesn’t conflict with any other agreement you’ve made.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'We can remove any content you post for any reason.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'We reserve all rights in this site’s look and feel. Some parts of Bytewave software are licensed under third-party open source licenses. As for other parts of this site, you may not copy or adapt any portion of our code or visual design elements (including logos, and graphics) without express written permission from Bytewave unless otherwise permitted by law.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'You may not do, or attempt to do, the following: (1) access or tamper with non-public areas of the Services, our computer systems, or the systems of our technical providers; (2) access or search the Services by any means other than the currently available, published interfaces (e.g. APIs) that we provide; (3) forge any TCP/IP packet header or any part of the header information in any email or posting, or in any way use the Services to send altered, deceptive, or false source-identifying information; or (4) interfere with, or disrupt, the access of any user, host, or network, including sending a virus, overloading, flooding, spamming, mail-bombing the Services, or by scripting the creation of content or accounts in such a manner as to interfere with or create an undue burden on the Services.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'Crawling the Services is allowed, but scraping or copying the Services content is prohibited.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'We may change, terminate, or restrict access to any aspect of Service, at any time, without notice.'
  }) + $.ln() + $.getElement({
    class: 'text bold',
    contains: 'Bytewave software is intended only for people 13 years old and over.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'If you find a security vulnerability within this codebase, tell us via the ' + $.getElement({
      tag: 'a',
      "aria-label": 'Email us',
      alt: 'Email us',
      href: 'mailto:info@bytewave-apps.com',
      class: 'link inline',
      contains: 'info@bytewave-apps.com'
    }) + ' email address.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'By using the Services, you agree to let Bytewave collect and use information as detailed in our Privacy Policy. If you’re outside the United States, you consent to letting Bytewave transfer, store, and process your information (including your personal information and content) in and out of the United States.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'By using this site, you agree to follow these Rules and Policies. If you don’t, we may remove content, or suspend your access to the site.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Disclaimer:'
    }) + 'Bytewave provides the Services to you as is. You may need to provide Bytewave with sensative materials (e.g. passwords, emails, phone numbers) in order to provide Services. You use them at your own risk and discretion. That means they don’t come with any warranty. None express, none implied. No implied warranty of merchantability, fitness for a particular purpose, availability, security, title or non-infringement.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Fees:'
    }) + 'Clients of Bytewave will pay all fees specified in issued invoices. Fees are based on Services provided by Bytewave. Fees are non-cancelable and fees paid are non-refundable. Subscriptions are required only for ongoing application development Services.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Invoicing and Payment:'
    }) + 'You will provide Bytewave with valid and updated credit card information. If an alternative method of payment is offered, the Client must ensure the payment method is valid. You authorize Bytewave to charge your method of payment for all Services listed in an issued Bytewave invoice as well as any renewal or subscription fees. Subscription renewal dates will take place monthly from the start day of a Subscription. You are responsible for providing complete and accurate billing and contact information to Bytewave and notifying Bytewave of any changes to your information.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Overdue Charges:'
    }) + 'If any invoiced amount is not recieved by Bytewave by the due date, Bytewave will limit the access to your Services.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Suspension of Services:'
    }) + 'If any amount owed by you under this agreement for our Services is more than 30 days overdue, you will be subject to suspension of Services. Suspension is not limited to cancelation and restriction of your access to any project created with Bytewave. Bytewave may alter your created data, delete your data, and retract any online access Bytewave controls. You will be notified at least 10 days prior to any occurring action on your account.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Payment Disputes:'
    }) + 'We will not exercise our rights under the Suspension of Services section above if your are disputing the applicable charges reasonably and in good faith and are cooperating diligently to resolve the dispute.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Subscription Terms:'
    }) + 'Bytwave offers subscription plans (each, a "Subscription") to its Services. Each Subscription may record any data of user interactions in order to provide you with better Services. You may select a Subscription as a part of your registration or agreement for the Services. Each Subscription period will be based on the Subscription period chosen/sold (e.g. monthly, quarterly, yearly).'
  }) + $.getElement({
    class: 'text',
    contains: 'At the end of your current subscription period, your Subscription will automatically renew for a subscription period equal to your prior subscription period unless you provide Bytewave with email notice if you intend to cancel your plan at least 30 days prior to the end of your then-current Subscription period. Refunds will be considered upon request to Bytewave. Your Subscription amount is also subject to change. If any changes to your Subscription occur you will be notified via your provided email at least 30 days before action occurs. Any aforementioned notice, Client request, or Client inquiry will be sent to ' + $.getElement({
      tag: 'a',
      "aria-label": 'Email us',
      alt: 'Email us',
      href: 'mailto:info@bytewave-apps.com',
      class: 'link inline',
      contains: 'info@bytewave-apps.com'
    }) + '.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Subscription Cancelation ("cancelation"):'
    }) + 'If you request to cancel a Subscription, you must contact Bytewave. You will still be responsible for paying any outstanding charges including Subscription payments described in Fees. All Services will be deactivated upon cancelation. Your created files and projects will remian as a feature of return to Service and may never be deleted. Bytewave owns the assets used in Service, however you retain all ownership of brand related assets (e.g. provided logos, slogans) and any asset can and will be deleted upon request by Bytewave unless instructed otherwise by any overseeing legal authority. Any association of Bytewave with your personal or business project (online presence) may be redacted to the fullest extent possible if necessary by Bytewave. Bytewave reserves the right to cancel any Subscription or Service if notice is provided to the Client 60 days prior to the last Subscription billing cycle start. Cancelation will result in the disconnection of hosting Services including. Any domain names or external subscriptions purchased by Bytewave for the use of providing Client with Service are owned by Bytewave and may be canceled, sold, unrenewed, and held by Bytewave. Subscriptions or assets purchased on other services (e.g. Google Suite subscription) can be canceled by Bytewave acting as Client overseer and Service provider. Contact us with any questions through the information found on ' + $.getElement({
      tag: 'a',
      "aria-label": 'Contact',
      alt: 'Email us',
      href: 'https://bytewave-apps.com/contact',
      class: 'link inline',
      contains: 'https://bytewave-apps.com/contact'
    }) + '.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold',
      contains: 'Limitations of Liability:'
    }) + ' Bytewave or its associated clients won’t be liable to you for any damages that arise from your using the Services. This includes if the Services are hacked or unavailable. This includes all types of damages (indirect, incidental, consequential, special or exemplary). And it includes all kinds of legal claims, such as breach of contract, breach of warranty, tort, or any other loss.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'If Bytewave doesn’t exercise a particular right under these Terms, that doesn’t waive it or allow you to assume your actions are acceptable. Any questions regarding use should be directed to ' + $.getElement({
      tag: 'a',
      "aria-label": 'Email us',
      alt: 'Email us',
      href: 'mailto:info@bytewave-apps.com',
      class: 'link inline',
      contains: 'info@bytewave-apps.com'
    }) + '.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'If any provision of these terms is found invalid by a court of competent jurisdiction, you agree that the court should try to give effect to the parties’ intentions as reflected in the provision and that other provisions of the Terms will remain in full effect.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: $.getElement({
      class: 'bold inline',
      contains: 'Choice of Law and Jurisdiction:'
    }) + ' These Terms are governed by Wyoming state law, without reference to its conflict of laws provisions. You agree that any suit arising from the Services must take place in a court located in Cheyenne, Wyoming.'
  }) + $.ln() + $.getElement({
    class: 'text',
    contains: 'These Terms (including any document incorporated by reference into them) are the whole agreement between Bytewave and you concerning the Services.'
  }) + $.getElement({
    tag: 'h1',
    class: 'title',
    contains: 'Questions?'
  }) + $.getElement({
    tag: 'a',
    "aria-label": 'Contact',
    href: '/contact',
    alt: 'Contact',
    class: 'btn',
    contains: 'Contact Us'
  })
});

new Generator(Template, Name).build(File);