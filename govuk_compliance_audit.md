# GOV.UK Design System Compliance Audit
## Fix The Budget – Interactive Budget Simulator

**Date:** 22 January 2026  
**Auditor:** Product Owner, Digital Services – HM Treasury  
**Version:** 0.1 (Alpha)

---

## Executive Summary

This audit evaluates the GOV.UK-styled version of the "Fix The Budget" simulator against the [GOV.UK Design System](https://design-system.service.gov.uk/) standards. The review covers component usage, accessibility (WCAG 2.2 AA), typography, colours, and overall user experience.

> [!IMPORTANT]
> **Decision: CONDITIONAL SIGN-OFF**
> 
> The service is approved for Alpha release with identified remediation items to be addressed before Beta.

---

## Audit Findings

### ✅ Compliant Items

| Component | Status | Notes |
|-----------|--------|-------|
| **Page Structure** | ✅ Pass | Correct use of `govuk-width-container`, `govuk-main-wrapper` |
| **Phase Banner** | ✅ Pass | Correctly displays "alpha" tag with feedback prompt |
| **Typography** | ✅ Pass | Uses `govuk-heading-xl`, `govuk-heading-l`, `govuk-body-l` correctly |
| **Grid System** | ✅ Pass | Two-thirds/one-half layouts used appropriately |
| **Footer** | ✅ Pass | OGL licence and Crown copyright present |
| **Accordion** | ⚠️ Partial | Uses `govuk-accordion` classes but requires JavaScript initialisation |
| **Hint Text** | ✅ Pass | Descriptive hints provided for all form controls |
| **Inset Text** | ✅ Pass | Warning about economic instability styled correctly |
| **Button Styling** | ✅ Pass | Uses `govuk-button govuk-button--secondary` |

---

### ⚠️ Issues Requiring Remediation

#### 1. Header Logo Implementation
**Severity:** Medium  
**Issue:** Using `govuk-crest.svg` image instead of the standard GOV.UK logotype  
**Standard:** The GOV.UK header should use the Tudor Crown SVG inline, not an external image  
**Fix:** Use the official `govuk-header__logotype-crown` SVG path or reference the rebrand assets

#### 2. Range Input (Slider) Not Standard
**Severity:** Low  
**Issue:** `<input type="range">` is not a standard GOV.UK component  
**Mitigation:** Custom styling applied via `govuk-range-input` class is acceptable for Alpha  
**Note:** Consider replacing with text inputs + stepper buttons for better accessibility

#### 3. Inline Styles
**Severity:** Low  
**Issue:** Multiple inline `style={{}}` attributes in header component (lines 82-106)  
**Standard:** GOV.UK recommends using CSS classes, not inline styles  
**Fix:** Move styles to `govuk-overrides.css`

#### 4. Tailwind CSS Class Mixing
**Severity:** Medium  
**Issue:** Mixing Tailwind classes (`text-red-700`, `text-green-700`, `font-mono`, `flex`) with GOV.UK classes  
**Standard:** Should use only GOV.UK utility classes (`govuk-!-margin-top-6`, etc.)  
**Fix:** Replace Tailwind utilities with GOV.UK equivalents or custom CSS

#### 5. Colour Contrast for Deficit/Surplus
**Severity:** High (WCAG)  
**Issue:** Using `text-red-700` and `text-green-700` which may not meet 4.5:1 contrast ratio  
**Standard:** Must meet WCAG 2.2 AA Level  
**Fix:** Use GOV.UK semantic colours: `govuk-error-colour` (#d4351c) with white text

#### 6. Missing Skip Link
**Severity:** Medium (A11y)  
**Issue:** No skip link to main content  
**Standard:** Required for keyboard navigation  
**Fix:** Add `<a href="#main-content" class="govuk-skip-link">Skip to main content</a>`

#### 7. Accordion JavaScript Not Initialised
**Severity:** Medium  
**Issue:** Accordion `data-module="govuk-accordion"` requires GOV.UK Frontend JS  
**Current State:** CSS-only accordion may not function correctly  
**Fix:** Ensure `govuk-frontend.min.js` is loaded and `initAll()` is called

#### 8. Custom Sticky Footer
**Severity:** Low  
**Issue:** `.govuk-sticky-footer` is not a standard GOV.UK component  
**Mitigation:** Acceptable for simulator functionality, clearly custom

---

### 🔧 Technical Debt

1. **Dynamic CSS Injection:** Loading stylesheets via JavaScript `document.head.appendChild()` may cause FOUC (Flash of Unstyled Content)
2. **Missing `aria-describedby`** on Revenue sliders (only Spending sliders have it)
3. **`useRef` imported but unused** in component

---

## Accessibility Checklist

| Requirement | Status |
|-------------|--------|
| Colour contrast 4.5:1 | ⚠️ Needs verification |
| Keyboard navigation | ✅ Native input elements |
| Screen reader support | ⚠️ Missing some ARIA labels |
| Skip link | ❌ Not implemented |
| Focus indicators | ✅ Browser defaults preserved |
| Error messages | N/A (no form validation) |

---

## Recommendations for Beta

1. **Remove Tailwind dependency** - Use only GOV.UK classes
2. **Add skip link** - Required for accessibility
3. **Initialise GOV.UK JS modules** - Accordion, error summary
4. **Replace inline styles** - Move to stylesheet
5. **Test with assistive technologies** - JAWS, VoiceOver
6. **Add notification banner** - For deficit warnings (currently removed)

---

## Sign-Off Decision

| Criteria | Result |
|----------|--------|
| Core GOV.UK brand | ✅ Recognisable |
| Basic accessibility | ⚠️ Minor issues |
| Component usage | ⚠️ Some non-standard |
| Functionality | ✅ Working |
| Security | ✅ No PII, .env protected |

> [!NOTE]
> **APPROVED FOR ALPHA RELEASE**
> 
> Remediation items tracked in issue backlog. Beta release requires full accessibility audit.

---

**Signed:**  
_Product Owner, Fix The Budget_  
_22 January 2026_
