var translator = require('google-translator');

/*
Translate 'Hello'
from	:	English
to		:	French
*/

translator('en', 'fr', "Hello", response => {
    console.log(JSON.stringify(response));
});