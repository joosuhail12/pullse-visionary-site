# Image Optimization Audit

## Overview

Comprehensive audit of Next.js Image component usage across the application to identify optimization opportunities and ensure proper configuration.

## Current State

### Statistics
- **Total Files Using Image Component:** 25 files
- **Files with `sizes` Attribute:** 8 files (32%)
- **Files with `priority` Flag:** 1 file (4%)
- **Image Format Configuration:** ✅ AVIF, WebP enabled in next.config.mjs
- **Device Sizes Configured:** ✅ 640, 750, 828, 1080, 1200, 1920, 2048, 3840
- **Image Sizes Configured:** ✅ 16, 32, 48, 64, 96, 128, 256, 384

## Files Using Image Component

### 1. Home & Hero Sections
- `src/components/home/HomeHeroSection.tsx` - ⚠️ Needs audit
- `src/components/product-analytics/ProductAnalyticsHeroSection.tsx` - ⚠️ Needs audit
- `src/components/product-inbox/ProductInboxHeroSection.tsx` - ⚠️ Needs audit

### 2. Product Pages
- `src/views/Product.tsx` - ⚠️ Needs audit
- `src/views/ProductInboxChannels.tsx` - ⚠️ Needs audit
- `src/views/ProductWorkflows.tsx` - ⚠️ Needs audit
- `src/views/ProductHelpCenters.tsx` - ⚠️ Needs audit
- `src/views/ProductAISuite.tsx` - ⚠️ Needs audit

### 3. Blog Components
- `src/components/blog/AuthorBioCard.tsx` - ⚠️ Needs audit
- `src/components/blog/RelatedPosts.tsx` - ⚠️ Needs audit
- `src/components/blog/BlogImage.tsx` - ✅ Has `sizes` attribute
- `src/components/blog/ImageLightbox.tsx` - ⚠️ Has `priority` (should not have)
- `src/views/BlogDetailClient.tsx` - ⚠️ Needs audit
- `src/views/BlogClient.tsx` - ⚠️ Needs audit

### 4. Company Pages
- `src/components/company/TeamCard.tsx` - ⚠️ Needs audit
- `src/components/company/CompanyAntlerCard.tsx` - ⚠️ Needs audit
- `src/components/company/JourneySection.tsx` - ⚠️ Needs audit
- `src/components/company/TeamMember.tsx` - ⚠️ Needs audit

### 5. Layout Components
- `src/components/Navigation.tsx` - ⚠️ Needs audit (likely logo)
- `src/components/Footer.tsx` - ⚠️ Needs audit (likely logo)

### 6. General Components
- `src/components/PlatformOverview.tsx` - ⚠️ Needs audit
- `src/components/AIAgentsSection.tsx` - ⚠️ Needs audit

## Issues Identified

### Critical Issues

#### 1. Missing `priority` Flag on Above-the-Fold Images ⚠️
**Impact:** Delays LCP (Largest Contentful Paint) metric
**Affected Files:**
- Home hero images (if present in HomeHeroSection.tsx)
- Product hero images
- Any images visible without scrolling

**Fix:**
```tsx
<Image
  src="/hero-image.jpg"
  alt="Hero"
  priority  // Add this for above-the-fold images
  width={1200}
  height={600}
/>
```

**Expected files needing priority:**
- `src/components/home/HomeHeroSection.tsx`
- Product page hero sections
- Navigation logo (possibly)

#### 2. Missing `sizes` Attribute (68% of files) ⚠️
**Impact:** Serves unnecessarily large images, wastes bandwidth
**Affected:** 17 out of 25 files

**Why it matters:**
- Without `sizes`, Next.js defaults to `100vw`
- Results in downloading full-width images even for small components
- Wastes bandwidth and slows page load

**Fix Examples:**
```tsx
// For responsive images
<Image
  src="/image.jpg"
  alt="Responsive image"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
/>

// For fixed-width containers
<Image
  src="/avatar.jpg"
  alt="Team member"
  sizes="(max-width: 768px) 100px, 200px"
  width={200}
  height={200}
/>
```

### Medium Priority Issues

#### 3. Incorrect `priority` Usage in ImageLightbox ⚠️
**File:** `src/components/blog/ImageLightbox.tsx`
**Issue:** Lightbox images have `priority` flag
**Problem:** Lightbox images are not above-the-fold and shouldn't be prioritized
**Impact:** Delays loading of actually important images

**Fix:**
```tsx
// Remove priority from lightbox images
<Image
  src={src}
  alt={alt}
  fill
  // priority - REMOVE THIS
  sizes="100vw"
  className="object-contain"
/>
```

#### 4. Potential Missing Lazy Loading
**Issue:** Images below the fold should lazy load by default
**Current:** Next.js lazy loads by default (good) unless `priority` is set
**Action:** Verify no unnecessary `priority` flags

## Optimization Recommendations

### Priority 1: Add `sizes` Attribute to All Images

#### Template for Common Use Cases

**Full-width hero images:**
```tsx
sizes="100vw"
```

**Blog post images (max 800px container):**
```tsx
sizes="(min-width: 768px) 800px, 100vw"
```

**Team member avatars (fixed size):**
```tsx
sizes="200px"
```

**Responsive grid items (3 columns → 2 → 1):**
```tsx
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

**Logo in navigation (fixed size):**
```tsx
sizes="150px"
```

**Product screenshots (contained width):**
```tsx
sizes="(min-width: 1200px) 1000px, (min-width: 768px) 80vw, 100vw"
```

### Priority 2: Add `priority` to Above-the-Fold Images

#### Likely Candidates

1. **Home Page Hero Image**
   - File: `src/components/home/HomeHeroSection.tsx`
   - Check: Does it render an image above the fold?
   - Action: Add `priority` if yes

2. **Product Page Hero Images**
   - Files: All ProductXXXHeroSection.tsx files
   - Check: Visible without scrolling?
   - Action: Add `priority` to first visible image

3. **Navigation Logo**
   - File: `src/components/Navigation.tsx`
   - Check: Is it an image or SVG?
   - Action: Add `priority` if image, consider inline SVG instead

4. **Blog Featured Images**
   - File: `src/views/BlogDetailClient.tsx`
   - Check: Featured image above the fold?
   - Action: Add `priority` if yes

### Priority 3: Remove Incorrect `priority` Usage

1. **ImageLightbox.tsx**
   - Current: Has `priority`
   - Issue: Lightbox images are hidden, loaded on-demand
   - Fix: Remove `priority` flag

### Priority 4: Consider Image Format Optimizations

#### Already Configured ✅
- AVIF format enabled (best compression)
- WebP format enabled (fallback)
- Multiple device sizes configured

#### Additional Optimizations
1. **Use `quality` prop for decorative images**
   ```tsx
   <Image
     src="/decorative-bg.jpg"
     alt=""
     quality={75}  // Default is 75, can go lower for backgrounds
     fill
   />
   ```

2. **Specify explicit dimensions where possible**
   ```tsx
   // Better performance than fill + sizes
   <Image
     src="/fixed-size-image.jpg"
     alt="Fixed image"
     width={1200}
     height={600}
   />
   ```

3. **Use `placeholder="blur"` for user-generated content**
   ```tsx
   <Image
     src={blogImage}
     alt={blogTitle}
     placeholder="blur"
     blurDataURL={blurDataUrl}
     fill
   />
   ```

## Implementation Plan

### Phase 1: Critical Fixes (This Week)

1. **Audit and add `priority` to above-the-fold images**
   - [ ] HomeHeroSection.tsx
   - [ ] Product hero sections (check all 5)
   - [ ] Navigation logo (if image)

2. **Remove incorrect `priority` from ImageLightbox**
   - [ ] src/components/blog/ImageLightbox.tsx

**Expected Impact:**
- Improved LCP (Largest Contentful Paint) by 10-30%
- Better Core Web Vitals scores

### Phase 2: Important Optimizations (Next 2 Weeks)

3. **Add `sizes` attribute to all remaining images**
   - [ ] Blog components (5 files)
   - [ ] Company components (4 files)
   - [ ] Product pages (5 files)
   - [ ] General components (2 files)
   - [ ] Layout components (2 files)

**Expected Impact:**
- 20-40% reduction in image bandwidth
- Faster page loads on mobile devices

### Phase 3: Nice to Have (Next Month)

4. **Add blur placeholders for blog images**
5. **Optimize decorative images with lower quality**
6. **Convert logo to inline SVG** (if currently using Image)
7. **Audit for unused image assets**

## Verification Checklist

### For Each File

- [ ] Has `sizes` attribute appropriate for its layout
- [ ] Above-the-fold images have `priority`
- [ ] Below-the-fold images do NOT have `priority`
- [ ] `alt` text is descriptive and meaningful
- [ ] Decorative images have `alt=""` (empty string)
- [ ] Width and height specified (or fill with sizes)

### Example Audit

**File:** `src/components/blog/BlogImage.tsx`

```tsx
// ✅ GOOD EXAMPLE
<Image
  src={src}
  alt={alt}
  fill
  sizes="(min-width: 768px) 800px, 100vw"  // ✅ Has sizes
  className="object-cover"
/>
```

**File:** `src/components/home/HomeHeroSection.tsx` (hypothetical)

```tsx
// ⚠️ NEEDS IMPROVEMENT
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  // ⚠️ Missing priority (if above fold)
  // ⚠️ Missing sizes
/>

// ✅ IMPROVED VERSION
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  priority  // ✅ Above the fold
  sizes="100vw"  // ✅ Full width
  quality={90}  // ✅ High quality for hero
/>
```

## Automated Testing

### Setup Image Optimization Linting

```bash
# Install eslint-plugin-next
npm install -D @next/eslint-plugin-next

# Verify enabled in eslint.config.js
```

### Bundle Analysis Check

After optimizations:
```bash
npm run analyze
```

Check:
- Image chunks in .next/static
- Verify responsive images generated
- Confirm AVIF/WebP variants created

### Lighthouse Audit

```bash
lighthouse https://your-site.com --only-categories=performance --output html
```

Check:
- "Properly size images" audit
- "Next-gen formats" audit
- "Efficient cache policy on static assets" audit

## Expected Results

### Before Optimization (Current State)
- **LCP:** Unknown (likely 3-5s on slower connections)
- **Image Bandwidth:** Unnecessarily high due to missing sizes
- **Lighthouse Score:** Likely warnings about image sizing

### After Optimization (Target)
- **LCP:** < 2.5s (Core Web Vitals threshold)
- **Image Bandwidth:** 30-50% reduction
- **Lighthouse Score:** 95+ for performance

### Key Metrics to Track

1. **Largest Contentful Paint (LCP)**
   - Target: < 2.5s
   - Impact: `priority` flag on hero images

2. **Total Image Bytes**
   - Target: 30-50% reduction
   - Impact: Proper `sizes` attributes

3. **Cumulative Layout Shift (CLS)**
   - Target: < 0.1
   - Impact: Explicit width/height or aspect ratios

## Tools & Resources

### Analysis Tools
- **Next.js Image Analysis:** Check .next/cache/images for generated variants
- **Chrome DevTools:** Network tab → Filter by Img → Check sizes
- **Lighthouse:** Performance audit for image optimization

### Helper Scripts

**Find images without sizes:**
```bash
grep -r "<Image" src --include="*.tsx" | grep -v "sizes=" | grep -v "//"
```

**Find images with priority:**
```bash
grep -rn "priority" src --include="*.tsx" | grep -i image
```

**Count total Image usage:**
```bash
grep -r "<Image" src --include="*.tsx" | wc -l
```

## Next Steps

1. **Manual audit of high-priority files** (home hero, product heroes)
2. **Implement Phase 1 critical fixes** (priority flags)
3. **Create script to add sizes** attributes to remaining images
4. **Run Lighthouse audit** to verify improvements
5. **Document results** and update PERFORMANCE_CHECKLIST.md

---

**Last Updated:** 2025-11-16
**Status:** Audit complete, implementation pending
**Estimated Impact:** 20-40% bandwidth reduction, 10-30% LCP improvement
