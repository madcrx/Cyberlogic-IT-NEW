# Cyberlogic IT - Installation Guide

## Quick Start

### Method 1: Automated Deployment (Linux Server)

1. **Upload the entire folder to your server**
```bash
scp -r cyberlogic-it username@your-server-ip:/tmp/
```

2. **SSH into your server**
```bash
ssh username@your-server-ip
```

3. **Run the deployment script**
```bash
cd /tmp/cyberlogic-it
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

4. **Follow the prompts**
   - Enter your domain name
   - Enter your email for SSL
   - Wait for completion

5. **Done!** Your site will be live at https://yourdomain.com

### Method 2: Manual Installation (cPanel/Shared Hosting)

1. **Login to cPanel**

2. **Navigate to File Manager**

3. **Go to public_html**

4. **Upload ZIP file**
   - Compress the cyberlogic-it folder to .zip
   - Upload via cPanel File Manager
   - Extract the archive

5. **Or use FTP**
   - Connect with FileZilla or similar
   - Upload all files to public_html
   - Ensure permissions: 755 for folders, 644 for files

6. **Access your site**
   - Main site: https://yourdomain.com
   - Admin panel: https://yourdomain.com/admin/

### Method 3: Local Testing

1. **Install a local server**
   - Windows: XAMPP or WAMP
   - Mac: MAMP
   - Linux: Apache or NGINX

2. **Copy files to web directory**
   - XAMPP: C:\xampp\htdocs\cyberlogic-it\
   - MAMP: /Applications/MAMP/htdocs/cyberlogic-it/
   - Linux: /var/www/html/cyberlogic-it/

3. **Access locally**
   - http://localhost/cyberlogic-it/

## Post-Installation Steps

### 1. Change Admin Credentials

Edit `/admin/index.html`:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-new-username',
    password: 'your-new-secure-password'
};
```

### 2. Add Your Logo

- Create/obtain your logo (PNG, SVG, or JPG)
- Save as `/assets/images/logo.svg` or `logo.png`
- Recommended size: 200x50px or similar ratio

### 3. Add Favicon

- Create favicon (16x16, 32x32, 48x48px)
- Save as `/assets/images/favicon.ico`
- Clear browser cache to see changes

### 4. Update Contact Information

Edit `/index.html` and update:
- Phone numbers
- Email addresses
- Physical address
- Social media links

### 5. Add Images

Place your images in `/assets/images/`:
- about-tech.jpg (800x600px recommended)
- Any service or industry images

### 6. Customize Colors

Edit `/assets/css/style.css`:
```css
:root {
    --primary-color: #E89523;  /* Your primary color */
    --secondary-color: #00cc88; /* Your secondary color */
}
```

### 7. Update SEO

Edit meta tags in `/index.html`:
```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="your, keywords, here">
```

Update `/sitemap.xml` with your domain:
```xml
<loc>https://yourdomain.com/</loc>
```

### 8. Set Up Analytics

Add Google Analytics or similar:
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Site Not Loading
- Check NGINX/Apache is running: `sudo systemctl status nginx`
- Check file permissions: folders 755, files 644
- Check domain DNS settings

### SSL Issues
- Verify domain points to server IP
- Wait for DNS propagation (up to 48 hours)
- Check Certbot logs: `sudo certbot certificates`

### Admin Panel Not Working
- Clear browser cache
- Check JavaScript console for errors
- Ensure localStorage is enabled

### Contact Form Not Sending
- Form uses localStorage for demonstration
- Integrate with email service or backend in production
- Check browser console for errors

## Production Checklist

- [ ] Change admin credentials
- [ ] Add your logo and favicon
- [ ] Update all contact information
- [ ] Customize colors and branding
- [ ] Add real images
- [ ] Update SEO meta tags
- [ ] Set up Google Analytics
- [ ] Test on multiple devices
- [ ] Test on multiple browsers
- [ ] Enable HTTPS redirect
- [ ] Set up email forwarding
- [ ] Configure backup solution
- [ ] Test contact form
- [ ] Submit sitemap to Google Search Console
- [ ] Set up monitoring (UptimeRobot, etc.)
- [ ] Document admin credentials securely

## Support

For technical support:
- Email: info@cyberlogicit.com.au
- Phone: 1300 CYBER IT

---

**Cyberlogic IT - Professional IT Solutions**
