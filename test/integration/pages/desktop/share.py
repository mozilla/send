from selenium.webdriver.common.by import By

from pages.desktop.base import Base


class Share(Base):
    """SHare page object model."""

    _share_page_locator = (By.CLASS_NAME, 'sharePage')
    _share_url_locator = (By.ID, 'fileUrl')

    def wait_for_page_to_load(self):
        self.wait.until(
            lambda _: self.find_element(
                *self._share_page_locator).is_displayed())
        return self

    @property
    def file_url(self):
        """File uploaded URL."""
        return self.find_element(
            *self._share_url_locator).get_property('value')
