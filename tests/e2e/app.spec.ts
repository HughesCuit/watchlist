import { test, expect } from '@playwright/test'

test.describe('Stock Watchlist App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/src/renderer/index.html')
  })

  test('should load the page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('股票自选股管理')
  })

  test('should show add stock modal when clicking add button', async ({ page }) => {
    await page.click('text=+ 添加股票')
    await expect(page.locator('#inputModal')).toHaveClass(/show/)
  })

  test('should focus input when modal opens', async ({ page }) => {
    await page.click('text=+ 添加股票')
    const input = page.locator('#modalInput')
    await expect(input).toBeFocused()
  })

  test('should close modal when clicking cancel', async ({ page }) => {
    await page.click('text=+ 添加股票')
    await page.click('text=取消')
    await expect(page.locator('#inputModal')).not.toHaveClass(/show/)
  })

  test('should close modal when pressing Escape', async ({ page }) => {
    await page.click('text=+ 添加股票')
    await page.keyboard.press('Escape')
    await expect(page.locator('#inputModal')).not.toHaveClass(/show/)
  })
})