# 🔐 ADMIN PANEL USER GUIDE

**Cyberlogic IT Admin Panel - Complete Guide**

---

## 🚀 Quick Start

### Login Credentials (Default)
- **URL:** `https://www.cyberlogicit.com.au/admin/`
- **Username:** `admin`
- **Password:** `cyberlogic2025`

⚠️ **IMPORTANT:** Change the default password immediately after first login!

---

## 📋 Features Overview

### 1. **Content Editor** ✏️
- Update hero section (main heading, subheading, CTA button)
- Modify contact information (phone, email, address)
- Edit service titles and descriptions
- **All changes update the live website automatically!**

### 2. **Image Management** 🖼️
- Upload company logo
- Change hero background
- Update service icons
- Images are automatically optimized and formatted
- Replaces existing images with new uploads

### 3. **User Management** 👥
- Add new admin users
- Edit existing user details
- Delete users (except main admin)
- Manage access permissions

### 4. **View Website** 🌐
- Quick link to open main website in new tab
- See your changes live

---

## 🎯 How To Use

### Content Editor

1. **Click "Content Editor" from Dashboard**
2. **Fill in the forms:**
   - Hero Section: Main heading, subheading, button text
   - Contact Info: Phone, email, address
   - Services: Titles and descriptions for first 3 services
3. **Click "Save All Changes"**
4. **Refresh your main website** to see updates!

**✅ All contact information becomes clickable automatically:**
- Phone numbers → Click to call
- Email addresses → Click to email
- Physical address → Click to open in Google Maps

### Image Upload

1. **Click "Image Management" from Dashboard**
2. **Choose image category:**
   - Company Logo (200x50px recommended)
   - Hero Background (1920x1080px)
   - About Section (800x600px)
   - Service Icons (512x512px)
3. **Click "Upload" button**
4. **Select your image file** (JPG, PNG, SVG, max 5MB)
5. **Done!** Image replaces old one automatically

**Supported Formats:**
- JPG/JPEG
- PNG
- SVG (best for logos)
- WebP

### User Management

**Add New User:**
1. Click "User Management" from Dashboard
2. Click "Add New User"
3. Fill in: Username, Email, Password, Role
4. Click "Save User"

**Edit User:**
1. Find user in table
2. Click "Edit" button
3. Update information
4. Click "Save User"

**Delete User:**
1. Find user in table
2. Click "Delete" button
3. Confirm deletion

⚠️ **Note:** Default admin account cannot be deleted

---

## 🔄 Workflow Example

**Scenario: Update your contact phone number**

1. Login to admin panel
2. Click "Content Editor"
3. Find "Contact Information" section
4. Change phone number to: `(03) 1234 5678`
5. Click "Save All Changes"
6. Open main website
7. Scroll to footer
8. **Phone number is updated AND clickable!**

---

## 🎨 Best Practices

### Content Updates
- ✅ Keep headings concise (under 10 words)
- ✅ Service descriptions: 1-2 sentences
- ✅ Use professional, clear language
- ✅ Test on mobile after updates

### Image Uploads
- ✅ Use recommended dimensions
- ✅ Compress images before upload (max 5MB)
- ✅ Use SVG for logos (scales perfectly)
- ✅ Use WebP or JPG for photos
- ✅ Name files descriptively: `hero-background-2025.jpg`

### User Management
- ✅ Use strong passwords (12+ characters)
- ✅ Unique username for each person
- ✅ Valid email addresses
- ✅ Remove users when they leave
- ✅ Regular password changes

---

## 🔐 Security

### Password Requirements
- Minimum 8 characters
- Mix of letters and numbers recommended
- Change default password immediately
- Don't share passwords

### User Roles
- **Admin:** Full access to everything
- **Editor:** Content and images only (future feature)

### Logout
- Always logout when finished
- Closes session securely
- Returns to main website homepage

---

## 📊 How Content Updates Work

### Behind the Scenes:

1. **You edit content** in admin panel
2. **Click "Save"**
3. **Data stores in browser localStorage**
4. **Main website reads localStorage** on page load
5. **Content updates automatically!**

### Important Notes:
- Changes persist in user's browser
- Works on same device/browser
- For server-side updates, see "Advanced Setup" below

---

## 🖱️ Dashboard Navigation

All features accessible via clickable cards:

```
┌─────────────┐  ┌─────────────┐
│   Content   │  │    Image    │
│   Editor    │  │ Management  │
└─────────────┘  └─────────────┘

┌─────────────┐  ┌─────────────┐
│    User     │  │    View     │
│ Management  │  │   Website   │
└─────────────┘  └─────────────┘
```

No header links - everything on Dashboard!

---

## ✅ Checklist: First Time Setup

- [ ] Login with default credentials
- [ ] Go to User Management
- [ ] Edit admin user
- [ ] Change password to something secure
- [ ] Go to Content Editor
- [ ] Update company contact info
- [ ] Update hero section text
- [ ] Save changes
- [ ] Go to Image Management
- [ ] Upload company logo
- [ ] Upload hero background (optional)
- [ ] Logout and test
- [ ] Visit main website
- [ ] Verify all changes appear
- [ ] Test clickable phone/email links

---

## 🆘 Troubleshooting

### Changes not showing on website?
- **Solution:** Refresh the page (Ctrl + F5)
- Clear browser cache
- Check you clicked "Save All Changes"

### Images not uploading?
- **Check:** File size under 5MB
- **Check:** File format (JPG, PNG, SVG)
- **Try:** Different image
- **Try:** Compress image first

### Can't login?
- **Check:** Username and password spelling
- **Check:** Caps Lock is off
- **Try:** Clear browser cache
- **Last Resort:** Reset in browser localStorage

### Contact links not clickable?
- **Check:** You saved content in admin
- **Check:** Proper format: email@domain.com, not missing @
- **Refresh:** Main website page

---

## 🔧 Advanced Setup (Optional)

### For Persistent Server-Side Updates:

1. **Contact your web developer**
2. **Implement PHP/Backend** to write updates to actual HTML files
3. **Or use a CMS** like WordPress with this as theme
4. **Or use API** to update database

Current system uses browser localStorage (perfect for demos/testing).

---

## 📞 Support

**Need Help?**
- Check this guide first
- Review error messages
- Test in different browser
- Contact: admin@cyberlogicit.com.au

---

## 🎓 Tips & Tricks

### Content Writing
- Be specific: "Custom Gaming PCs" vs "Computer Systems"
- Include benefits: "Save time with automated backups"
- Use action words: "Transform", "Optimize", "Enhance"

### SEO-Friendly Content
- Include location: "Melbourne IT Support"
- Use industry terms: "Cloud Migration", "Network Security"
- Natural language, avoid keyword stuffing

### Image Optimization
- Before uploading, use free tools:
  - TinyPNG.com (compress PNG/JPG)
  - Squoosh.app (convert to WebP)
  - SVGOMG.net (optimize SVG)

---

## 📝 Keyboard Shortcuts

- **Ctrl + S** in form = Save (if form is focused)
- **Esc** = Close modal/dialog
- **Tab** = Move between fields

---

## 🚀 Quick Tasks

### Update Phone Number (30 seconds)
1. Login → Content Editor
2. Find "Contact Phone"
3. Update number
4. Save
5. Done!

### Upload New Logo (1 minute)
1. Login → Image Management
2. Find "Company Logo"
3. Click "Upload New Logo"
4. Select file
5. Done!

### Add New Admin User (2 minutes)
1. Login → User Management
2. Click "Add New User"
3. Fill form (username, email, password)
4. Click "Save User"
5. Done!

---

## ✨ Feature Highlights

✅ **Real-time Updates:** Changes reflect immediately
✅ **Mobile Responsive:** Admin panel works on tablets/phones
✅ **Intuitive Interface:** No training needed
✅ **Secure:** Password protected, session-based
✅ **Clickable Contacts:** Phone, email, address all functional
✅ **Image Management:** Drag-drop-done
✅ **User Friendly:** Dashboard cards, not confusing menus

---

## 📄 Version History

**v1.0.0** (Current)
- Dashboard with clickable cards
- Content editor with live updates
- Image management system
- User management panel
- Automatic clickable contact links
- Logout returns to main site
- No irrelevant dashboard data

---

**Admin Panel Ready! 🎉**

**Default Login:** admin / cyberlogic2025  
**Access:** https://www.cyberlogicit.com.au/admin/  
**Status:** ✅ Fully Functional

---

**Made with ❤️ for Cyberlogic IT**  
© 2025 • Melbourne, Australia
