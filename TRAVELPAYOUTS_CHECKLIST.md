# Travelpayouts Re-Application Checklist

## ✅ Pre-Submission Verification Checklist

Use this checklist to verify your MyStay Sarajevo site meets all Travelpayouts requirements before submitting your application.

---

## 🌐 Domain & SSL

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Public domain with SSL | **Required** | `curl -I https://mystaysarajevo.ba` |
| ✅ Domain resolves correctly | **Required** | `nslookup mystaysarajevo.ba` |
| ✅ HTTPS redirect configured | **Required** | `curl -I http://mystaysarajevo.ba` (should redirect to https) |
| ✅ Valid SSL certificate | **Required** | `openssl s_client -connect mystaysarajevo.ba:443` |

**Verification Steps:**
```bash
# Check domain resolution
nslookup mystaysarajevo.ba

# Check SSL certificate
curl -I https://mystaysarajevo.ba

# Check HTTPS redirect
curl -I http://mystaysarajevo.ba
```

---

## 🏨 Hotel Content

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ At least 7 hotel detail pages | **Required** | Visit each URL below |
| ✅ Unique content for each page | **Required** | Manual review |
| ✅ Working affiliate links | **Required** | Click each "Rezerviši" button |
| ✅ Booking.com IDs configured | **Required** | Check database |
| ✅ Real images for each hotel | **Required** | Visual inspection |

**Hotel Pages to Verify:**
```bash
# Hotel detail pages
https://mystaysarajevo.ba/smjestaj/hotel-europe
https://mystaysarajevo.ba/smjestaj/swissotel-sarajevo
https://mystaysarajevo.ba/smjestaj/bascarsija-pearl
https://mystaysarajevo.ba/smjestaj/pino-nature-hotel
https://mystaysarajevo.ba/smjestaj/courtyard-marriott
https://mystaysarajevo.ba/smjestaj/alifakovac-view
https://mystaysarajevo.ba/smjestaj/unitic-suite
```

**Database Verification:**
```bash
cd /home/workspace/MyStaySarajevo-nextjs
npx prisma studio
# Check that all accommodations have bookingComId field populated
```

---

## 📝 Blog Content

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ At least 5 published articles | **Required** | `ls -la content/vodic/*.mdx` |
| ✅ Unique, useful travel content | **Required** | Manual review |
| ✅ Minimum 500 words per article | **Required** | Manual review |
| ✅ Bosnian language content | **Required** | Manual review |
| ✅ Internal links to hotel pages | **Recommended** | Manual review |

**Blog Articles to Verify:**
```bash
# List all published articles
ls -la /home/workspace/MyStaySarajevo-nextjs/content/vodic/

# Articles (verify each):
https://mystaysarajevo.ba/vodic/gdje-odsjesti-sarajevo
https://mystaysarajevo.ba/vodic/bascarsija-smjestaj
https://mystaysarajevo.ba/vodic/10-razloga-zasto-posjetiti
https://mystaysarajevo.ba/vodic/sarajevo-na-budzet
https://mystaysarajevo.ba/vodic/luksuzni-hoteli-sarajevo
https://mystaysarajevo.ba/vodic/sarajevo-za-porodice
https://mystaysarajevo.ba/vodic/poslovni-smjestaj
https://mystaysarajevo.ba/vodic/apartmani-vs-hoteli
https://mystaysarajevo.ba/vodic/zimski-odmor-sarajevo
https://mystaysarajevo.ba/vodic/sarajevska-kuhinja
```

---

## 🔐 Legal Pages

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Privacy policy page | **Required** | Visit URL |
| ✅ Affiliate disclosure visible | **Required** | Check privacy policy |
| ✅ About page | **Required** | Visit URL |
| ✅ Contact page | **Required** | Visit URL |
| ✅ Working contact form | **Required** | Test submission |

**Legal Pages to Verify:**
```bash
# Privacy Policy
https://mystaysarajevo.ba/politika-privatnosti
# Must contain: Affiliate disclosure section

# About Page
https://mystaysarajevo.ba/o-nama
# Must contain: Site purpose, team info, affiliate transparency

# Contact Page
https://mystaysarajevo.ba/kontakt
# Must contain: Contact form, email address, physical address/city
```

**Test Contact Form:**
```bash
# Submit a test message via the contact form
# Verify email is received at info@mystaysarajevo.ba
```

---

## 🔍 Search Functionality

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Functional search with real results | **Required** | Test search on homepage |
| ✅ Filters working (type, location, price) | **Required** | Test each filter |
| ✅ Results count displayed | **Required** | Visual inspection |
| ✅ Mobile-friendly search | **Required** | Test on mobile device |

**Search Test Cases:**
```bash
# Test 1: Basic search
# - Go to https://mystaysarajevo.ba
# - Click "VIEW ACCOMMODATION"
# - Verify results are displayed

# Test 2: Filter by type
# - Click "Hotel" filter
# - Verify only hotels are shown

# Test 3: Filter by location
# - Click "Baščaršija" filter
# - Verify only Baščaršija hotels are shown

# Test 4: Mobile search
# - Open site on mobile device
# - Verify search works correctly
```

---

## 📱 Mobile Responsiveness

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Mobile responsive design | **Required** | Google Mobile-Friendly Test |
| ✅ Touch-friendly buttons | **Required** | Manual test |
| ✅ Readable text on mobile | **Required** | Manual test |
| ✅ No horizontal scroll | **Required** | Manual test |

**Verification Tools:**
```bash
# Google Mobile-Friendly Test
https://search.google.com/test/mobile-friendly?url=https://mystaysarajevo.ba

# BrowserStack Mobile Testing
https://www.browserstack.com/responsive

# Manual Testing:
# - Open Chrome DevTools (F12)
# - Toggle device toolbar (Ctrl+Shift+M)
# - Test on iPhone, iPad, Android
```

---

## ⚡ Performance

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Page load under 3 seconds | **Required** | Google PageSpeed Insights |
| ✅ Optimized images | **Recommended** | Check image sizes |
| ✅ Minimal JavaScript | **Recommended** | Lighthouse audit |
| ✅ Gzip compression enabled | **Recommended** | `curl -I -H "Accept-Encoding: gzip"` |

**Performance Testing:**
```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/analysis?url=https://mystaysarajevo.ba

# Lighthouse CLI
npx lighthouse https://mystaysarajevo.ba --view

# WebPageTest
https://www.webpagetest.org/

# Target metrics:
# - Performance: > 90
# - Accessibility: > 90
# - Best Practices: > 90
# - SEO: > 90
```

---

## 📊 Analytics & Tracking

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Google Analytics 4 installed | **Required** | Check GA4 real-time |
| ✅ Custom event tracking | **Recommended** | Test in GA4 DebugView |
| ✅ Affiliate click tracking | **Recommended** | Test trackAffiliateClick() |
| ✅ GDPR-compliant cookie consent | **Required** | Visual inspection |

**Analytics Verification:**
```bash
# 1. Check GA4 is installed
# - Visit https://mystaysarajevo.ba
# - Open browser DevTools > Network
# - Filter for "google-analytics.com"
# - Verify requests are being sent

# 2. Test custom events
# - Click on a hotel's "Rezerviši" button
# - Check GA4 DebugView for "affiliate_click" event
# - Verify event parameters (hotel_name, hotel_type, etc.)

# 3. Test cookie consent
# - Clear browser cookies
# - Visit site
# - Verify cookie banner appears
# - Click "Prihvati sve"
# - Verify GA4 starts tracking
```

---

## 🔗 Affiliate Links

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ Booking.com affiliate links working | **Required** | Click each link |
| ✅ Affiliate AID parameter included | **Required** | Inspect URL parameters |
| ✅ Links open in new tab | **Required** | Test each link |
| ✅ No broken links | **Required** | Use link checker |

**Affiliate Link Test:**
```bash
# Click on "Rezerviši" button for any hotel
# Verify:
# 1. URL format: https://www.booking.com/hotel/ba/{id}.bs.html?aid={AID}&...
# 2. Opens in new tab (target="_blank")
# 3. Contains Travelpayouts AID parameter
# 4. Contains label parameter (mystay-sarajevo)

# Use this tool to check all links:
npx broken-link-checker https://mystaysarajevo.ba -ro
```

---

## 🚫 No Broken Pages

| Requirement | Status | Verification Command |
|-------------|--------|----------------------|
| ✅ No 404 errors on main pages | **Required** | Crawl entire site |
| ✅ Custom 404 page exists | **Recommended** | Visit invalid URL |
| ✅ No JavaScript errors | **Required** | Check browser console |

**Site Crawl:**
```bash
# Crawl entire site for broken links
npx broken-link-checker https://mystaysarajevo.ba \
  --ordered \
  --recursive \
  --exclude-external \
  --filter-level 3

# Check custom 404 page
curl -I https://mystaysarajevo.ba/nonexistent-page
# Should return 404 status with custom page

# Check for JS errors
# - Open Chrome DevTools (F12)
# - Navigate through site
# - Check Console for errors
```

---

## 📋 Final Pre-Submission Checklist

### Complete All Items Before Submitting:

- [ ] **Domain & SSL**
  - [ ] Domain resolves to HTTPS
  - [ ] SSL certificate is valid
  - [ ] HTTPS redirect is configured

- [ ] **Hotel Content**
  - [ ] At least 7 unique hotel pages
  - [ ] All hotels have Booking.com IDs
  - [ ] All affiliate links are working
  - [ ] All hotel images are loading

- [ ] **Blog Content**
  - [ ] At least 5 published articles
  - [ ] Each article has 500+ words
  - [ ] All articles in Bosnian
  - [ ] Internal links to hotels

- [ ] **Legal Pages**
  - [ ] Privacy policy with affiliate disclosure
  - [ ] About page with site info
  - [ ] Contact page with working form
  - [ ] Cookie consent banner

- [ ] **Search Functionality**
  - [ ] Search returns real results
  - [ ] All filters work correctly
  - [ ] Mobile search works

- [ ] **Mobile Responsiveness**
  - [ ] Passes Google Mobile-Friendly Test
  - [ ] All buttons are touch-friendly
  - [ ] Text is readable on mobile
  - [ ] No horizontal scroll

- [ ] **Performance**
  - [ ] Page load < 3 seconds
  - [ ] Lighthouse score > 90
  - [ ] Images are optimized
  - [ ] Gzip compression enabled

- [ ] **Analytics**
  - [ ] GA4 is installed and tracking
  - [ ] Custom events are firing
  - [ ] Cookie consent is GDPR-compliant

- [ ] **Affiliate Links**
  - [ ] All links contain Travelpayouts AID
  - [ ] All links open in new tab
  - [ ] No broken links

- [ ] **No Errors**
  - [ ] No 404 errors
  - [ ] No JavaScript errors
  - [ ] No broken images

---

## 🚀 Submission Steps

Once all items above are verified:

1. **Log into Travelpayouts Dashboard**
   - https://www.travelpayouts.com/

2. **Navigate to Applications**
   - Click "Add New Application"
   - Or update existing application

3. **Fill in Application Form:**
   - **Website URL:** https://mystaysarajevo.ba
   - **Website Type:** Travel Business
   - **Description:** 
     ```
     MyStay Sarajevo is a local accommodation guide for Sarajevo, 
     Bosnia and Herzegovina. We provide curated hotel, apartment, 
     and villa recommendations with direct Booking.com affiliate 
     links. Our site features 10+ hotel pages, 10 travel guide 
     articles, and comprehensive local information for travelers.
     ```

4. **Submit and Wait for Review**
   - Review typically takes 1-3 business days
   - You'll receive email notification

5. **After Approval:**
   - Generate affiliate links from Travelpayouts dashboard
   - Update your `TRAVELPAYOUTS_AID` environment variable
   - Test affiliate links are tracking correctly
   - Monitor earnings in Travelpayouts dashboard

---

## 📞 Support Contacts

If you encounter issues:

- **Travelpayouts Support:** https://www.travelpayouts.com/help/
- **MyStay Sarajevo Team:** info@mystaysarajevo.ba

---

**Last Updated:** 2026-05-09  
**Version:** 1.0.0  
**Status:** Ready for Submission ✅
