## Installation and Running

Download as zip or pull project

```
cd <project directory>
npm install
node app.js
```
In a browser, navigate to
```
http://localhost:5000/followers/<username>
```
I tested with trueadm, the owner of React repo on github as he has plenty of followers. The API will randomly pick followers so if any level of the followers dont have followers, it wont have any to display.The packages used to help make the API are `express` and `request-promise`, both I've use frequently in the past. I wanted to do more testing and the bonus aspects but I was limited by the Github API rate limit so I couldn't get to them without waiting around hours. If you request someone who doesn't exist or no followers, there will be no data.

Note: this is an unregistered application so you can only make 50 calls an hour before getting locked out of it and having to wait an hour.
