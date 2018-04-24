from pypom import Page
from selenium.webdriver.common.by import By


class Base(Page):

    _url = '{base_url}'
    _send_logo_locator = (By.CLASS_NAME, 'logo')

    def __init__(self, selenium, base_url, locale='en-US', **kwargs):
        super(Base, self).__init__(
            selenium, base_url, locale=locale, timeout=10, **kwargs)

    def wait_for_page_to_load(self):
        self.wait.until(
            lambda _: self.find_element(
                *self._send_logo_locator).is_displayed())
        return self
