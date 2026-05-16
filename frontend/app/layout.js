import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Rustik Plant – Premium Furniture Store',
  description: 'Discover handcrafted, premium quality furniture for every room. Chairs, sofas, beds, tables and more. MERN Stack ecommerce app.',
  keywords: 'furniture, rustik plant, chairs, sofas, beds, tables, home decor, MERN stack',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#2c2c2c',
                color: '#fff',
                borderRadius: '4px',
                padding: '10px 16px',
                fontSize: '13px',
              },
              success: { iconTheme: { primary: '#e87722', secondary: '#fff' } },
            }}
          />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
