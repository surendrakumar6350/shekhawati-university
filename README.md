
# Shekhawati Hub Next.js Project
Easily find college students near you by using our convenient search tool to connect with individuals in your area based on location, pincode, and more.


## Run Locally

1. Clone the repository.
2. Navigate to the project folder.
3. Install the required dependencies:

```bash
  git clone https://github.com/surendrakumar6350/shekhawati-university.git
```

Go to the project directory

```bash
  cd shekhawati-university
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables
To run this project, you will need to add the following environment variables to your .env file


`ADMIN_EMAIL`="`your-email@email.com`"\
`WHATSAPP_BOT_API`="`http://localhost:4000/api/send-message`"\
`SEND_OTP_BOT_API`="`http://localhost:4000/api/new-otp`"\
`SIGNUP_KEY`="`Y2hlbm1vcmUgY89429tcGxldf4gsejUY`"\
`DB`="`mongodb+srv://user-name:password@mongodb.net/PG_FORMS`"\
`REDIS_URI`="`redis://default:password@ip:17957`"






## Starting the WhatsApp Bot
The WhatsApp bot service must be running for the website’s OTP functionality to work. To start the bot:

```bash
  cd services/bot
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

When you start the bot, it will prompt you to scan a QR code. Scan the QR code with WhatsApp to connect the bot.


## Environment Variables
Create an .env file in the services/bot directory (or where the bot is located) with the following variables:

`PORT`="`4000`"\
`DB_URI`="`mongodb+srv://user-name:password@mongodb.net/Whatsappdevelopment`"\
`DB`="`mongodb+srv://user-name:password@mongodb.net/PG_FORMS`"\
`CLIENT_ID`="`Development`"\
`SIGNUP_KEY`="`Y2hlbm1vcmUgY89429tcGxldf4gsejUY`"



## Tech Stack

**Client:** React, Redux, Nextjs, TypeScript, TailwindCSS

**Server:** Node


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/surendra6350/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/dev_surendra_)


## Authors
- [@Surendra Kumar](https://github.com/surendrakumar6350)


## Feedback
If you have any feedback, please reach out to us at admin@surendra-dev.in.net


