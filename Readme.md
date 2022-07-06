<h1 align="center"><a href="https://e-commerce-labs.vercel.app">Marketplace App</a></h1>

## _Overview_

<details>
  <summary>Click to view!</summary>
  <img src="marketplace.gif">
  <a href="https://www.youtube.com/watch?v=zFXTqD7GrNY">Ver demo completa</a>
</details>

## _Built With_

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node](https://nodejs.org/es/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [Cloudinary](https://cloudinary.com/)
- [Firebase](https://firebase.google.com/)
- [JSON Web Token](https://jwt.io/)
- [Mercadopago](https://www.mercadopago.com.co/)

## _Description_

Final project Henry Bootcamp.

Marketplace functions:

- Sing up and Sing In.
- Sing In by Google.
- Search, filter and order products.
- Ask questions about a product.
- Products owners can answer the questions.
- Add products to the shoping cart and purshase it.
- Notifications in the APP and by email.
- Buyers can contact sellers thought a chatbot when buy a product.
- Buyers can score products they buy.
- See my publications.
- See my purchases.
- See my sales.
- Edit profile, publications and sales state.
- Users can recover their password.

## _How To Use_

````bash
# Clone this repository
$ git clone https://github.com/jruizsilva/e-commerce-labs

 1. Install the database system Postgresql. You can download it here https://www.postgresql.org/download/
 2. Clone the repository https://github.com/jruizsilva/e-commerce-labs
 3. On folder `api` create a file: `.env` with the folow information:
    ```
    LOCAL_DB_HOST=localhost
    LOCAL_DB_NAME=ecommerce
    LOCAL_DB_PORT=5432
    LOCAL_DB_USER=yourPostgresUser
    LOCAL_DB_PASSWORD=yourPostgresPassword
    CLOUDINARY_CLOUD_NAME=yourCloudinaryCloudName
    CLOUDINARY_API_KEY=yourCloudinaryApiKey
    CLOUDINARY_API_SECRET=yourCloudinaryApiSecret
    CLOUDINARY_PRESET=yourCloudinaryPreset
    ACCESS_TOKEN=yourMercadopagoAccessToken
    EMAIL_SENDER=anGmailAccount
    EMAIL_PASSWORD_SENDER=anAppGmailPassword
    ```
    Replace all the credentials from `Local_DB_USER` with your own credentials.
4. On folder `client` create a file: `.env` with the folow information:
    ```
    REACT_APP_CLOUDINARY_NAME=yourCloudinaryCloudName
    REACT_APP_MP_PUBLIC_KEY=yourMercadopagoAccessToken
    ```
    Replace all the credentials by your own credentials.
 5. You must create a database call `ecommerce` on postgresql. YOu can follow this tutorial to know how https://apuntes-snicoper.readthedocs.io/es/latest/programacion/postgresql/comandos_consola_psql.html
 6. Once you finish step 5, open a terminal window, move to <strong>'api'</strong> folder, run ```npm i``` or ```npm install``` in order to install the dependencies. Then run, ```npm start``` to start the Back-end.
 7. Repeat step 6 on a new terminwl window, but located on <strong>'client'</strong> folder.
 8. The APP should start running on <em>localhost:3000</em> in your browser.
````
