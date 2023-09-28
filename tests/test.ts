//@ts-check

import { expect, test } from '@playwright/test';

test('Index should have "TranslateGPT" h1 displayed', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'TranslateGPT' })).toBeVisible();
});
