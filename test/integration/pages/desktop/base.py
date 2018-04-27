from pypom import Page, Region
from selenium.webdriver.common.by import By


class Base(Page):
    """Base object model."""

    _url = '{base_url}'
    _send_logo_locator = (By.CLASS_NAME, 'logo')

    def __init__(self, selenium, base_url, locale='en-US', **kwargs):
        super(Base, self).__init__(
            selenium, base_url, locale=locale, timeout=20, **kwargs)

    def wait_for_page_to_load(self):
        self.wait.until(
            lambda _: self.find_element(
                *self._send_logo_locator).is_displayed())
        return self

    @property
    def footer(self):
        return self.Footer(self)

    class Footer(Region):
        _root_element = (By.CLASS_NAME, 'footer')
        _legal_links = (By.CLASS_NAME, 'legalSection__link')

        @property
        def links(self):
            return [self.Links(self, el) for el in self.find_elements(
                    *self._legal_links)]

        class Links(Region):

            @property
            def name(self):
                return self.root.text.split()[0]

            def click(self):
                self.root.click()
