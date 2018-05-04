# Integration Tests for [Firefox Send](https://send.firefox.com/).
## How to run the tests locally
### Clone the repository

If you have cloned this project already then you can skip this, otherwise you'll
need to clone this repo using Git. If you do not know how to clone a GitHub
repository, check out this [help page][git-clone] from GitHub.

If you think you would like to contribute to the tests by writing or maintaining
them in the future, it would be a good idea to create a fork of this repository
first, and then clone that. GitHub also has great instructions for
[forking a repository][git-fork].

### App Setup

Please view the README at the root directory of the project.

### Run the tests

Included in the docker-compose file is an image containing Firefox Nightly.
[tox][Tox] is our test environment manager and [pytest][pytest] is the test runner.

To run the tests, execute the commands below:
```sh
npm run build
npm run test-integration
```

### Adding a test

The tests are written in Python using a POM, or Page Object Model. The plugin we use for this is called [pypom][pypom]. Please read the documentation there for good examples on how to use the Page Object Model when writing tests.

The pytest plugin that we use for running tests has a number of advanced command line options available too. The full documentation for the plugin can be found [here][pytest-selenium].

### Watching a test run (within the docker container)

The tests are run on a live version of Firefox, but they are run headless. To access the container where the tests are run to view them follow these steps:

1. Make sure all of the containers are running:
```sh
docker-compose ps
```
If not start them detached:
```sh
docker-compose up -d
```

2. Open your favorite VNC viewer and type in `localhost:5900`.
3. The password is ```secret```.
4. The viewer should open a window with a Ubuntu logo. If that happens you are connected to the ```selenium-firefox``` image and if you start the test, you should see a Firefox window open and the tests running.

### Debugging a failure

Whether a test passes or fails will result in a HTML report being created. This report will have detailed information of the test run and if a test does fail, it will provide geckodriver logs, terminal logs, as well as a screenshot of the browser when the test failed. We use a pytest plugin called [pytest-html][pytest-html] to create this report. The report can be found at ```coverage/send-test.html```. It should be viewed within a browser.

[flake8]: http://flake8.pycqa.org/en/latest/
[git-clone]: https://help.github.com/articles/cloning-a-repository/
[git-fork]: https://help.github.com/articles/fork-a-repo/
[geckodriver]: https://github.com/mozilla/geckodriver/releases/tag/v0.19.1
[pypom]: http://pypom.readthedocs.io/en/latest/
[pytest]: https://docs.pytest.org/en/latest/
[pytest-html]: https://github.com/pytest-dev/pytest-html
[pytest-selenium]: http://pytest-selenium.readthedocs.org/
[Selenium]: http://selenium-python.readthedocs.io/index.html
[selenium-api]: http://selenium-python.readthedocs.io/locating-elements.html
[Tox]: http://tox.readthedocs.io/
