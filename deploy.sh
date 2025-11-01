#!/bin/bash

# Cyberlogic IT Website Deployment Script
# This script automates the deployment process

echo "========================================="
echo "  Cyberlogic IT Deployment Script"
echo "========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Get domain name
read -p "Enter your domain name (e.g., cyberlogicit.com.au): " DOMAIN
read -p "Enter your email for SSL certificate: " EMAIL

echo ""
echo -e "${YELLOW}Step 1: Installing NGINX...${NC}"
apt update
apt install nginx -y
systemctl start nginx
systemctl enable nginx
echo -e "${GREEN}✓ NGINX installed${NC}"

echo ""
echo -e "${YELLOW}Step 2: Installing Certbot for SSL...${NC}"
apt install certbot python3-certbot-nginx -y
echo -e "${GREEN}✓ Certbot installed${NC}"

echo ""
echo -e "${YELLOW}Step 3: Creating website directory...${NC}"
mkdir -p /var/www/$DOMAIN
echo -e "${GREEN}✓ Directory created${NC}"

echo ""
echo -e "${YELLOW}Step 4: Copying website files...${NC}"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cp -r $SCRIPT_DIR/* /var/www/$DOMAIN/
chown -R www-data:www-data /var/www/$DOMAIN
chmod -R 755 /var/www/$DOMAIN
echo -e "${GREEN}✓ Files copied${NC}"

echo ""
echo -e "${YELLOW}Step 5: Configuring NGINX...${NC}"
cat > /etc/nginx/sites-available/$DOMAIN << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    
    root /var/www/$DOMAIN;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
EOF

ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
echo -e "${GREEN}✓ NGINX configured${NC}"

echo ""
echo -e "${YELLOW}Step 6: Installing SSL certificate...${NC}"
certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive --redirect
echo -e "${GREEN}✓ SSL certificate installed${NC}"

echo ""
echo -e "${YELLOW}Step 7: Setting up firewall...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable
echo -e "${GREEN}✓ Firewall configured${NC}"

echo ""
echo "========================================="
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo "========================================="
echo ""
echo "Your website is now live at:"
echo -e "${GREEN}https://$DOMAIN${NC}"
echo -e "${GREEN}https://www.$DOMAIN${NC}"
echo ""
echo "Admin Panel:"
echo -e "${GREEN}https://$DOMAIN/admin/${NC}"
echo "  Username: admin"
echo "  Password: cyberlogic2025"
echo -e "${RED}  ⚠️  IMPORTANT: Change these credentials immediately!${NC}"
echo ""
echo "SSL Certificate will auto-renew via cron job."
echo ""
echo "For support, visit: https://cyberlogicit.com.au"
echo ""
