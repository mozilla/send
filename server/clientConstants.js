const config = require('./config');

module.exports = {
  LIMITS: {
    ANON: {
      MAX_FILE_SIZE: config.anon_max_file_size,
      MAX_DOWNLOADS: config.anon_max_downloads,
      MAX_EXPIRE_SECONDS: config.anon_max_expire_seconds
    },
    MAX_FILE_SIZE: config.max_file_size,
    MAX_DOWNLOADS: config.max_downloads,
    MAX_EXPIRE_SECONDS: config.max_expire_seconds,
    MAX_FILES_PER_ARCHIVE: config.max_files_per_archive,
    MAX_ARCHIVES_PER_USER: config.max_archives_per_user,
    PASSWORD_REQUIRED: config.password_required,
    PASSWORD_REQUIREMENTS_LIST: config.password_requirements_list
  },
  DEFAULTS: {
    DOWNLOAD_COUNTS: config.download_counts,
    EXPIRE_TIMES_SECONDS: config.expire_times_seconds,
    EXPIRE_SECONDS: config.default_expire_seconds
  }
};
