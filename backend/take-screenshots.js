const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', '..', 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const save = (name) => path.join(SCREENSHOTS_DIR, name);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function takeScreenshots() {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // ─── 1. HOME PAGE - Hero ───
    console.log('📸 1. Home Page Hero...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3500);
    await page.screenshot({ path: save('01_home_hero.png') });
    console.log('   ✅ hero saved');

    // ─── 2. HOME - Categories ───
    console.log('📸 2. Home Categories Section...');
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'smooth' }));
    await sleep(1200);
    await page.screenshot({ path: save('02_home_categories.png') });
    console.log('   ✅ categories saved');

    // ─── 3. HOME - Featured Products ───
    console.log('📸 3. Home Featured Products...');
    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'smooth' }));
    await sleep(1200);
    await page.screenshot({ path: save('03_home_featured.png') });
    console.log('   ✅ featured saved');

    // ─── 4. PRODUCTS PAGE ───
    console.log('📸 4. All Products Page...');
    await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3500);
    await page.screenshot({ path: save('04_products_page.png') });
    console.log('   ✅ products page saved');

    // ─── 5. PRODUCTS - Scrolled Grid ───
    console.log('📸 5. Products Grid (scrolled)...');
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
    await sleep(1000);
    await page.screenshot({ path: save('05_products_grid.png') });
    console.log('   ✅ products grid saved');

    // ─── 6. PRODUCT DETAIL ───
    console.log('📸 6. Product Detail Page...');
    await page.goto('http://localhost:3000/products/1', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
    await page.screenshot({ path: save('06_product_detail.png') });
    console.log('   ✅ product detail saved');

    // ─── 7. CART PAGE (empty state) ───
    console.log('📸 7. Cart Page (empty)...');
    await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);
    await page.screenshot({ path: save('07_cart_empty.png') });
    console.log('   ✅ cart empty saved');

    // ─── 8. Add to cart via JS, then show cart ───
    console.log('📸 8. Cart with Item...');
    // Set localStorage cart manually
    await page.evaluate(() => {
      const item = { _id: '1', name: 'Apple iPhone 15 Pro', price: 149999, originalPrice: 169999, category: 'Electronics', brand: 'Apple', stock: 25, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80', rating: 4.8, numReviews: 120, isFeatured: true, quantity: 2 };
      const item2 = { _id: '3', name: 'Sony WH-1000XM5 Headphones', price: 54999, originalPrice: 64999, category: 'Electronics', brand: 'Sony', stock: 40, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', rating: 4.9, numReviews: 200, isFeatured: true, quantity: 1 };
      localStorage.setItem('shopnest_cart', JSON.stringify([item, item2]));
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await sleep(2000);
    await page.screenshot({ path: save('08_cart_with_items.png') });
    console.log('   ✅ cart with items saved');

    // ─── 9. CHECKOUT PAGE ───
    console.log('📸 9. Checkout Page...');
    await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: save('09_checkout.png') });
    console.log('   ✅ checkout saved');

    // ─── 10. API ROOT ───
    console.log('📸 10. API Root...');
    await page.goto('http://localhost:5000/', { waitUntil: 'networkidle2', timeout: 10000 });
    await sleep(1000);
    await page.screenshot({ path: save('10_api_root.png') });
    console.log('   ✅ api root saved');

    // ─── 11. API PRODUCTS ───
    console.log('📸 11. API Products JSON...');
    await page.goto('http://localhost:5000/api/products', { waitUntil: 'networkidle2', timeout: 10000 });
    await sleep(1000);
    await page.screenshot({ path: save('11_api_products.png') });
    console.log('   ✅ api products saved');

    // ─── 12. FULL PAGE HOME ───
    console.log('📸 12. Full Page Home...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3500);
    await page.screenshot({ path: save('12_home_fullpage.png'), fullPage: true });
    console.log('   ✅ full home saved');

    console.log('\n🎉 ALL SCREENSHOTS SAVED!');
    console.log('📁 Location:', SCREENSHOTS_DIR);
    const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));
    files.forEach(f => console.log('   ✅', f));

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed');
  }
}

takeScreenshots();
