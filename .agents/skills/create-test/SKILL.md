---
name: create-test
description: Turn a Jira issue or a supplied test title into a WebdriverIO test organized as smoke or page-focused regression.
---

# Create a WDIO test from a story

Use this skill when the user provides a Jira issue or test title and asks to add an end-to-end test.

## Required input

Before placing or creating a test, require the user to classify it as exactly one of:

- **Smoke**: add the critical user journey to `wdio_philosophy_platform_ui/test/specs/smoke.ts`.
- **Not smoke** (also accept **Regression**): add it under `wdio_philosophy_platform_ui/test/specs/regression/<page>/`, grouping specs by the page they verify.

If the classification is missing, ask whether it is Smoke or not Smoke before creating the test. Do not infer the classification from the issue title or acceptance criteria.

For a Jira key or link, read the issue and its acceptance criteria using an available Jira connector. If Jira access is unavailable, ask for the issue text. For a plain title, use the title as the scenario and request only missing behavior or data that cannot be discovered from the app.

## Implementation conventions

- Inspect the existing WDIO config, page objects, helpers, app routes, and running UI before editing. Never invent routes, form fields, success messages, or `data-testid` values.
- Put element locators in page objects under `wdio_philosophy_platform_ui/test/pageobjects/`.
- Prefer XPath selectors in the `//*[...]` form, using stable attributes such as `data-testid` or reliable visible text, for example `//*[@data-testid='registration-email-input']`. Avoid generated CSS classes and brittle positional indexes.
- Put reusable actions and business flows in helpers under `wdio_philosophy_platform_ui/test/helpers/`. Specs should call helpers and contain the scenario assertions.
- For a visible control, reuse `common.helper.ts`'s `clickDisplayedButton(locator)` method. For navigation, use `clickAndVerifyRedirect(locator, url)`, which also waits for the target URL. Do not duplicate these generic sequences in page-specific helpers.
- Put reusable test values such as passwords, fixed names, and shared form data in `wdio_philosophy_platform_ui/test/constants/`, then import them into specs or helpers. Keep generated per-run values, such as a unique registration email, in a named variable scoped to the user story.
- For smoke flows that start from an existing student account, reuse the configured smoke student credentials from `test/constants/` and log in through a helper. Only generate a new email when the scenario explicitly tests registration; reusing an already registered address would stop exercising successful registration.
- Treat tests in the smoke spec as a sequential user story: generate `studentEmail` once at the registration step, then reuse that same student and credentials in every following test. Do not register a separate student for each test.
- Keep WDIO commands asynchronous and awaited. Prefer `expect-webdriverio` auto-waiting matchers over fixed sleeps.
- For registration flows, create a unique email using a timestamp and the `ui@example.com` domain, store it in a named variable scoped to the user story, and reuse that same variable in subsequent steps or tests that need the account.
- For Regression, organize test files by the concrete page under test. Keep unrelated page scenarios in separate directories.
- Preserve the project's existing config and reporting setup. Do not rerun the WDIO initializer to add a test.

## Verification

Use the project's WebdriverIO v10 session workflow to inspect the app and confirm selectors when the app is available. Run only the requested spec when the user asks for verification or when the task explicitly asks to confirm the scenario passes. If the app or required environment is unavailable, finish the code that can be implemented safely and clearly state what app detail is still needed.
