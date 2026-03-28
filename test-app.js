const { chromium } = require('playwright')

async function testApp() {
  console.log('Starting test...')
  
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  
  // Load the HTML file
  await page.goto('file://' + process.cwd() + '/src/renderer/index.html')
  
  console.log('Page loaded')
  
  // Test 1: Click add stock button first time
  console.log('\n=== Test 1: First click ===')
  await page.click('text=+ 添加股票')
  await page.waitForTimeout(300)
  let activeElement = await page.evaluate(() => document.activeElement?.id)
  console.log('Active element after 1st click:', activeElement)
  
  // Cancel modal
  await page.click('text=取消')
  await page.waitForTimeout(300)
  
  // Check modal is closed
  let modalClass = await page.locator('#inputModal').getAttribute('class')
  console.log('Modal class after cancel:', modalClass)
  
  // Test 2: Click add stock button second time
  console.log('\n=== Test 2: Second click ===')
  await page.click('text=+ 添加股票')
  await page.waitForTimeout(300)
  activeElement = await page.evaluate(() => document.activeElement?.id)
  console.log('Active element after 2nd click:', activeElement)
  
  // Click cancel
  console.log('Clicking cancel...')
  await page.click('text=取消')
  await page.waitForTimeout(300)
  modalClass = await page.locator('#inputModal').getAttribute('class')
  console.log('Modal class after 2nd cancel:', modalClass)
  
  // Test 3: Click add stock button third time
  console.log('\n=== Test 3: Third click ===')
  await page.click('text=+ 添加股票')
  await page.waitForTimeout(300)
  activeElement = await page.evaluate(() => document.activeElement?.id)
  console.log('Active element after 3rd click:', activeElement)
  
  // Test 4: Type and submit
  console.log('\n=== Test 4: Type and submit ===')
  await page.fill('#modalInput', 'AAPL')
  await page.click('text=确定')
  await page.waitForTimeout(500)
  
  // Check if stock was added
  const stockItems = await page.locator('.stock-item').count()
  console.log('Stock items:', stockItems)
  
  await browser.close()
  console.log('\nTest completed!')
}

testApp().catch(console.error)