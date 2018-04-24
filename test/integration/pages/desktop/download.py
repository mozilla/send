from selenium.webdriver.common.by import By

from pages.desktop.base import Base


class Download(Base):
    """Download page object model."""

    _download_button_locator = (By.CLASS_NAME, 'btn--download')

    def wait_for_page_to_load(self):
        self.wait.until(lambda _: self.download_btn.is_displayed())

    @property
    def download_btn(self):
        """Download button."""
        return self.find_element(*self._download_button_locator)
