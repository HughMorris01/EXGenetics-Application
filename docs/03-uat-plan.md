**User Acceptance Testing (UAT) & Quality Assurance Plan**

**Project Name:** Excelsior Genetics Brand Platform

**Developer/Tester:** Greg Farrell

**Date of Testing:** 2026-03-01

**Project Version/Release:** v1.0 - Production Candidate

**1. Testing Environment Checklist**


- **Operating Systems Tested:** Windows 11, Android
- **Browsers Tested:** Chrome, Safari, Firefox
- **Device Viewports:** - Desktop (1920x1080)
  - Mobile (390x844)

**2. Testing Protocol & Evidence**

- **Goal:** Verify that all Functional and Technical requirements outlined in the PRD and TDD have been met.
- **Screenshot Protocol:** Every core functionality test **must** be accompanied by a screenshot proving the expected result. In this Markdown document, embed screenshots directly in the "Proof" column using the syntax: `![Description](./path-to-image.png)`.
- **Status Codes:** - **PASS:** Feature works exactly as expected.
  - **FAIL:** Feature is broken or produces an error.
  - **FLAG:** Feature works, but UI/UX feels clunky or needs refinement.

**3. Test Cases**

**Phase 1: Access & Navigation**

| ID  | Feature | Steps to Execute | Expected Result | Pass/Fail | Screenshot Proof | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| **NAV-01** | Age Gate | Load the site in a fresh incognito window. | Age verification overlay appears and blocks scrolling. | [ ] | [Insert Image] | |
| **NAV-02** | Session Storage | Click "I am 21+" and refresh the page. | Overlay fades out; does not reappear on refresh. | [ ] | [Insert Image] | |
| **NAV-03** | 404 Route | Navigate to a non-existent URL (e.g., `/xyz`). | Custom 404 EJS template renders cleanly. | [ ] | [Insert Image] | |

**Phase 2: Core Functionality (Backend Logic)**

| ID  | Feature | Steps to Execute | Expected Result | Pass/Fail | Screenshot Proof | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| **CORE-