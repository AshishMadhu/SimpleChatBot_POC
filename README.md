# Simple chatbot POC (proof of concept)


## Dependencies
- Django
- DjangoRestFramework
- Django channels
- React 
- Redis

## Things you can do (initially)

- Create Message, add choices to mesage, then add response.
- Load the chatbot in your site by simply coping and pasing

## How to use
- Navigate to `localhost:8000`
- You need an account to make ChatBot
- Click Create

<p align="center"><image src="./pics/home.jpg" alt="homescreen"/></p>

- Create Message and bind some choices 
- Remember response are given according to the choices
- Then create response with the created messages and choices(you can only create 1 response to a choice)

<p align="center"><image src="./pics/createview.jpg" alt="createview"/></p>

- Then click <b>ShowChatbots</b>
- Click on the gray `div` to copy the code

<p align="center"><image src="./pics/woking_gif.gif" alt="chatbotlist"></p>

- Paste the code inside `html` page of your site
- Good to go..


## How to run
- Create a virtual environment `pipenv shell`
- Install packages `pipenv install`
- Start the Redis server
- `py manage.py runserver` starts the server

## Future updates
- ChatBot preview
- Features such as ability to edit created Messages, Response, & Choices
- More Flexible interface (easy to use)