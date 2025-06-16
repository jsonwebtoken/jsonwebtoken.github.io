"use client";

import {
  DEFAULT_LANGUAGE_CODE,
  LANGUAGE_CODES,
} from "@/features/localization/localization.config";

class _UiLocalizationService {
  private _language = DEFAULT_LANGUAGE_CODE;

  get language() {
    return this._language;
  }

  init(language: string) {
    if (this.isSupportedLanguage(language)) {
      this._language = language;
    }
  }

  isSupportedLanguage(language: string) {
    return LANGUAGE_CODES.includes(language);
  }
}

export const UiLocalizationService = new _UiLocalizationService();
