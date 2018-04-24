from selenium.webdriver.common.by import By

from pages.desktop.base import Base


class Home(Base):
    """Firefox Send Home page object model."""

    _upload_area_locator = (By.ID, 'file-upload')
    _upload_button_locator = (By.CLASS_NAME, 'btn--file')

    @property
    def upload_btn(self):
        """Upload button."""
        return self.find_element(*self._upload_button_locator)

    def upload_area(self, path, cancel=False):
        """Area that allows for drag and drop uploading.

        Returns Progress Object.
        """
        self.find_element(*self._upload_area_locator).send_keys(path)
        from pages.desktop.progress import Progress
        return Progress(
            self.selenium, self.base_url).wait_for_page_to_load(
                                          cancel_after_load=cancel)
