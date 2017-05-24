* Make sure you have a redis server running: download redis using homebrew: brew install redis
* Start the redis server: redis-server /usr/local/etc/redis.conf
* To run the code, clone the git repo, cd into the folder, and run npm install. Then, run npm start.

Steps to start exchanging messages:

* Open two separate tabs, one with a location hash of #init. For example, if the port being used is 3000, open one tab as http://localhost:3000/#init, and one as http://localhost:3000.
* The tab with the location hash should have a button that says create channel. Click that button, and wait for an alert dialog to pop up (this might take a while).
* In the tab without the init hash, paste the generated code in the input field with the join channel placeholder text.
* Click connect in the tab without the init hash. Then, click connect in the tab with the init hash (order shouldn't actually matter). You should be able to send messages and see them in the other tab now. 
