### npm start and listen port 3000

mongodb, JWT, login/ logout system
shijing Liu 2020-11-5

/signup get signup page
/login get login page

/signup post create a new user in DB

-- hash password in Schema.pre and save user and password to DB.
-- Instantly log the user in ( create a jwt for them).

/login post authenticate a current user
-- after login, create a jwt for them.

-- If user cannot login or register successfully, he cannot go to smoothies page to check smoothies list. (router was protected by auth Middleware of jwt)

/logout get log a user out

![](2020-11-08-11-14-59.png)
![](2020-11-08-11-16-21.png)
![](2020-11-08-11-20-20.png)
![](2020-11-08-11-20-56.png)
![](2020-11-08-11-21-26.png)
![](2020-11-08-11-21-52.png)
![](2020-11-08-11-22-21.png)
