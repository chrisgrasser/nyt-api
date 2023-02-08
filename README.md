# Overview

This web page displays cards containing news stories from the New York Times. The stories are retrieved using the New York Times API by way of Javascript fetch() calls.

To use this application, you'll need to get an API key of your own which is detailed below.

## Getting an API Key

You can get your own API key by creating an account on the [New York Times Dev Portal](https://developer.nytimes.com/get-started). This application uses the Top Stories API, so that's the one you will need to select.

The API key that you generate will go on line 104 of the nyt.js file in the js folder wehre it says 'YOUR_API_KEY_HERE'. The key should remain within single quotes.